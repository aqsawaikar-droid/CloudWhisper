'use client';

import { useState, useRef, useEffect } from 'react';
import {
  AudioLines,
  Cloud,
  Image as ImageIcon,
  Loader,
  Mic,
  Save,
  Send,
  User,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { runAnalysis, runSpeechToText, runGenerateTitle } from '@/lib/actions';
import type { AnalyzeLogsAndMetricsOutput } from '@/ai/flows/analyze-logs-and-metrics';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useUser, useFirestore, useMemoFirebase, useCollection, addDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import type { Message, Workflow } from '@/lib/types';
import { useRouter } from 'next/navigation';

export function Dashboard({ conversationId: propConversationId }: { conversationId?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  
  const [conversationId, setConversationId] = useState<string | undefined>(propConversationId);

  const [isRecording, setIsRecording] = useState(false);
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const { user } = useUser();
  const firestore = useFirestore();

  const messagesQuery = useMemoFirebase(() => {
    if (!user || !conversationId) return null;
    return query(
      collection(firestore, 'users', user.uid, 'conversations', conversationId, 'messages'),
      orderBy('timestamp', 'asc')
    );
  }, [user, firestore, conversationId]);

  const { data: existingMessages, isLoading: isLoadingMessages } = useCollection<Message>(messagesQuery);

  useEffect(() => {
    if (existingMessages) {
      setMessages(existingMessages);
    } else if (!propConversationId) { // Only show initial message on new chat page
      setMessages([
        {
          id: 'initial-message',
          sender: 'ai',
          text: "Hello! I'm CloudWhisper. How can I help you with your cloud operations today? Feel free to describe an issue, ask for recommendations, or upload a screenshot.",
          timestamp: Date.now(),
        },
      ]);
    }
  }, [existingMessages, propConversationId]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImageDataUri(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  };

  const handleRecord = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          streamRef.current?.getTracks().forEach(track => track.stop());
          streamRef.current = null;
          
          toast({ title: "Transcribing audio..." });
          const reader = new FileReader();
          reader.onload = async (loadEvent) => {
            const audioDataUri = loadEvent.target?.result as string;
            try {
              const transcription = await runSpeechToText({ audioDataUri });
              setInput(prev => (prev ? `${prev} ${transcription}` : transcription).trim());
               toast({ title: "Transcription complete." });
            } catch (error) {
              console.error(error);
              toast({
                variant: 'destructive',
                title: 'Transcription Failed',
                description: 'Could not transcribe audio. Please try again.',
              });
            }
          };
          reader.readAsDataURL(audioBlob);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        toast({
          variant: "destructive",
          title: "Microphone Access Denied",
          description: "Please allow microphone access in your browser settings.",
        });
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageText = input.trim();
    const image = imageDataUri;

    if ((!messageText && !image) || !user) return;

    let currentConversationId = conversationId;
    const isNewConversation = !currentConversationId;

    if (isNewConversation) {
      const convoData = {
        userId: user.uid,
        title: 'New Conversation',
        startTime: new Date().toISOString(),
      };
      try {
        const convoRef = await addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'conversations'), convoData);
        currentConversationId = convoRef.id;
        setConversationId(currentConversationId); 
        router.replace(`/chat/${currentConversationId}`, { scroll: false });
      } catch (error) {
         console.error("Failed to create conversation:", error);
         toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not start a new conversation. Please try again.',
         });
         return;
      }
    }
    
    if (!currentConversationId) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not determine the conversation ID.',
      });
      return;
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      imageUri: image,
      timestamp: Date.now(),
    };

    addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'conversations', currentConversationId, 'messages'), userMessage);

    setInput('');
    setImageDataUri(null);
    setIsLoading(true);

    if (isNewConversation && messageText) {
      runGenerateTitle({ message: messageText }).then(titleResult => {
          if (titleResult && currentConversationId) {
              const conversationDocRef = doc(firestore, 'users', user.uid, 'conversations', currentConversationId);
              updateDocumentNonBlocking(conversationDocRef, { title: titleResult.title });
          }
      });
    }

    try {
      const result = await runAnalysis({
        logs: '',
        metrics: '',
        userQuestion: messageText,
        imageDataUri: image || undefined,
      });

      const aiMessage: Message = {
        id: (Date.now() + 2).toString(),
        sender: 'ai',
        text: result?.response || "I'm sorry, I couldn't process that.",
        analysis: result,
        timestamp: Date.now() + 2,
      };

      if (currentConversationId) {
         addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'conversations', currentConversationId, 'messages'), aiMessage);
      }
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        sender: 'ai',
        text: "Sorry, I encountered an error while analyzing your request. Please try again.",
        analysis: null,
        timestamp: Date.now() + 2
      };
       if (currentConversationId) {
         addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'conversations', currentConversationId, 'messages'), errorMessage);
      }
       toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'The AI model could not process the request.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isLoadingUI = isLoading || isLoadingMessages;

  return (
    <TooltipProvider>
      <div className="flex h-full flex-col">
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="container mx-auto max-w-4xl space-y-8 p-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : ''}`}
              >
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8 border-2 border-primary/50">
                    <AvatarFallback className="bg-primary/20">
                      <Cloud className="h-5 w-5 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`max-w-2xl rounded-lg px-4 py-3 shadow-md ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card'
                  }`}
                >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    
                    {message.sender === 'user' && message.imageUri && (
                        <div className="mt-2">
                            <img src={message.imageUri} alt="User upload" className="max-h-40 rounded-md border"/>
                        </div>
                    )}
                </div>

                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {(isLoadingMessages && conversationId) && (
                <div className="flex items-center justify-center p-8">
                    <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
            )}
             {isLoading && (
                <div className="flex items-start gap-4">
                    <Avatar className="h-8 w-8 border-2 border-primary/50">
                        <AvatarFallback className="bg-primary/20">
                        <Cloud className="h-5 w-5 text-primary" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="max-w-2xl rounded-lg px-4 py-3 shadow-md bg-card">
                        <div className="flex items-center gap-2">
                            <Loader className="h-4 w-4 animate-spin"/>
                            <span className="text-sm text-muted-foreground animate-pulse">CloudWhisper is thinking...</span>
                        </div>
                    </div>
                </div>
             )}

          </div>
        </ScrollArea>
        <div className="container mx-auto max-w-4xl border-t bg-background/80 p-4 backdrop-blur-sm">
          <form onSubmit={handleSendMessage} className="relative">
            {imageDataUri && (
                <div className="absolute bottom-16 w-fit">
                    <div className="relative w-fit">
                        <img src={imageDataUri} alt="Preview" className="max-h-32 rounded-md border bg-background p-1" />
                        <Button variant="ghost" size="icon" className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-card text-card-foreground hover:bg-muted" onClick={() => setImageDataUri(null)}>
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove image</span>
                        </Button>
                    </div>
                </div>
            )}
            <Input
              placeholder="Describe an issue, or ask for cloud service recommendations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading || isRecording}
              className="pr-32"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isLoading || isRecording}
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" disabled={isLoading || isRecording}>
                    <label htmlFor="image-upload" className="flex h-8 w-8 cursor-pointer items-center justify-center">
                      <ImageIcon className="h-4 w-4" />
                      <span className="sr-only">Upload Image</span>
                    </label>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Upload Screenshot</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={handleRecord} disabled={isLoading}>
                    {isRecording ? <AudioLines className="h-4 w-4 animate-pulse text-destructive" /> : <Mic className="h-4 w-4" />}
                    <span className="sr-only">{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isRecording ? 'Stop Recording' : 'Record from Mic'}</TooltipContent>
              </Tooltip>
              <Button type="submit" size="icon" className="ml-2 h-8 w-8" disabled={isLoading || (!input && !imageDataUri)}>
                {isLoading ? <Loader className="animate-spin" /> : <Send className="h-4 w-4" />}
                 <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </TooltipProvider>
  );
}
