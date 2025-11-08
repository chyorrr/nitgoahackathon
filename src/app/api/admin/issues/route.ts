import { NextResponse } from 'next/server';
import { getIssues, updateIssue } from '@/lib/mockData';

export async function GET() {
  const issues = getIssues();
  return NextResponse.json({ issues });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, patch } = body;
    if (!id || !patch) return NextResponse.json({ error: 'id and patch are required' }, { status: 400 });
    const updated = updateIssue(id, patch);
    if (!updated) return NextResponse.json({ error: 'not found' }, { status: 404 });
    return NextResponse.json({ issue: updated });
  } catch (err) {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 });
  }
}
