import { NextRequest, NextResponse } from 'next/server';
import { orchestrateForge } from '@/lib/agents/orchestrator';

export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();

    if (!userInput || typeof userInput !== 'string') {
      return NextResponse.json(
        { error: 'User input is required' },
        { status: 400 }
      );
    }

    const blueprint = await orchestrateForge(userInput);

    return NextResponse.json({ blueprint });
  } catch (error) {
    console.error('Forge API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate website' },
      { status: 500 }
    );
  }
}
