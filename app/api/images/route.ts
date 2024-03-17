import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, amount = 1, resolution = '512x512' } = body;

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API Key not configured.', {
        status: 500,
      });
    }
    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }
    if (!amount) {
      return new NextResponse('Amount is required', { status: 400 });
    }
    if (!resolution) {
      return new NextResponse('Resolution is required', { status: 400 });
    }

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: resolution,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
