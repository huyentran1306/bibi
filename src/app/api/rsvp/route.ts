import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const { results } = await env.DB.prepare(
      'SELECT id, name, note, status, created_at FROM bibi_rsvp ORDER BY created_at DESC LIMIT 200'
    ).all();
    return NextResponse.json({ ok: true, data: results });
  } catch (err) {
    console.error('[GET /api/rsvp]', err);
    return NextResponse.json({ ok: false, data: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const body = await req.json();
    const name = (body.name || '').trim().slice(0, 100);
    const note = (body.note || '').trim().slice(0, 500);
    const status = ['yes', 'maybe', 'no'].includes(body.status) ? body.status : 'yes';

    if (!name) return NextResponse.json({ ok: false, error: 'name required' }, { status: 400 });

    const result = await env.DB.prepare(
      'INSERT INTO bibi_rsvp (name, note, status) VALUES (?, ?, ?) RETURNING *'
    ).bind(name, note, status).first();

    return NextResponse.json({ ok: true, data: result }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/rsvp]', err);
    return NextResponse.json({ ok: false, error: 'server error' }, { status: 500 });
  }
}
