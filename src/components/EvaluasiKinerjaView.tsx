import React, { useState } from 'react';
import { 
  BarChart2,
  Check,
  CheckCircle2, 
  ChevronDown,
  ChevronUp,
  ExternalLink, 
  FileCheck2, 
  HelpCircle, 
  Link2,
  MessageSquare, 
  Pencil, 
  RefreshCw,
  Save, 
  Smile, 
  Sparkles, 
  Star, 
  ThumbsUp,
  TrendingUp,
  UploadCloud,
  X
} from 'lucide-react';
import { RatingType, RencanaHasilKerjaItem, SKPData } from '../types';
import { calculatePredikatKinerja } from '../utils/skpCalculator';
import { KuadranGrafikKinerja } from './KuadranGrafikKinerja';
import { GarudaEmas } from './GarudaEmas';
import { LogoUploader } from './LogoUploader';
import { 
  BKN_EMOJIS, 
  coordinateEmojiFromInput, 
  ensureBknEmojiInFeedback, 
  extractActiveEmoji, 
  hasBknEmoji, 
  linkEmojiToFeedback 
} from '../utils/emojiCoordinator';

interface EvaluasiKinerjaViewProps {
  data: SKPData;
  onUpdate: (updated: Partial<SKPData>) => void;
  onOpenAI: (type?: string, context?: string) => void;
}

export const EvaluasiKinerjaView: React.FC<EvaluasiKinerjaViewProps> = ({
  data,
  onUpdate,
  onOpenAI,
}) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editRealisasi, setEditRealisasi] = useState('');
  const [editBukti, setEditBukti] = useState('');
  const [editFeedback, setEditFeedback] = useState('');
  const [showKuadranSection, setShowKuadranSection] = useState(true);
  const [showGarudaUploader, setShowGarudaUploader] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  // Use coordinated emojis from BKN standards
  const availableEmojis = BKN_EMOJIS;

  // Quick feedback phrase templates from BKN Excel
  const quickFeedbackTemplates = [
    {
      text: 'Pimpinan : Sudah baik, dapat ditingkatkan, sesuai bukti yang diterima 🙂',
      label: 'Sudah baik, dapat ditingkatkan 🙂',
    },
    {
      text: 'Pimpinan : Sangat Baik, dapat dipertahankan, sesuai bukti yang diterima 🙂',
      label: 'Sangat Baik, sesuai bukti 🙂',
    },
    {
      text: 'Pimpinan : OK, sesuai ekspektasi 👍',
      label: 'OK, sesuai ekspektasi 👍',
    },
    {
      text: 'Pimpinan : OK, sesuai yang diharapkan 🙂',
      label: 'OK, sesuai yang diharapkan 🙂',
    },
    {
      text: 'Pimpinan : Sangat Baik, dapat dipertahankan, sesuai dengan target waktu 👏',
      label: 'Sangat Baik, tepat waktu 👏',
    },
    {
      text: 'Pimpinan : Persentase tercapai sesuai dengan kesesuaian hasil laporan 🎯',
      label: 'Laporan tercapai 100% 🎯',
    },
    {
      text: 'Pimpinan : Perlu percepatan penyelesaian dan kelengkapan bukti fisik ⚠️',
      label: 'Perlu percepatan & bukti ⚠️',
    },
  ];

  const handleStartEdit = (item: RencanaHasilKerjaItem) => {
    setEditingItemId(item.id);
    setEditRealisasi(item.realisasi || '');
    setEditBukti(item.buktiDukung || '');
    setEditFeedback(item.umpanBalik || '');
  };

  const handleSaveItemEdit = (id: string) => {
    const updated = data.items.map((i) => {
      if (i.id === id) {
        return {
          ...i,
          realisasi: editRealisasi,
          buktiDukung: editBukti,
          umpanBalik: ensureBknEmojiInFeedback(editFeedback),
        };
      }
      return i;
    });
    onUpdate({ items: updated });
    setEditingItemId(null);
  };

  // Synchronously switch or link emoji to the feedback in the edit form
  const handleInsertEmoji = (emoji: string) => {
    setEditFeedback((prev) => linkEmojiToFeedback(prev, emoji));
  };

  // Direct 1-click linked emoji synchronization on a table row
  const handleQuickAddEmojiToItem = (itemId: string, emoji: string) => {
    const updated = data.items.map((item) => {
      if (item.id === itemId) {
        const newFeedback = linkEmojiToFeedback(item.umpanBalik, emoji);
        return { ...item, umpanBalik: newFeedback };
      }
      return item;
    });
    onUpdate({ items: updated });
  };

  // Batch activate BKN signature emoji across all items in SKP
  const handleSyncAllBknEmojis = () => {
    const updated = data.items.map((item) => ({
      ...item,
      umpanBalik: ensureBknEmojiInFeedback(item.umpanBalik),
    }));
    onUpdate({ items: updated });
    setSyncStatusMsg('Semua umpan balik berhasil disinkronkan dengan Emoji Khas BKN (🙂)');
    setTimeout(() => setSyncStatusMsg(null), 3000);
  };

  const handleRatingHasilChange = (newRating: RatingType) => {
    const newPredikat = calculatePredikatKinerja(newRating, data.ratingPerilakuKerja);
    onUpdate({
      ratingHasilKerja: newRating,
      predikatKinerja: newPredikat,
    });
  };

  const itemsUtama = data.items.filter((i) => i.kategori === 'UTAMA');
  const itemsTambahan = data.items.filter((i) => i.kategori === 'TAMBAHAN');

  return (
    <div className="space-y-6">
      {/* HEADER RESMI DOKUMEN EVALUASI KINERJA DENGAN LOGO GARUDA EMAS (SESUAI PERMENPAN-RB NO. 6/2022) */}
      <div className="bg-linear-to-b from-white to-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs text-center relative overflow-hidden">
        <div className="flex flex-col items-center justify-center space-y-2.5">
          <GarudaEmas customLogoUrl={data.customGarudaLogoUrl} className="w-20 h-20 mx-auto" />
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
              <span>★ Mahkota Lambang Negara Garuda Pancasila • Format Baku BKN Tanpa Kop Surat</span>
            </div>
            <h1 className="text-base sm:text-lg font-black uppercase text-slate-950 font-serif tracking-wide">
              DOKUMEN EVALUASI KINERJA PEGAWAI
            </h1>
            <p className="text-xs font-bold uppercase text-blue-950 tracking-wider">
              PENDEKATAN HASIL KERJA KUANTITATIF BAGI PEJABAT FUNGSIONAL {data.role === 'kepala_sekolah' ? 'KEPALA SEKOLAH' : 'GURU'}
            </p>
            <p className="text-[11px] text-slate-600 font-medium">
              Periode Penilaian: <span className="font-bold text-slate-800">{data.periode.rentangWaktu}</span> • {data.pegawai.unitKerja}
            </p>
          </div>

          {/* Tombol Upload / Ganti Logo Garuda */}
          <div className="pt-1">
            <button
              type="button"
              id="btn-toggle-garuda-uploader"
              onClick={() => setShowGarudaUploader(!showGarudaUploader)}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <UploadCloud className="w-3.5 h-3.5 text-amber-700" />
              <span>{showGarudaUploader ? 'Tutup Tempat Upload Logo' : 'Upload / Ganti Logo Garuda (Lembar Evaluasi & Matriks)'}</span>
              {data.customGarudaLogoUrl && (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
                  Logo Kustom Aktif
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* TEMPAT UPLOAD LOGO GARUDA (INLINE DI EVALUASI KINERJA & MATRIKS) */}
      {showGarudaUploader && (
        <div className="animate-fadeIn">
          <LogoUploader
            initialTab="garuda"
            currentLogoUrl={data.customLogoUrl}
            currentGarudaLogoUrl={data.customGarudaLogoUrl}
            onLogoChange={(logoUrl) => onUpdate({ customLogoUrl: logoUrl })}
            onGarudaLogoChange={(logoUrl) => onUpdate({ customGarudaLogoUrl: logoUrl })}
            title="Tempat Upload Logo Garuda (Lembar Evaluasi & Matriks Kualitatif)"
            description="Unggah Logo Garuda Pancasila kustom atau pilih preset resmi untuk disematkan di bagian atas Dokumen Evaluasi Kinerja dan Matriks Evaluasi Kinerja."
          />
        </div>
      )}

      {/* Title & Rating Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-blue-600" />
            <span>Evaluasi Kinerja Pendekatan Hasil Kerja Kuantitatif</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dilengkapi visualisasi grafik pola distribusi BKN, matriks kuadran 3x3, dan umpan balik ber-emoji 🙂 👍.
          </p>
        </div>

        {/* Right Controls: Toggle Grafik & Rating Hasil Kerja */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowKuadranSection(!showKuadranSection)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              showKuadranSection
                ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>Grafik & Kuadran 3x3</span>
            {showKuadranSection ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Rating Hasil Kerja Selector */}
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-700">RATING HASIL:</span>
            <select
              id="select-evaluasi-rating-hasil"
              value={data.ratingHasilKerja}
              onChange={(e) => handleRatingHasilChange(e.target.value as RatingType)}
              className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border focus:ring-2 focus:outline-hidden ${
                data.ratingHasilKerja === 'Di Atas Ekspektasi'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : data.ratingHasilKerja === 'Sesuai Ekspektasi'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-rose-50 text-rose-700 border-rose-300'
              }`}
            >
              <option value="Di Atas Ekspektasi">DI ATAS EKSPEKTASI</option>
              <option value="Sesuai Ekspektasi">SESUAI EKSPEKTASI</option>
              <option value="Di Bawah Ekspektasi">DI BAWAH EKSPEKTASI</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION: GAMBAR GRAFIK POLA DISTRIBUSI & MATRIKS KUADRAN KINERJA 3x3 */}
      {showKuadranSection && (
        <div className="animate-fadeIn">
          <KuadranGrafikKinerja
            data={data}
            onUpdate={onUpdate}
            readOnly={false}
          />
        </div>
      )}

      {/* Main Evaluasi Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Top Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-sm">Tabel Evaluasi Kinerja Pegawai</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1 border border-emerald-200">
                <span>Tanda Emoji BKN Aktif</span>
                <span>🙂 👍 👏 🌟 🎯</span>
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Emoji saling berkoordinasi dengan realisasi data dan tertaut langsung ke catatan umpan balik pimpinan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {syncStatusMsg && (
              <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-bold text-[11px] animate-fadeIn">
                ✓ {syncStatusMsg}
              </span>
            )}
            <button
              type="button"
              id="btn-sync-all-bkn-emojis"
              onClick={handleSyncAllBknEmojis}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              title="Pastikan seluruh baris memiliki emoji khas BKN standar Excel"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Aktifkan Semua Emoji Khas BKN (🙂 Standar Excel)</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="p-3 font-bold w-10 text-center border-r border-slate-200">No</th>
                <th className="p-3 font-bold min-w-[180px] border-r border-slate-200">
                  Rencana Hasil Kerja Pimpinan yang Diintervensi
                </th>
                <th className="p-3 font-bold min-w-[200px] border-r border-slate-200">
                  Rencana Hasil Kerja
                </th>
                <th className="p-3 font-bold w-20 text-center border-r border-slate-200">Aspek</th>
                <th className="p-3 font-bold min-w-[160px] border-r border-slate-200">
                  Indikator Kinerja Individu
                </th>
                <th className="p-3 font-bold w-24 text-center border-r border-slate-200">Target</th>
                <th className="p-3 font-bold min-w-[200px] border-r border-slate-200">
                  Realisasi Berdasarkan Bukti Dukung
                </th>
                <th className="p-3 font-bold min-w-[280px] border-r border-slate-200">
                  <div className="flex items-center justify-between">
                    <span>Umpan Balik Berkelanjutan Pimpinan</span>
                    <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-sm">
                      Emoji 🙂
                    </span>
                  </div>
                </th>
                <th className="p-3 font-bold w-16 text-center">Aksi</th>
              </tr>
              <tr className="bg-slate-50/70 text-slate-500 text-[10px] text-center border-b border-slate-200">
                <th className="p-1 border-r border-slate-200">(1)</th>
                <th className="p-1 border-r border-slate-200">-</th>
                <th className="p-1 border-r border-slate-200">(2)</th>
                <th className="p-1 border-r border-slate-200">-</th>
                <th className="p-1 border-r border-slate-200">(3)</th>
                <th className="p-1 border-r border-slate-200">(4)</th>
                <th className="p-1 border-r border-slate-200">(6)</th>
                <th className="p-1 border-r border-slate-200">(7)</th>
                <th className="p-1">-</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {/* Category Header: A. UTAMA */}
              <tr className="bg-slate-100/80 font-bold text-slate-900">
                <td colSpan={9} className="px-3 py-2 text-xs uppercase tracking-wider text-blue-900">
                  A. KINERJA UTAMA
                </td>
              </tr>

              {itemsUtama.map((item, index) => renderRowItem(item, index + 1))}

              {/* Category Header: B. TAMBAHAN */}
              {itemsTambahan.length > 0 && (
                <>
                  <tr className="bg-slate-100/80 font-bold text-slate-900">
                    <td colSpan={9} className="px-3 py-2 text-xs uppercase tracking-wider text-indigo-900">
                      B. KINERJA TAMBAHAN
                    </td>
                  </tr>
                  {itemsTambahan.map((item, index) => renderRowItem(item, itemsUtama.length + index + 1))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  function renderRowItem(item: RencanaHasilKerjaItem, nomorUrut: number) {
    const isEditing = editingItemId === item.id;
    const hasEmoji = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|🙂|👍|👏|🌟|🎯|💡|⚠️|📈|😊|🤝/u.test(
      item.umpanBalik || ''
    );

    return (
      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors align-top">
        <td className="p-3 text-center font-medium border-r border-slate-200 text-slate-500">
          {nomorUrut}
        </td>
        <td className="p-3 border-r border-slate-200 leading-relaxed text-slate-600">
          {item.rhkPimpinan}
        </td>
        <td className="p-3 border-r border-slate-200 font-semibold text-slate-900 leading-relaxed">
          {item.rencanaKinerja}
        </td>
        <td className="p-3 text-center border-r border-slate-200">
          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
            {item.aspek}
          </span>
        </td>
        <td className="p-3 border-r border-slate-200 leading-relaxed text-slate-700">
          {item.iki}
        </td>
        <td className="p-3 text-center font-bold text-slate-900 border-r border-slate-200 bg-slate-50/50">
          {item.target}
        </td>

        {/* Realisasi & Bukti Dukung Column */}
        <td className="p-3 border-r border-slate-200">
          {isEditing ? (
            <div className="space-y-2">
              <div>
                <label className="text-[10px] font-bold text-slate-600">Realisasi Fisik:</label>
                <textarea
                  rows={2}
                  value={editRealisasi}
                  onChange={(e) => setEditRealisasi(e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-600">Bukti Dukung / Tautan:</label>
                <input
                  type="text"
                  value={editBukti}
                  placeholder="Dokumen fisik / link Drive"
                  onChange={(e) => setEditBukti(e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="font-medium text-slate-900 leading-relaxed">
                {item.realisasi || <span className="text-slate-400 italic">Belum diisi</span>}
              </div>
              {item.buktiDukung && (
                <div className="text-[11px] text-blue-700 bg-blue-50/80 p-1.5 rounded flex items-start gap-1">
                  <ExternalLink className="w-3 h-3 mt-0.5 shrink-0" />
                  <span className="truncate">{item.buktiDukung}</span>
                </div>
              )}
            </div>
          )}
        </td>

        {/* Umpan Balik Berkelanjutan Column with EMOJI Picker & Reactions */}
        <td className="p-3 border-r border-slate-200">
          {isEditing ? (
            <div className="space-y-2.5">
              {/* Textarea for Feedback */}
              <textarea
                rows={3}
                value={editFeedback}
                onChange={(e) => setEditFeedback(e.target.value)}
                placeholder="Tuliskan umpan balik pimpinan beserta emoji (misal 🙂)..."
                className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />

              {/* Coordinated Live Recommendation Box based on editRealisasi */}
              {(() => {
                const coordinated = coordinateEmojiFromInput(editRealisasi, item.target, item.aspek);
                return (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg border border-blue-200 text-xs flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-base shrink-0">{coordinated.emoji}</span>
                      <div className="truncate">
                        <span className="text-[10px] font-bold text-blue-900 block truncate">
                          Koordinasi Otomatis: {coordinated.label}
                        </span>
                        <span className="text-[9px] text-blue-700 truncate block">
                          {coordinated.desc}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEditFeedback(linkEmojiToFeedback(editFeedback, coordinated.emoji));
                      }}
                      className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold shrink-0 shadow-2xs flex items-center gap-1 cursor-pointer"
                    >
                      <Link2 className="w-3 h-3" />
                      <span>Tautkan</span>
                    </button>
                  </div>
                );
              })()}

              {/* Bilah Pemilih Tanda Emoji (Emoji Picker Toolbar) */}
              <div className="bg-slate-100/90 p-2 rounded-lg border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                  <span className="flex items-center gap-1">
                    <Smile className="w-3.5 h-3.5 text-blue-600" />
                    <span>Sisipkan / Tautkan Emoji:</span>
                  </span>
                  <span className="text-[9px] text-slate-400 font-normal">Saling tertaut ke umpan balik</span>
                </div>

                <div className="flex flex-wrap items-center gap-1">
                  {availableEmojis.map((e) => {
                    const isSelected = editFeedback.includes(e.emoji);
                    return (
                      <button
                        key={e.emoji}
                        type="button"
                        onClick={() => handleInsertEmoji(e.emoji)}
                        title={`${e.label}: ${e.desc}`}
                        className={`px-2 py-1 rounded-md border text-xs flex items-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-100 text-blue-800 border-blue-300 font-bold'
                            : 'bg-white hover:bg-blue-50 text-slate-800 border-slate-200 shadow-2xs'
                        }`}
                      >
                        <span className="text-sm leading-none">{e.emoji}</span>
                        <span className="text-[9px] font-semibold">{e.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Template Cepat Ber-Emoji dari Excel BKN */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 block">
                  Template Kalimat Ber-Emoji:
                </span>
                <div className="flex flex-wrap gap-1">
                  {quickFeedbackTemplates.map((tmpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditFeedback(tmpl.text)}
                      className="text-[9px] px-2 py-0.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-800 rounded border border-slate-200 transition-all text-left truncate max-w-full"
                    >
                      {tmpl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Helper Button */}
              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => onOpenAI('feedback', `${item.rencanaKinerja} - Realisasi: ${editRealisasi}`)}
                  className="px-2 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded text-[10px] font-semibold flex items-center gap-1 border border-purple-200 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span>Saran Umpan Balik AI</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Umpan Balik Display Box with Active Linked Emoji */}
              {(() => {
                const activeEmoji = extractActiveEmoji(item.umpanBalik);
                return (
                  <>
                    <div className="p-2.5 rounded-lg border leading-relaxed text-xs bg-blue-50/40 border-blue-200/80 text-slate-900">
                      <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-blue-100">
                        <span className="text-[10px] font-bold text-blue-700 flex items-center gap-1">
                          <Link2 className="w-3 h-3 text-blue-600" />
                          <span>Emoji Tertaut:</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white text-blue-900 font-bold text-xs border border-blue-200 shadow-2xs">
                          {activeEmoji}
                        </span>
                      </div>
                      <div className="text-slate-800 font-medium">
                        {item.umpanBalik ? item.umpanBalik : (
                          <span className="text-slate-400 italic">Belum ada umpan balik</span>
                        )}
                      </div>
                    </div>

                    {/* Bilah Reaksi Cepat & Pergantian Emoji Tertaut */}
                    <div className="flex items-center flex-wrap gap-1 pt-0.5">
                      <span className="text-[10px] text-slate-400 font-medium mr-1 flex items-center gap-0.5">
                        <Smile className="w-3 h-3 text-blue-500" />
                        <span>Tautkan:</span>
                      </span>
                      {availableEmojis.slice(0, 6).map((em) => {
                        const isCurrentActive = activeEmoji === em.emoji;
                        return (
                          <button
                            key={em.emoji}
                            type="button"
                            onClick={() => handleQuickAddEmojiToItem(item.id, em.emoji)}
                            title={`${em.label}: ${em.desc} (Klik untuk menautkan ke umpan balik)`}
                            className={`px-1.5 py-0.5 rounded text-xs flex items-center gap-0.5 transition-all cursor-pointer ${
                              isCurrentActive
                                ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-300 shadow-2xs'
                                : 'bg-white hover:bg-blue-50 text-slate-700 border border-slate-200'
                            }`}
                          >
                            <span>{em.emoji}</span>
                            {isCurrentActive && <Check className="w-2.5 h-2.5 ml-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </td>

        {/* Action Column */}
        <td className="p-3 text-center whitespace-nowrap">
          {isEditing ? (
            <div className="flex flex-col gap-1 items-center">
              <button
                type="button"
                onClick={() => handleSaveItemEdit(item.id)}
                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan</span>
              </button>
              <button
                type="button"
                onClick={() => setEditingItemId(null)}
                className="px-2 py-1 text-slate-500 hover:text-slate-700 text-[10px] rounded cursor-pointer"
              >
                Batal
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => handleStartEdit(item)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
              title="Isi Realisasi & Feedback"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          )}
        </td>
      </tr>
    );
  }
};
