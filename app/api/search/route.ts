import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant.' },
        { role: 'user', content: query }
      ],
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content || 'No response.';

    return NextResponse.json({ result: responseText });
  } catch (error) {
    console.error('OpenAI Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
