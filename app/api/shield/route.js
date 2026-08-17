import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { review, industry, location } = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are an elite corporate public relations counselor and crisis mitigation expert. Analyze the customer review provided and generate structured response strategies.
          
          CRITICAL GENERATION BOUNDARIES (DO NOT VIOLATE):
          1. Never apologize for negligence, admit legal fault, or validate liability. Use neutral framing like "We take all service logging seriously."
          2. Explicitly ban generic AI clichés: "Dear Valued Customer", "delve", "testament", "apologize for any inconvenience", "rest assured", "moreover", "thank you for your feedback".
          3. Structure syntax lengths dynamically to mimic high-end advisory correspondence.
          4. If industry is "Medical & Dental", do not include any private patient diagnostic descriptions to ensure total regulatory compliance. Push entirely offline instantly.
          5. Integrate the city context ("${location}") and industry ("${industry}") smoothly to benefit local structural visibility without over-stuffing.

          Return EXACTLY a JSON structure with three options format:
          {
            "vectors": {
              "highRoadDefense": "Clean, brief text moving review offline safely to a private phone/email placeholder.",
              "noRecordIsolation": "Engineered for spam/fake alerts. Notes no transaction record matching this user exists in internal logs.",
              "seoRecoveryMatrix": "Re-contextualizes standard operational procedures while utilizing service variables naturally."
            }
          }`
        },
        {
          role: "user",
          content: `Industry context: ${industry}. Business Location: ${location}. Review text: "${review}"`
        }
      ],
      temperature: 0.3,
    });

    const payload = JSON.parse(response.choices[0].message.content);
    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: "Upstream API timeout error." }, { status: 500 });
  }
}
