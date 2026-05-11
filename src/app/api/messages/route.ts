import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

const VALID_COLORS = ['pink', 'lav', 'blue', 'cream', 'mint'];

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const { results } = await env.DB.prepare(
      'SELECT id, name, note, color, created_at FROM bibi_messages ORDER BY created_at ASC LIMIT 200'
    ).all();
    return NextResponse.json({ ok: true, data: results });
  } catch (err) {
    console.error('[GET /api/messages]', err);
    return NextResponse.json({ ok: false, data: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const body = await req.json();
    const name = (body.name || '').trim().slice(0, 100);
    const note = (body.note || '').trim().slice(0, 1000);
    const color = VALID_COLORS.includes(body.color) ? body.color : 'pink';

    if (!name || !note) {
      return NextResponse.json({ ok: false, error: 'name and note required' }, { status: 400 });
    }

    const result = await env.DB.prepare(
      'INSERT INTO bibi_messages (name, note, color) VALUES (?, ?, ?) RETURNING *'
    ).bind(name, note, color).first();

    return NextResponse.json({ ok: true, data: result }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/messages]', err);
    return NextResponse.json({ ok: false, error: 'server error' }, { status: 500 });
  }
}
