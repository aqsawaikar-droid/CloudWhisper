import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Cloud, GitBranch, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Intelligent Analysis',
    description:
      'CloudWhisper analyzes logs, metrics, and user input to provide intelligent root cause analysis for complex cloud issues.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    title: 'Guided Remediation',
    description:
      'Receive step-by-step guidance and automated workflows to resolve incidents quickly and reliably, reducing human error.',
  },
  {
    icon: <GitBranch className="h-8 w-8 text-primary" />,
    title: 'Proactive Improvements',
    description:
      'Get recommendations for architectural improvements, cost optimizations, and security enhancements based on your infrastructure.',
  },
  {
    icon: <Cloud className="h-8 w-8 text-accent" />,
    title: 'Multimodal Interaction',
    description:
      'Interact with your cloud environment using natural language, voice commands, or by uploading screenshots of errors.',
  },
];

const steps = [
    {
      step: "01",
      title: "Describe Your Issue",
      description: "Start a conversation by describing a problem, asking a question, or uploading a screenshot. Use text, voice, or images."
    },
    {
      step: "02",
      title: "Collaborate with AI",
      description: "CloudWhisper analyzes the context you provide and asks clarifying questions to collaboratively identify the root cause."
    },
    {
      step: "03",
      title: "Get Guided Solutions",
      description: "Receive clear, step-by-step explanations and actionable workflows to resolve the issue and improve your systems."
    }
]

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col bg-transparent text-foreground">
       <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Cloud className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">CloudWhisper</span>
          </Link>
          <nav className="hidden items-center justify-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/workflows"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Workflows
            </Link>
             <Link
              href="/history"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              History
            </Link>
            <Link
              href="/chat"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Chat
            </Link>
          </nav>
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild className='shadow-lg shadow-primary/20 transition-all hover:scale-105'>
              <Link href="/chat">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section
          id="hero"
          className="relative container mx-auto flex flex-col items-center justify-center px-4 py-32 text-center"
        >
          <div className="absolute inset-0 -z-10 -m-4 max-w-full">
            <div className="absolute h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(31,143,255,0.2),rgba(255,255,255,0))]"></div>
          </div>
           <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Cloud Ops powered by <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Voice, Vision & Text
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Your multimodal, conversational cloud operations agent. Deploy, monitor, and recover your cloud services through a seamless chat-based interface.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className='shadow-lg shadow-primary/20 transition-all hover:scale-105'>
              <Link href="/chat">
                Get Started
              </Link>
            </Button>
             <Button asChild size="lg" variant="outline">
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </div>
        </section>
        <section id="features" className="py-24 sm:py-32">
          <div className="container mx-auto px-4 md:px-6">
             <div className="mx-auto max-w-3xl text-center mb-16">
                <h2 className="text-4xl font-bold tracking-tight">Everything you need for intelligent cloud ops</h2>
                <p className="mt-4 text-lg text-muted-foreground">A single platform to analyze, remediate, and improve your cloud infrastructure.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-accent/10">
                  <CardHeader>
                    {feature.icon}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <CardTitle className='text-xl'>{feature.title}</CardTitle>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
         <section id="how-it-works" className="py-24 sm:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-4xl font-bold tracking-tight">How It Works</h2>
                <p className="mt-4 text-lg text-muted-foreground">A simple, three-step process to solve your cloud issues.</p>
            </div>
            <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.step} className="flex gap-6">
                    <div className="text-5xl font-bold text-primary/40">{step.step}</div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
