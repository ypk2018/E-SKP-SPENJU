import React, { useState } from 'react';
import { 
  Check,
  CheckCircle, 
  HeartHandshake, 
  Link2,
  MessageSquare, 
  RefreshCw,
  Smile,
  Sparkles, 
  ThumbsUp 
} from 'lucide-react';
import { RatingType, SKPData } from '../types';
import { calculatePredikatKinerja } from '../utils/skpCalculator';
import { 
  BKN_EMOJIS, 
  ensureBknEmojiInFeedback, 
  extractActiveEmoji, 
  linkEmojiToFeedback 
} from '../utils/emojiCoordinator';

interface PerilakuBerakhlakViewProps {
  data: SKPData;
  onUpdate: (updated: Partial<SKPData>) => void;
  onOpenAI: (type?: string, context?: string) => void;
}

export const PerilakuBerakhlakView: React.FC<PerilakuBerakhlakViewProps> = ({
  data,
  onUpdate,
  onOpenAI,
}) => {
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  const handlePerilakuChange = (id: number, field: 'ekspektasiKhusus' | 'umpanBalik', value: string) => {
    const updated = data.perilaku.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          [field]: value,
        };
      }
      return p;
    });
    onUpdate({ perilaku: updated });
  };

  const handleLinkEmojiToPerilaku = (id: number, emoji: string) => {
    const updated = data.perilaku.map((p) => {
      if (p.id === id) {
        const newFeedback = linkEmojiToFeedback(p.umpanBalik, emoji);
        return {
          ...p,
          umpanBalik: newFeedback,
        };
      }
      return p;
    });
    onUpdate({ perilaku: updated });
  };

  const handleSyncAllPerilakuEmojis = () => {
    const updated = data.perilaku.map((p) => ({
      ...p,
      umpanBalik: ensureBknEmojiInFeedback(p.umpanBalik),
    }));
    onUpdate({ perilaku: updated });
    setSyncStatusMsg('Semua umpan balik perilaku berhasil disinkronkan dengan Emoji BKN (🙂)');
    setTimeout(() => setSyncStatusMsg(null), 3000);
  };

  const handleRatingPerilakuChange = (newRating: RatingType) => {
    const newPredikat = calculatePredikatKinerja(data.ratingHasilKerja, newRating);
    onUpdate({
      ratingPerilakuKerja: newRating,
      predikatKinerja: newPredikat,
    });
  };

  return (
    <div className="space-y-6">
      {/* Title & Rating Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-rose-600" />
              Perilaku Kerja ASN BerAKHLAK
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
              7 Core Values ASN
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluasi panduan perilaku, ekspektasi pimpinan, dan umpan balik bukti dukung di SMP Negeri 7 Sentani.
          </p>
        </div>

        {/* Right Controls: Sync Emoji & Rating Perilaku Kerja */}
        <div className="flex flex-wrap items-center gap-3">
          {syncStatusMsg && (
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-bold text-[11px] animate-fadeIn">
              ✓ {syncStatusMsg}
            </span>
          )}
          <button
            type="button"
            id="btn-sync-all-perilaku-emojis"
            onClick={handleSyncAllPerilakuEmojis}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            title="Sinkronkan seluruh umpan balik perilaku dengan emoji standar BKN"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Aktifkan Emoji BKN (🙂)</span>
          </button>

          {/* Rating Perilaku Kerja Selector */}
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-700">RATING PERILAKU:</span>
            <select
              id="select-rating-perilaku-page"
              value={data.ratingPerilakuKerja}
              onChange={(e) => handleRatingPerilakuChange(e.target.value as RatingType)}
              className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border focus:ring-2 focus:outline-hidden ${
                data.ratingPerilakuKerja === 'Di Atas Ekspektasi'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : data.ratingPerilakuKerja === 'Sesuai Ekspektasi'
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

      {/* 7 BerAKHLAK Value Cards */}
      <div className="space-y-4">
        {data.perilaku.map((item, index) => {
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-slate-300"
            >
              {/* Header Value */}
              <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 capitalize">
                      {item.nama}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Core Value ASN: {item.coreValue}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Aktif Dinilai
                </span>
              </div>

              {/* Body: Panduan, Ekspektasi, Umpan Balik */}
              <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
                {/* 1. Panduan Perilaku (Left 4 cols) */}
                <div className="lg:col-span-4 bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 text-xs mb-2 flex items-center gap-1.5">
                    <span>Panduan Standar Perilaku:</span>
                  </h4>
                  <ul className="space-y-2 text-slate-600 leading-relaxed list-disc list-inside">
                    {item.panduanPerilaku.map((panduan, pIdx) => (
                      <li key={pIdx} className="text-slate-700">
                        <span>{panduan}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Ekspektasi Khusus Pimpinan (Middle 4 cols) */}
                <div className="lg:col-span-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800 text-xs flex items-center gap-1">
                      <span>Ekspektasi Khusus Pimpinan:</span>
                    </label>
                  </div>
                  <textarea
                    rows={4}
                    value={item.ekspektasiKhusus}
                    onChange={(e) => handlePerilakuChange(item.id, 'ekspektasiKhusus', e.target.value)}
                    placeholder="Tuliskan ekspektasi perilaku khusus dari pimpinan..."
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-800 leading-relaxed font-medium"
                  ></textarea>
                </div>

                {/* 3. Umpan Balik Berkelanjutan Pimpinan (Right 4 cols) */}
                <div className="lg:col-span-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800 text-xs flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      <span>Umpan Balik Berdasarkan Bukti Dukung:</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => onOpenAI('feedback', `Core Value: ${item.coreValue} - Ekspektasi: ${item.ekspektasiKhusus}`)}
                      className="text-[10px] font-bold text-purple-700 hover:text-purple-900 flex items-center gap-0.5"
                    >
                      <Sparkles className="w-3 h-3 text-purple-600" />
                      <span>Saran AI</span>
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={item.umpanBalik}
                    onChange={(e) => handlePerilakuChange(item.id, 'umpanBalik', e.target.value)}
                    placeholder="Umpan balik / apresiasi pimpinan..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-800 leading-relaxed font-medium italic"
                  ></textarea>

                  {/* Bilah Koordinasi & Tautan Emoji BKN */}
                  {(() => {
                    const activeEmoji = extractActiveEmoji(item.umpanBalik);
                    return (
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-1.5 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-slate-500 flex items-center gap-0.5">
                            <Link2 className="w-3 h-3 text-blue-600" />
                            <span>Tertaut:</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold text-xs border border-blue-200 shadow-2xs">
                            {activeEmoji}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-slate-400 font-medium">Ganti:</span>
                          {BKN_EMOJIS.slice(0, 5).map((em) => {
                            const isCurrent = activeEmoji === em.emoji;
                            return (
                              <button
                                key={em.emoji}
                                type="button"
                                onClick={() => handleLinkEmojiToPerilaku(item.id, em.emoji)}
                                title={`Tautkan ${em.label} (${em.desc})`}
                                className={`px-1.5 py-0.5 rounded text-xs transition-all cursor-pointer ${
                                  isCurrent
                                    ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-300 shadow-2xs'
                                    : 'bg-white hover:bg-blue-50 text-slate-700 border border-slate-200'
                                }`}
                              >
                                <span>{em.emoji}</span>
                                {isCurrent && <Check className="w-2.5 h-2.5 inline ml-0.5" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
