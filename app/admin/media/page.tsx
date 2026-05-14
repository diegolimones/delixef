'use client';

import { useAdminAuth } from '@/lib/hooks';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Section = 'chef' | 'galeria' | 'servicios';

interface MediaFile { name: string; url: string; path: string; }
interface Servicio { id: string; num: string; name: string; image: string; }
interface GaleriaItem { id: string; src: string; label: string; category: string; visible: boolean; }

const SECTIONS = [
  { id: 'chef' as Section,      label: 'Chef',      num: '01', folder: 'chef',      multiple: false },
  { id: 'galeria' as Section,   label: 'Galería',   num: '02', folder: 'galeria',   multiple: true  },
  { id: 'servicios' as Section, label: 'Servicios', num: '03', folder: 'servicios', multiple: true  },
];

const CATEGORIES = ['Desayunos', 'Comidas', 'Cenas', 'Eventos', 'General'];

export default function AdminMedia() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [active, setActive]           = useState<Section>('chef');
  const [files, setFiles]             = useState<Record<Section, MediaFile[]>>({ chef: [], galeria: [], servicios: [] });
  const [servicios, setServicios]     = useState<Servicio[]>([]);
  const [galeriaItems, setGaleriaItems] = useState<GaleriaItem[]>([]);
  const [activeChefImage, setActiveChefImage] = useState('');
  const [uploading, setUploading]     = useState(false);
  const [saving, setSaving]           = useState('');       // path of image being saved
  const [error, setError]             = useState('');
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [pendingUrl, setPendingUrl]   = useState('');
  // galeria add-form state
  const [addingGaleria, setAddingGaleria] = useState<string | null>(null); // file url
  const [galeriaLabel, setGaleriaLabel]   = useState('');
  const [galeriaCategory, setGaleriaCategory] = useState('General');
  const inputRef = useRef<HTMLInputElement>(null);

  const loadFiles = useCallback(async (section: Section) => {
    const folder = SECTIONS.find((s) => s.id === section)!.folder;
    const res = await fetch(`/api/admin/media?folder=${folder}`);
    const json = await res.json();
    setFiles((prev) => ({ ...prev, [section]: json.files || [] }));
  }, []);

  const loadGaleriaItems = useCallback(async () => {
    const { data } = await supabase.from('galeria').select('*').order('orden');
    setGaleriaItems(data || []);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    SECTIONS.forEach((s) => loadFiles(s.id));
    supabase.from('servicios').select('id, num, name, image').order('num').then(({ data }) => setServicios(data || []));
    supabase.from('configuracion').select('value').eq('key', 'chef_image').single().then(({ data }) => {
      if (data?.value) setActiveChefImage(data.value);
    });
    loadGaleriaItems();
  }, [isAuthenticated, loadFiles, loadGaleriaItems]);

  // ── Upload ──────────────────────────────────────────────────────────────
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.length) return;
    setUploading(true); setError('');
    const section = SECTIONS.find((s) => s.id === active)!;
    const uploaded: string[] = [];
    for (const file of Array.from(fileList)) {
      const fd = new FormData();
      fd.append('file', file); fd.append('folder', section.folder);
      const res  = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok || json.error) setError(`Error subiendo ${file.name}: ${json.error}`);
      else uploaded.push(json.url);
    }
    await loadFiles(active);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = async (file: MediaFile, section: Section) => {
    if (!confirm(`¿Eliminar ${file.name}?`)) return;
    await fetch('/api/admin/media', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path: file.path }) });
    await loadFiles(section);
  };

  // ── Chef: seleccionar foto activa ─────────────────────────────────────────
  const selectChefImage = async (url: string) => {
    setSaving(url);
    await fetch('/api/admin/configuracion', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'chef_image', value: url }) });
    setActiveChefImage(url);
    setSaving('');
  };

  // ── Servicios: asignar imagen ─────────────────────────────────────────────
  const assignToServicio = async (servicioId: string, url: string) => {
    await supabase.from('servicios').update({ image: url }).eq('id', servicioId);
    setServicios((prev) => prev.map((s) => (s.id === servicioId ? { ...s, image: url } : s)));
    setAssigningId(null); setPendingUrl('');
  };

  // ── Galería: añadir foto ──────────────────────────────────────────────────
  const addToGaleria = async (url: string) => {
    if (!galeriaLabel.trim()) return;
    const maxOrden = galeriaItems.reduce((m, i) => Math.max(m, i.orden || 0), 0);
    await fetch('/api/admin/galeria', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ src: url, label: galeriaLabel, category: galeriaCategory, visible: true, orden: maxOrden + 1 }),
    });
    await loadGaleriaItems();
    setAddingGaleria(null); setGaleriaLabel(''); setGaleriaCategory('General');
  };

  const removeFromGaleria = async (id: string) => {
    if (!confirm('¿Quitar esta foto de la galería web?')) return;
    await fetch('/api/admin/galeria', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await loadGaleriaItems();
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen bg-sand-50"><div className="font-display text-xl text-ink-mute font-light">Cargando…</div></div>;
  if (!isAuthenticated) return null;

  const currentSection = SECTIONS.find((s) => s.id === active)!;
  const currentFiles   = files[active];

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">

        {/* Header */}
        <div className="mb-12 pb-6 border-b border-sea-200/60">
          <span className="eyebrow text-coral-600">— N°06 · Imágenes</span>
          <h1 className="font-display font-light text-display-md text-ink leading-tight mt-3">
            Gestión de <span className="italic text-sea-600">imágenes</span>.
          </h1>
          <p className="mt-3 text-ink-mute font-light">Sube y asigna las fotos del chef, la galería y los servicios</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-sea-200/60 mb-10">
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`pb-4 flex items-baseline gap-3 transition-colors ${active === s.id ? 'border-b-2 border-amber-400 text-ink' : 'text-ink-mute hover:text-ink'}`}>
              <span className="font-display text-sm text-sea-400 font-light">{s.num}</span>
              <span className="font-display text-lg">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Instrucción por sección */}
        <p className="text-ink-mute font-light mb-6 text-sm">
          {active === 'chef'     && 'Sube la foto y pulsa "Usar como foto del chef" para que se actualice en la web.'}
          {active === 'galeria'  && 'Sube fotos y pulsa "Añadir a galería" para que aparezcan en el diario de la web.'}
          {active === 'servicios' && 'Sube fotos y pulsa "Asignar →" para vincularlas a cada servicio.'}
        </p>

        {/* Drop zone */}
        <div className="mb-10">
          <label className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl py-10 px-6 cursor-pointer transition-colors ${uploading ? 'border-amber-300 bg-amber-50/60' : 'border-sea-200 hover:border-amber-400 hover:bg-amber-50/30'}`}>
            <input ref={inputRef} type="file" accept="image/*" multiple={currentSection.multiple} onChange={handleUpload} className="sr-only" disabled={uploading} />
            {uploading
              ? <span className="font-display text-lg text-amber-600 italic">Subiendo…</span>
              : <>
                  <span className="font-display text-2xl text-ink-soft font-light mb-2">
                    {currentSection.multiple ? 'Arrastra o selecciona fotos' : 'Arrastra o selecciona una foto'}
                  </span>
                  <span className="eyebrow text-ink-mute">JPG, PNG, WEBP · Máx. 10 MB por archivo</span>
                </>
            }
          </label>
          {error && <div className="mt-4 border border-coral-500/50 bg-coral-500/10 px-4 py-3 rounded-lg"><p className="text-sm text-coral-600 font-light">{error}</p></div>}
        </div>

        {/* Grid de imágenes */}
        {currentFiles.length === 0 ? (
          <div className="border-y border-sea-200/60 py-20 text-center">
            <p className="font-display text-2xl text-ink-soft font-light">Carpeta vacía.</p>
            <p className="mt-3 text-ink-mute font-light">Sube la primera imagen usando el área de arriba.</p>
          </div>
        ) : (
          <>
            <div className="mb-4"><span className="eyebrow text-ink-mute">{currentFiles.length} imagen{currentFiles.length !== 1 ? 'es' : ''}</span></div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentFiles.map((file) => {
                const isActiveChef = active === 'chef' && activeChefImage === file.url;
                const inGaleria    = active === 'galeria' && galeriaItems.some((g) => g.src === file.url);

                return (
                  <div key={file.path} className="group">
                    {/* Imagen */}
                    <div className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${isActiveChef ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-transparent'}`}>
                      <Image src={file.url} alt={file.name} fill sizes="25vw" className="object-cover" />

                      {/* Badge activo */}
                      {isActiveChef && (
                        <div className="absolute top-2 left-2 bg-amber-400 text-ink text-[0.6rem] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">
                          Activa
                        </div>
                      )}
                      {inGaleria && (
                        <div className="absolute top-2 left-2 bg-sea-600 text-sand-50 text-[0.6rem] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">
                          En galería
                        </div>
                      )}
                    </div>

                    {/* Nombre */}
                    <p className="mt-1.5 text-xs text-ink-mute truncate">{file.name}</p>

                    {/* Acciones */}
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {/* Chef */}
                      {active === 'chef' && !isActiveChef && (
                        <button onClick={() => selectChefImage(file.url)} disabled={saving === file.url}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-ink text-[0.65rem] font-semibold tracking-wider uppercase hover:bg-amber-300 transition-colors disabled:opacity-50">
                          {saving === file.url ? 'Guardando…' : '★ Usar como foto del chef'}
                        </button>
                      )}

                      {/* Galería: añadir */}
                      {active === 'galeria' && !inGaleria && (
                        <button onClick={() => { setAddingGaleria(file.url); setGaleriaLabel(''); setGaleriaCategory('General'); }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sea-700 text-sand-50 text-[0.65rem] font-semibold tracking-wider uppercase hover:bg-sea-600 transition-colors">
                          + Añadir a galería
                        </button>
                      )}
                      {/* Galería: quitar */}
                      {active === 'galeria' && inGaleria && (
                        <button onClick={() => { const item = galeriaItems.find((g) => g.src === file.url); if (item) removeFromGaleria(item.id); }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ink/[0.06] text-ink-mute text-[0.65rem] font-semibold tracking-wider uppercase hover:bg-coral-50 hover:text-coral-700 transition-colors">
                          Quitar
                        </button>
                      )}

                      {/* Servicios */}
                      {active === 'servicios' && (
                        <button onClick={() => { setAssigningId(assigningId === file.path ? null : file.path); setPendingUrl(file.url); }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sea-700 text-sand-50 text-[0.65rem] font-semibold tracking-wider uppercase hover:bg-sea-600 transition-colors">
                          Asignar →
                        </button>
                      )}

                      <button onClick={() => handleDelete(file, active)}
                        className="inline-flex items-center px-2 py-1 rounded-full text-[0.65rem] font-semibold tracking-wider uppercase text-coral-500 hover:text-coral-700 hover:bg-coral-50 transition-colors ml-auto">
                        ✕
                      </button>
                    </div>

                    {/* Form añadir a galería */}
                    {active === 'galeria' && addingGaleria === file.url && (
                      <div className="mt-2 border border-sea-200 rounded-lg bg-white p-3 shadow-sm space-y-2">
                        <input
                          type="text" value={galeriaLabel} onChange={(e) => setGaleriaLabel(e.target.value)}
                          placeholder="Nombre del plato / foto"
                          className="w-full text-sm px-0 py-1.5 border-b border-sea-200 bg-transparent focus:outline-none focus:border-ink text-ink placeholder:text-ink-mute font-light"
                        />
                        <select value={galeriaCategory} onChange={(e) => setGaleriaCategory(e.target.value)}
                          className="w-full text-sm px-0 py-1.5 border-b border-sea-200 bg-transparent focus:outline-none text-ink font-light">
                          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                        <div className="flex gap-2 pt-1">
                          <button onClick={() => addToGaleria(file.url)} disabled={!galeriaLabel.trim()}
                            className="flex-1 px-3 py-1.5 rounded-full bg-ink text-sand-50 text-[0.65rem] font-semibold tracking-wider uppercase hover:bg-sea-900 transition-colors disabled:opacity-40">
                            Confirmar
                          </button>
                          <button onClick={() => setAddingGaleria(null)}
                            className="px-3 py-1.5 rounded-full border border-sea-200 text-[0.65rem] font-semibold tracking-wider uppercase text-ink-mute hover:text-ink transition-colors">
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Panel asignar a servicio */}
                    {active === 'servicios' && assigningId === file.path && (
                      <div className="mt-2 border border-sea-200 rounded-lg bg-white p-3 shadow-sm">
                        <p className="eyebrow text-ink-mute mb-2">Asignar a</p>
                        <ul className="space-y-1">
                          {servicios.map((s) => (
                            <li key={s.id}>
                              <button onClick={() => assignToServicio(s.id, pendingUrl)}
                                className="w-full text-left text-sm text-ink hover:text-amber-600 transition-colors py-1 flex items-baseline gap-2">
                                <span className="font-display text-xs text-sea-400">{s.num}</span>
                                <span className="font-light">{s.name}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Panel inferior: galería actual en web */}
        {active === 'galeria' && galeriaItems.length > 0 && (
          <div className="mt-14">
            <span className="eyebrow text-coral-600 block mb-4">— Galería activa en la web</span>
            <h2 className="font-display text-2xl font-light text-ink mb-6">
              {galeriaItems.filter((g) => g.visible).length} fotos publicadas
            </h2>
            <ul className="divide-y divide-sea-200/60 border-t border-sea-200/60">
              {galeriaItems.map((g) => (
                <li key={g.id} className="py-4 flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-md overflow-hidden shrink-0 bg-sand-200">
                    <Image src={g.src} alt={g.label} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{g.label}</p>
                    <p className="eyebrow text-ink-mute mt-0.5">{g.category}</p>
                  </div>
                  <button onClick={() => removeFromGaleria(g.id)}
                    className="shrink-0 text-[0.65rem] font-semibold tracking-wider uppercase text-coral-500 hover:text-coral-700 transition-colors">
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Panel inferior: servicios con imagen actual */}
        {active === 'servicios' && servicios.length > 0 && (
          <div className="mt-14">
            <span className="eyebrow text-coral-600 block mb-4">— Imágenes asignadas</span>
            <ul className="divide-y divide-sea-200/60 border-t border-sea-200/60">
              {servicios.map((s) => (
                <li key={s.id} className="py-4 flex items-center gap-4">
                  <span className="font-display text-sm text-sea-400 w-6 shrink-0">{s.num}</span>
                  <div className="relative w-14 h-14 rounded-md overflow-hidden shrink-0 bg-sand-200">
                    {s.image && <Image src={s.image} alt={s.name} fill sizes="56px" className="object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-lg text-ink font-light">{s.name}</p>
                    <p className="text-xs text-ink-mute truncate">{s.image || 'Sin imagen'}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
