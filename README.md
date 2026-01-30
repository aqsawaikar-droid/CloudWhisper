# CloudWhisper

This is an autonomous SRE assistant built using Next.js, Firebase, Google Cloud, and Vertex AI. It helps detect, analyze, and resolve production system issues through multimodal interaction (text, voice, and images).

---

## ✨ Features

- 🤖 **AI-Powered Analysis** - Uses Google's Gemini 1.5 Flash for intelligent issue analysis
- 💬 **Multimodal Chat** - Interact via text, voice, or upload screenshots
- 🔊 **Speech-to-Text** - Describe issues using your voice
- 🖼️ **Image Analysis** - Upload error screenshots for AI analysis
- 📝 **Conversation History** - Review past interactions
- 🔐 **User Authentication** - Secure Firebase authentication

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ installed
- Google AI API key ([Get one here](https://makersuite.google.com/app/apikey))
- Firebase project (already configured in the codebase)

### Setup Instructions

1. **Clone and Install**
   ```bash
   cd /path/to/Whisper
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   ```

3. **Add Your Google AI API Key**
   
   Open `.env.local` and replace the placeholder:
   ```env
   GOOGLE_API_KEY=your_actual_google_api_key_here
   ```
   
   > **How to get an API key:**
   > 1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   > 2. Sign in with your Google account
   > 3. Click "Create API Key"
   > 4. Copy the key and paste it in `.env.local`

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

5. **Open Your Browser**
   
   Navigate to [http://localhost:9002](http://localhost:9002)

---

## 🔧 Available Scripts

- `npm run dev` - Start development server on port 9002 (with Turbopack)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit development UI
- `npm run genkit:watch` - Start Genkit with watch mode

---

## 📁 Project Structure

```
Whisper/
├── src/
│   ├── ai/                  # AI flows and Genkit configuration
│   │   ├── flows/          # Individual AI flows (analysis, speech-to-text, etc.)
│   │   ├── genkit.ts       # Genkit AI setup
│   │   └── dev.ts          # Development entry point
│   ├── app/                # Next.js app router pages
│   │   ├── chat/           # Chat interface
│   │   ├── history/        # Conversation history
│   │   ├── workflows/      # Saved workflows
│   │   ├── login/          # Authentication
│   │   └── signup/         # User registration
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── dashboard.tsx  # Main chat dashboard
│   │   └── app-header.tsx # Application header
│   ├── firebase/          # Firebase configuration and utilities
│   └── lib/              # Utility functions and types
├── .env.local            # Local environment variables (gitignored)
├── .env.example          # Environment variable template
└── package.json          # Project dependencies
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_API_KEY` | ✅ Yes | Google AI API key for Gemini access |

---

## 🧪 Usage

### 1. **Sign Up / Login**
   - Navigate to the app
   - Create an account or sign in
   - You'll be redirected to the chat interface

### 2. **Start a Conversation**
   - Type a message describing your issue
   - Or click the microphone icon to use voice input
   - Or click the image icon to upload a screenshot

### 3. **Get AI Assistance**
   - CloudWhisper will analyze your input
   - Ask clarifying questions if needed
   - Provide recommendations and solutions

### 4. **Review History**
   - Access past conversations in the History page
   - Resume previous conversations
   - Review AI recommendations

---

## 🐛 Troubleshooting

### "AI model could not process the request"
- **Check your API key**: Ensure `GOOGLE_API_KEY` is set in `.env.local`
- **Verify API key**: Test your key at [Google AI Studio](https://makersuite.google.com)
- **Check quotas**: Ensure you haven't exceeded API rate limits

### "Microphone Access Denied"
- Allow microphone permissions in your browser settings
- Try a different browser (Chrome, Edge, Firefox recommended)

### Build or Runtime Errors
- Run `npm install` to ensure dependencies are installed
- Run `npm run typecheck` to check for TypeScript errors
- Check the browser console for detailed error messages

### Firebase Authentication Issues
- Ensure you're using the correct Firebase configuration
- Check that Firebase Authentication is enabled in your Firebase project

---

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

**Note**: Voice recording requires browser support for MediaRecorder API.

---

## 📚 Technologies Used

- **Framework**: Next.js 15 with App Router
- **AI**: Google Genkit AI + Gemini 1.5 Flash
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **UI**: React 19, Tailwind CSS, shadcn/ui
- **TypeScript**: Full type safety

---

## 🤝 Contributing

This is a personal project. If you'd like to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is private and proprietary.

---

## 💡 Tips

- Use specific error messages when asking for help (e.g., "Getting 403 error on Cloud Vision API")
- Upload screenshots of errors for faster analysis
- Use voice input for quick issue reporting
- Check the History page to review past solutions

---

## 🆘 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the [Google AI documentation](https://ai.google.dev/docs)
3. Check the browser console for error messages

