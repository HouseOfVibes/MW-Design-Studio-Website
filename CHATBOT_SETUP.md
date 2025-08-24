# 🤖 MW Design Studio Chatbot Setup Guide

Your website now includes a custom AI chatbot powered by Google's Gemini API! Here's how to set it up and configure it.

## ✅ What's Already Done

- ✅ **Chatbot UI Component** - Beautiful floating chat widget
- ✅ **Backend API Integration** - `/api/chat` endpoint with Gemini API
- ✅ **Google Chat Notifications** - Get notified when customers use the chatbot
- ✅ **Business Context Training** - Pre-loaded with MW Design Studio information
- ✅ **Mobile Responsive** - Works perfectly on all devices
- ✅ **Site-wide Integration** - Available on every page

## 🚀 Setup Steps

### 1. Get Your Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the generated key

### 2. Setup Google Chat Webhook (Optional)

1. Open your Google Chat space
2. Go to space settings
3. Click "Manage webhooks"
4. Create a new webhook
5. Copy the webhook URL

### 3. Configure Environment Variables

Create a `.env` file (copy from `.env.example`):

```bash
# Required for chatbot to work
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Optional - for notifications
GOOGLE_CHAT_WEBHOOK_URL=your_webhook_url_here
```

### 4. Deploy to cPanel

Upload these files to your cPanel hosting:
- All files from the `/dist` folder
- Your `.env` file (make sure your host supports Node.js environment variables)

## 🎯 Chatbot Features

### What It Can Do:
- **Answer service questions** - Brand design, marketing, social media
- **Provide pricing information** - Gives ranges, encourages consultations
- **Explain your process** - 5-step approach from discovery to launch
- **Direct to intake form** - Converts visitors to leads
- **Handle common FAQs** - Business hours, location, process questions

### Business Intelligence:
- **Pre-loaded with your services** and pricing ranges
- **Knows your target audience** (small businesses, entrepreneurs)
- **Understands your value props** (strategic approach, ROI focus)
- **Matches your brand voice** (professional but approachable)

### Notification System:
When someone chats, you'll get a Google Chat notification with:
- Timestamp of the conversation
- User's question
- Bot's response (first 300 characters)
- Prompt to check the full conversation

## 💡 Customization Options

### Update Business Information
Edit `/src/pages/api/chat.ts` and modify the `BUSINESS_CONTEXT` section to:
- Update pricing ranges
- Add new services
- Change business information
- Adjust the chatbot's personality

### Styling Changes
Edit `/src/components/Chatbot.astro` to:
- Change colors (uses your existing CSS variables)
- Modify the chat window size
- Update the welcome message
- Adjust positioning

### Advanced Features You Can Add:
- **Lead qualification** - Ask qualifying questions before showing contact form
- **Appointment booking** - Integration with scheduling tools
- **File attachments** - Allow users to send images/documents
- **Multi-language support** - Detect and respond in different languages
- **Analytics tracking** - Track chat engagement and common questions

## 📊 Cost Estimate

**Gemini API Pricing:**
- ~$0.50 per 1 million input tokens
- Average chat: ~200 tokens
- **Estimated monthly cost: $5-20** (based on 100-500 conversations/month)

**Much cheaper than:**
- Intercom: $99+/month
- Drift: $500+/month  
- Zendesk Chat: $59+/month

## 🔧 Troubleshooting

### Chatbot Not Responding:
1. Check `.env` file has correct `GEMINI_API_KEY`
2. Verify API key is active in Google AI Studio
3. Check browser console for errors

### No Google Chat Notifications:
1. Verify `GOOGLE_CHAT_WEBHOOK_URL` is correct
2. Test webhook URL manually with a POST request
3. Check Google Chat space has webhook enabled

### Styling Issues:
1. Clear browser cache
2. Check CSS variables are loaded
3. Verify responsive design on different screen sizes

## 🎉 You're All Set!

Your customers can now:
- Ask questions about your services 24/7
- Get instant responses about pricing and process
- Be guided to your intake form for consultations
- Have a more engaging experience on your website

**The chatbot will work even without the API key** - it will show a fallback message directing users to contact you directly.

Need help with setup? Contact your development team or check the implementation files for detailed code comments.