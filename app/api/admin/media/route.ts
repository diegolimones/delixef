import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabase';

const BUCKET = 'media';

// GET /api/admin/media?folder=chef — listar archivos
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const folder = req.nextUrl.searchParams.get('folder') || '';

  const { data, error } = await supabaseServer.storage
    .from(BUCKET)
    .list(folder, { sortBy: { column: 'created_at', order: 'desc' } });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const files = (data || [])
    .filter((f) => f.name !== '.emptyFolderPlaceholder')
    .map((f) => {
      const path = `${folder}/${f.name}`;
      const { data: urlData } = supabaseServer.storage.from(BUCKET).getPublicUrl(path);
      return { name: f.name, path, url: urlData.publicUrl };
    });

  return NextResponse.json({ files });
}

// DELETE /api/admin/media — eliminar archivo
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const { path } = await req.json();
  if (!path) return NextResponse.json({ error: 'Falta el path' }, { status: 400 });

  const { error } = await supabaseServer.storage.from(BUCKET).remove([path]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
