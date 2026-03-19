import { appendFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  scope?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'name, email, and message are required' },
        { status: 400 },
      );
    }

    const submissionsDir = path.join(process.cwd(), '.submissions');
    const outFile = path.join(submissionsDir, 'contact.jsonl');
    await mkdir(submissionsDir, { recursive: true });

    const record = {
      receivedAt: new Date().toISOString(),
      source: 'next-frontend-contact-form',
      ...body,
    };

    await appendFile(outFile, JSON.stringify(record) + '\n', 'utf8');

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 });
  }
}
