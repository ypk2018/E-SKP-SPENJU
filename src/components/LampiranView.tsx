import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Layers, 
  Plus, 
  ShieldCheck, 
  Trash2, 
  Wrench 
} from 'lucide-react';
import { SKPData } from '../types';

interface LampiranViewProps {
  data: SKPData;
  onUpdate: (updated: Partial<SKPData>) => void;
}

export const LampiranView: React.FC<LampiranViewProps> = ({
  data,
  onUpdate,
}) => {
  const [newSumberDaya, setNewSumberDaya] = useState('');
  const [newSkema, setNewSkema] = useState('');
  const [newKonsekuensi, setNewKonsekuensi] = useState('');

  const handleAddSumberDaya = () => {
    if (!newSumberDaya.trim()) return;
    onUpdate({
      lampiran: {
        ...data.lampiran,
        dukunganSumberDaya: [...data.lampiran.dukunganSumberDaya, newSumberDaya.trim()],
      },
    });
    setNewSumberDaya('');
  };

  const handleRemoveSumberDaya = (index: number) => {
    onUpdate({
      lampiran: {
        ...data.lampiran,
        dukunganSumberDaya: data.lampiran.dukunganSumberDaya.filter((_, i) => i !== index),
      },
    });
  };

  const handleAddSkema = () => {
    if (!newSkema.trim()) return;
    onUpdate({
      lampiran: {
        ...data.lampiran,
        skemaPertanggungjawaban: [...data.lampiran.skemaPertanggungjawaban, newSkema.trim()],
      },
    });
    setNewSkema('');
  };

  const handleRemoveSkema = (index: number) => {
    onUpdate({
      lampiran: {
        ...data.lampiran,
        skemaPertanggungjawaban: data.lampiran.skemaPertanggungjawaban.filter((_, i) => i !== index),
      },
    });
  };

  const handleAddKonsekuensi = () => {
    if (!newKonsekuensi.trim()) return;
    onUpdate({
      lampiran: {
        ...data.lampiran,
        konsekuensi: [...data.lampiran.konsekuensi, newKonsekuensi.trim()],
      },
    });
    setNewKonsekuensi('');
  };

  const handleRemoveKonsekuensi = (index: number) => {
    onUpdate({
      lampiran: {
        ...data.lampiran,
        konsekuensi: data.lampiran.konsekuensi.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          Lampiran Sasaran Kinerja Pegawai (SKP)
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Memuat kesepakatan Dukungan Sumber Daya, Skema Pertanggungjawaban, dan Konsekuensi pencapaian kinerja di SMP Negeri 7 Sentani.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        {/* 1. DUKUNGAN SUMBER DAYA */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">1. Dukungan Sumber Daya</h3>
                <p className="text-[11px] text-slate-500">Sarana, prasarana, dan fasilitas penunjang</p>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {data.lampiran.dukunganSumberDaya.map((item, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 p-2 bg-slate-50 rounded-lg group border border-slate-100">
                  <span className="text-slate-800 leading-relaxed font-medium">
                    {idx + 1}. {item}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSumberDaya(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1 opacity-80 group-hover:opacity-100"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSumberDaya}
                onChange={(e) => setNewSumberDaya(e.target.value)}
                placeholder="Tambah dukungan sumber daya..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddSumberDaya}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. SKEMA PERTANGGUNGJAWABAN */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">2. Skema Pertanggungjawaban</h3>
                <p className="text-[11px] text-slate-500">Mekanisme & jadwal pelaporan kinerja</p>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {data.lampiran.skemaPertanggungjawaban.map((item, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 p-2 bg-slate-50 rounded-lg group border border-slate-100">
                  <span className="text-slate-800 leading-relaxed font-medium">
                    {idx + 1}. {item}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkema(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1 opacity-80 group-hover:opacity-100"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkema}
                onChange={(e) => setNewSkema(e.target.value)}
                placeholder="Tambah skema pertanggungjawaban..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddSkema}
                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. KONSEKUENSI */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">3. Konsekuensi</h3>
                <p className="text-[11px] text-slate-500">Reward dan tindak lanjut pembinaan</p>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {data.lampiran.konsekuensi.map((item, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 p-2 bg-slate-50 rounded-lg group border border-slate-100">
                  <span className="text-slate-800 leading-relaxed font-medium">
                    {idx + 1}. {item}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveKonsekuensi(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1 opacity-80 group-hover:opacity-100"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newKonsekuensi}
                onChange={(e) => setNewKonsekuensi(e.target.value)}
                placeholder="Tambah konsekuensi kinerja..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddKonsekuensi}
                className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
