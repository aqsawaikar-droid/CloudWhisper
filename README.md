# CloudWhisper

**An autonomous SRE assistant that detects, analyzes, and resolves production system issues through multimodal AI interaction.**

Built for Open Innovation | Team SheBuilds

---

## The Problem

Production system troubleshooting is complex and time-consuming. DevOps teams face three critical gaps:

**Interaction Gap** - Engineers must navigate complex dashboards, memorize CLI commands, and manually interpret dense logs.

**Monitoring Gap** - Traditional monitoring tools only alert humans but don't analyze root causes or suggest solutions.

**Response Gap** - System failures require manual intervention by on-call engineers, increasing mean time to resolution and introducing human error.

---

## Our Solution

CloudWhisper transforms how DevOps teams interact with production systems. Instead of juggling multiple tools and dashboards, engineers can simply:

- **Describe issues in natural language** - "My API is giving 504 errors"
- **Speak their problems** - Use voice commands for hands-free troubleshooting
- **Upload error screenshots** - AI analyzes images to understand the context

CloudWhisper uses Google's Gemini 1.5 Flash to intelligently analyze the problem, search through logs and metrics, identify root causes, and provide actionable recommendations.

---

## Key Features

**AI-Powered Analysis**
Uses Gemini 1.5 Flash to understand complex error patterns and provide intelligent diagnostics.

**Multimodal Interaction**
Supports text chat, voice commands, and image uploads for flexible communication.

**Speech-to-Text**
Describe production issues hands-free during incident response.

**Image Analysis**
Upload error screenshots for automatic OCR and AI interpretation.

**Conversation History**
Review past incidents and solutions to learn from previous troubleshooting sessions.

**Secure Authentication**
Firebase Authentication ensures secure access control.

---

## Technology Stack

### Google Technologies

- **Gemini 1.5 Flash** - Multimodal AI for intelligent analysis and decision-making
- **Google Genkit AI** - AI application framework for orchestrating workflows
- **Firebase Firestore** - Real-time database for conversations and audit logs
- **Firebase Authentication** - Secure user management
- **Cloud Vision API** - OCR and image analysis for error screenshots
- **Speech-to-Text API** - Voice command processing

### Additional Technologies

- **Next.js 15** - Modern React framework with App Router
- **React 19** - Latest React with improved performance
- **TypeScript** - Full type safety across the application
- **Tailwind CSS + shadcn/ui** - Modern, accessible UI components

---

## How It Works

1. **User Input** - Engineers interact via text, voice, or images
2. **AI Analysis** - Gemini processes the input and analyzes system context
3. **Intelligent Diagnosis** - AI identifies patterns and determines root causes
4. **Actionable Response** - Clear explanations and recommended solutions

---

## What Makes CloudWhisper Different

**Multimodal AI First**
Unlike text-only chatbots, CloudWhisper natively supports voice and image inputs, making it the first truly multimodal SRE assistant.

**Production-Ready**
This is a fully functional MVP deployed on Firebase with real authentication, database storage, and AI integration.

**Context-Aware Intelligence**
Gemini 1.5 Flash enables CloudWhisper to understand complex error scenarios and provide insights beyond simple pattern matching.

**Built for DevOps**
Designed specifically for incident response workflows with features like conversation history and multimodal input.

---

## Demo Scenarios

**Scenario 1: Database Error Analysis**
```
User: "What do you mean by 500 errors?"

CloudWhisper: Analyzes the error and explains that 500 errors 
indicate internal server failures caused by database connection 
termination. Provides details about the root cause from logs 
showing "Database query failed: connection terminated unexpectedly".
```

**Scenario 2: API Timeout Investigation**
```
User: "My API is giving a 504 Gateway Timeout"

CloudWhisper: Identifies that the primary database recently had 
connections terminated by an administrator command, leading to 
widespread query failures in the backend service. Explains the 
connection between the database issue and API timeouts.
```

---

## Setup & Installation

### Prerequisites

- Node.js 20+
- Google AI API key ([Get one here](https://aistudio.google.com/app/apikey))
- Firebase project (already configured)

### Quick Start

1. Clone the repository
```bash
git clone <repository-url>
cd cloudwhisper
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env.local
```

4. Add your Google AI API key to `.env.local`
```env
GOOGLE_API_KEY=your_api_key_here
```

5. Start the development server
```bash
npm run dev
```

6. Open [`(https://cloudwhisper.vercel.app/)` in your browser

---

## Project Structure

```
cloudwhisper/
├── src/
│   ├── ai/                 # AI flows and Genkit configuration
│   │   ├── flows/         # Analysis, speech-to-text, image OCR
│   │   └── genkit.ts      # Genkit setup
│   ├── app/               # Next.js pages
│   │   ├── chat/          # Main chat interface
│   │   ├── history/       # Conversation history
│   │   ├── workflows/     # Workflow management
│   │   └── login/         # Authentication
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── dashboard.tsx  # Main dashboard
│   ├── firebase/          # Firebase configuration
│   └── lib/              # Utilities and types
└── package.json
```

---

## Future Development

### Phase 2
- Advanced workflow builder for custom remediation actions
- Role-based access control for team management
- Slack and Microsoft Teams integration for alerts
- Automated incident report generation

### Long-Term Vision
- ML-powered anomaly detection and prediction
- Multi-cloud support (AWS, Azure, GCP)
- Collaborative troubleshooting sessions
- Integration with Jira and PagerDuty

---

## Impact

CloudWhisper addresses a critical need in DevOps:

**Reduced MTTR** - AI-powered diagnostics cut mean time to resolution from hours to minutes

**Lower Barrier to Entry** - Natural language and voice interfaces make cloud operations accessible to more engineers

**Better Incident Response** - Multimodal input allows for faster reporting during high-pressure situations

**Knowledge Retention** - Conversation history helps teams learn from past incidents

---

## Team

**Team Name:** SheBuilds  
**Team Members:** Aqsa Waikar  , Isha Sonawane 
**Problem Statement:** Open Innovation

---

## License

This project is private and proprietary.

---

Built with Google technologies for the hackathon
