# **App Name**: SRE Assistant

## Core Features:

- Issue Detection: Detect production system issues based on user input from voice, images, logs, and metrics.
- Data Collection: Collect user voice commands, error screenshots, live metrics, and recent error logs and store temporarily in Firestore.
- Root Cause Analysis: Analyze collected data using Gemini 2.0 Flash to identify the root cause of detected issues.
- Severity Assessment: Assess the severity of the issue (LOW, MEDIUM, HIGH) based on analysis.
- Remediation Workflow Selection: Select the appropriate pre-approved remediation workflow based on the identified root cause and severity.
- Argo Workflow Execution: Trigger the selected Argo Workflow using the Argo Server API to automatically remediate the issue.
- Action Logging: Log every action and decision in Firestore for auditing purposes. Also include the use of tool for LLM decision.

## Style Guidelines:

- Primary color: Dark blue (#243A73), evokes stability and authority, critical for a system administration interface.
- Background color: Very light blue (#F0F4FF), low saturation background creates a comfortable contrast against dark-themed elements.
- Accent color: Vibrant orange (#E07A5F), ensures critical actionable elements are highlighted prominently.
- Body and headline font: 'Inter' sans-serif, provides a modern, neutral typeface suitable for both headings and body text.
- Code font: 'Source Code Pro' monospaced, essential for displaying logs and configuration details.
- Use clear, minimalist icons to represent system status and actions.
- Subtle transitions and animations to indicate system activity and workflow progression.