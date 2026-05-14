import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabase';

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const { key, value } = await req.json();
  if (!key) return NextResponse.json({ error: 'Falta key' }, { status: 400 });

  const { error } = await supabaseServer
    .from('configuracion')
    .upsert({ key, value }, { onConflict: 'key' });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const { data } = await supabaseServer.from('configuracion').select('key, value');
  const config = Object.fromEntries((data || []).map((r) => [r.key, r.value]));
  return NextResponse.json(config);
}
