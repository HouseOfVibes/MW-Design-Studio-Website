import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY || '');

// MW Design Studio business context for the AI
const BUSINESS_CONTEXT = `
You are the AI assistant for MW Design Studio, a strategic brand and marketing agency. Here's key information about the business:

SERVICES:
- Brand Services: Logo design, brand identity, brand guidelines, brand strategy, rebranding
- Marketing Services: Marketing strategy, content marketing, email marketing, digital advertising, marketing automation
- Social Media Services: Social media strategy, content creation, community management, social media advertising, analytics

PRICING STRUCTURE:
- Brand Identity Package: Starting at $2,500
- Marketing Strategy: Starting at $1,500
- Social Media Management: $800-2,500/month
- Website Design: Starting at $3,500
- Full Brand & Marketing Package: $5,000-15,000

PROCESS:
1. Discovery call (free consultation)
2. Strategy development
3. Creative execution
4. Implementation & launch
5. Ongoing support

TARGET CLIENTS:
- Small to medium businesses
- Entrepreneurs and startups
- Established businesses needing rebranding
- Service-based businesses

UNIQUE VALUE PROPOSITIONS:
- Strategic approach combining brand and marketing
- Data-driven decision making
- ROI-focused results
- Comprehensive brand transformation
- Experienced team with proven track record

CONTACT INFO:
- Email: hello@mwdesignstudio.com
- Website intake form for consultations
- Located in the US but work globally via video calls
- Response time: Within 24 business hours

TONE:
- Professional but approachable
- Helpful and consultative
- Confident in expertise
- Focus on business transformation and results

Always encourage users to complete the intake form for personalized consultation. If asked about specific pricing, give ranges but emphasize that custom quotes are provided after discovery calls.

Keep responses helpful, concise, and focused on how MW Design Studio can help solve their business challenges.
`;

// Send notification to Google Chat space
async function sendGoogleChatNotification(userMessage: string, botResponse: string) {
  const webhookUrl = import.meta.env.GOOGLE_CHAT_WEBHOOK_URL;
  
  if (!webhookUrl) return; // Skip if webhook not configured
  
  try {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const payload = {
      text: `🤖 *Website Chatbot Activity*\n\n*Time:* ${timestamp}\n\n*User Question:*\n${userMessage}\n\n*Bot Response:*\n${botResponse.substring(0, 300)}${botResponse.length > 300 ? '...' : ''}\n\n_Visit the website to see full conversation_`
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Google Chat webhook error:', error);
    // Don't fail the main request if webhook fails
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Better error handling for request parsing
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return new Response(JSON.stringify({ 
        response: "I'm having trouble understanding your message. Please try again or contact us directly at hello@mwdesignstudio.com" 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const { message } = body;
    
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ 
        response: "Please send me a message so I can help you!"
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if API key is available
    if (!import.meta.env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ 
        response: "I'm currently offline for maintenance. Please contact us directly at hello@mwdesignstudio.com or complete our intake form for a consultation." 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create the prompt with business context
    const prompt = `${BUSINESS_CONTEXT}

User question: ${message}

Provide a helpful response as the MW Design Studio AI assistant. If the user asks about:
- Services: Explain relevant offerings and benefits
- Pricing: Provide ranges but encourage consultation for custom quote
- Process: Outline our 5-step approach
- Results: Mention our track record and ROI focus
- Getting started: Direct them to intake form or discovery call

Keep response conversational, helpful, and under 200 words unless detailed explanation is needed.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send notification to Google Chat (don't wait for it)
    sendGoogleChatNotification(message, text).catch(console.error);

    return new Response(JSON.stringify({ response: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Fallback response for any errors
    return new Response(JSON.stringify({ 
      response: "I'm having trouble right now, but I'd love to help you! Please reach out to us directly at hello@mwdesignstudio.com or complete our intake form to get started with a free consultation." 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};