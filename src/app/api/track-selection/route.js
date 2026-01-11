import { NextResponse } from 'next/server';
import { saveIssueSelection } from '@/app/lib/db';

export async function POST(request) {
  try {
    const { issueId, issueLabel, sessionId } = await request.json();

    if (!issueId || !issueLabel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await saveIssueSelection(issueId, issueLabel, sessionId);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
