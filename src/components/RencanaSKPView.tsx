import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Filter, 
  Pencil, 
  Plus, 
  Sparkles, 
  Trash2, 
  Zap 
} from 'lucide-react';
import { AspekType, RencanaHasilKerjaItem, SKPData } from '../types';

interface RencanaSKPViewProps {
  data: SKPData;
  onUpdate: (updated: Partial<SKPData>) => void;
  onOpenAI: (type?: string, context?: string) => void;
}

export const RencanaSKPView: React.FC<RencanaSKPViewProps> = ({
  data,
  onUpdate,
  onOpenAI,
}) => {
  const [filterKategori, setFilterKategori] = useState<'SEMUA' | 'UTAMA' | 'TAMBAHAN'>('SEMUA');
  const [editingItem, setEditingItem] = useState<RencanaHasilKerjaItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New Item State
  const [formData, setFormData] = useState<Omit<RencanaHasilKerjaItem, 'id'>>({
    kategori: 'UTAMA',
    rhkPimpinan: '',
    rencanaKinerja: '',
    aspek: 'Kuantitas',
    iki: '',
    target: '',
    realisasi: '',
    buktiDukung: '',
    umpanBalik: '',
  });

  const filteredItems = data.items.filter((item) => {
    if (filterKategori === 'SEMUA') return true;
    return item.kategori === filterKategori;
  });

  const handleSaveItem = () => {
    if (!formData.rencanaKinerja.trim() || !formData.iki.trim()) {
      alert('Mohon lengkapi Rencana Hasil Kerja dan Indikator Kinerja Individu (IKI)');
      return;
    }

    if (editingItem) {
      // Update existing
      const updatedList = data.items.map((i) =>
        i.id === editingItem.id ? { ...formData, id: editingItem.id } : i
      );
      onUpdate({ items: updatedList });
      setEditingItem(null);
    } else {
      // Add new
      const newItem: RencanaHasilKerjaItem = {
        ...formData,
        id: `rhk-${Date.now()}`,
      };
      onUpdate({ items: [...data.items, newItem] });
      setIsAddingNew(false);
    }

    // Reset
    setFormData({
      kategori: 'UTAMA',
      rhkPimpinan: '',
      rencanaKinerja: '',
      aspek: 'Kuantitas',
      iki: '',
      target: '',
      realisasi: '',
      buktiDukung: '',
      umpanBalik: '',
    });
  };

  const handleEditClick = (item: RencanaHasilKerjaItem) => {
    setEditingItem(item);
    setFormData({
      kategori: item.kategori,
      rhkPimpinan: item.rhkPimpinan,
      rencanaKinerja: item.rencanaKinerja,
      aspek: item.aspek,
      iki: item.iki,
      target: item.target,
      realisasi: item.realisasi,
      buktiDukung: item.buktiDukung,
      umpanBalik: item.umpanBalik,
    });
    setIsAddingNew(true);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus butir RHK ini?')) {
      onUpdate({ items: data.items.filter((i) => i.id !== id) });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Title */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-600" />
            Matriks Rencana Sasaran Kinerja Pegawai (SKP)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pendekatan Hasil Kerja Kuantitatif bagi Pejabat Fungsional Guru & Kepala Sekolah SMP Negeri 7 Sentani.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              id="filter-rhk-semua"
              onClick={() => setFilterKategori('SEMUA')}
              className={`px-3 py-1 rounded-md transition-all ${
                filterKategori === 'SEMUA' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Semua ({data.items.length})
            </button>
            <button
              type="button"
              id="filter-rhk-utama"
              onClick={() => setFilterKategori('UTAMA')}
              className={`px-3 py-1 rounded-md transition-all ${
                filterKategori === 'UTAMA' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Utama ({data.items.filter((i) => i.kategori === 'UTAMA').length})
            </button>
            <button
              type="button"
              id="filter-rhk-tambahan"
              onClick={() => setFilterKategori('TAMBAHAN')}
              className={`px-3 py-1 rounded-md transition-all ${
                filterKategori === 'TAMBAHAN' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Tambahan ({data.items.filter((i) => i.kategori === 'TAMBAHAN').length})
            </button>
          </div>

          {/* Add Button */}
          <button
            type="button"
            id="btn-tambah-rhk"
            onClick={() => {
              setEditingItem(null);
              setFormData({
                kategori: 'UTAMA',
                rhkPimpinan: '',
                rencanaKinerja: '',
                aspek: 'Kuantitas',
                iki: '',
                target: '1 Dokumen',
                realisasi: '',
                buktiDukung: '',
                umpanBalik: '',
              });
              setIsAddingNew(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah RHK</span>
          </button>
        </div>
      </div>

      {/* Inline Form / Modal for Adding/Editing */}
      {isAddingNew && (
        <div className="bg-blue-50/70 border-2 border-blue-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-blue-200">
            <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              {editingItem ? 'Edit Rencana Hasil Kerja' : 'Tambah Rencana Hasil Kerja Baru'}
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="btn-ai-suggest-rhk"
                onClick={() => onOpenAI('rhk', formData.kategori)}
                className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 text-purple-700 rounded-lg text-xs font-bold border border-purple-200 shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Saran AI</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1"
              >
                Batal
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kategori Kinerja
              </label>
              <select
                id="form-rhk-kategori"
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value as 'UTAMA' | 'TAMBAHAN' })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                <option value="UTAMA">A. KINERJA UTAMA</option>
                <option value="TAMBAHAN">B. KINERJA TAMBAHAN</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Aspek Kinerja
              </label>
              <select
                id="form-rhk-aspek"
                value={formData.aspek}
                onChange={(e) => setFormData({ ...formData, aspek: e.target.value as AspekType })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                <option value="Kuantitas">Kuantitas (Jumlah Dokumen / Laporan / Kegiatan)</option>
                <option value="Kualitas">Kualitas (Persentase Ketercapaian / Tingkat Mutu)</option>
                <option value="Waktu">Waktu (Ketepatan Waktu / Durasi Bulan)</option>
                <option value="Biaya">Biaya (Efisiensi Anggaran)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Rencana Hasil Kerja Pimpinan / Atasan yang Diintervensi
              </label>
              <input
                type="text"
                id="form-rhk-pimpinan"
                value={formData.rhkPimpinan}
                onChange={(e) => setFormData({ ...formData, rhkPimpinan: e.target.value })}
                placeholder="Contoh: Terlaksananya Program Peningkatan mutu dan aksesibilitas pendidikan Dinas Pendidikan"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Rencana Hasil Kerja Pegawai (RHK)
              </label>
              <textarea
                rows={2}
                id="form-rhk-pegawai"
                value={formData.rencanaKinerja}
                onChange={(e) => setFormData({ ...formData, rencanaKinerja: e.target.value })}
                placeholder="Contoh: Tersusunnya Dokumen Modul Ajar dan Bahan Ajar sesuai Kurikulum Merdeka di SMP Negeri 7 Sentani"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Indikator Kinerja Individu (IKI)
              </label>
              <input
                type="text"
                id="form-rhk-iki"
                value={formData.iki}
                onChange={(e) => setFormData({ ...formData, iki: e.target.value })}
                placeholder="Contoh: Jumlah Dokumen Modul Ajar"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Target Realistis
              </label>
              <input
                type="text"
                id="form-rhk-target"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                placeholder="Contoh: 1 Dokumen / 100% / 12 Bulan"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-blue-200">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Batal
            </button>
            <button
              type="button"
              id="btn-simpan-rhk-item"
              onClick={handleSaveItem}
              className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs"
            >
              {editingItem ? 'Simpan Perubahan' : 'Tambahkan ke Matriks'}
            </button>
          </div>
        </div>
      )}

      {/* Main RHK Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="p-3 font-bold w-12 text-center border-r border-slate-200">No</th>
                <th className="p-3 font-bold w-24 border-r border-slate-200">Kategori</th>
                <th className="p-3 font-bold min-w-[200px] border-r border-slate-200">
                  RHK Pimpinan yang Diintervensi
                </th>
                <th className="p-3 font-bold min-w-[220px] border-r border-slate-200">
                  Rencana Hasil Kerja Pegawai
                </th>
                <th className="p-3 font-bold w-24 border-r border-slate-200 text-center">Aspek</th>
                <th className="p-3 font-bold min-w-[180px] border-r border-slate-200">
                  Indikator Kinerja Individu (IKI)
                </th>
                <th className="p-3 font-bold w-28 border-r border-slate-200 text-center">Target</th>
                <th className="p-3 font-bold w-20 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    Belum ada Rencana Hasil Kerja pada kategori ini.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, index) => {
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 text-center font-medium border-r border-slate-200 text-slate-500">
                        {index + 1}
                      </td>
                      <td className="p-3 border-r border-slate-200">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.kategori === 'UTAMA'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-indigo-100 text-indigo-800'
                          }`}
                        >
                          {item.kategori}
                        </span>
                      </td>
                      <td className="p-3 border-r border-slate-200 leading-relaxed text-slate-700">
                        {item.rhkPimpinan || '-'}
                      </td>
                      <td className="p-3 border-r border-slate-200 font-semibold text-slate-900 leading-relaxed">
                        {item.rencanaKinerja}
                      </td>
                      <td className="p-3 text-center border-r border-slate-200">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {item.aspek}
                        </span>
                      </td>
                      <td className="p-3 border-r border-slate-200 leading-relaxed">
                        {item.iki}
                      </td>
                      <td className="p-3 text-center font-bold text-slate-900 border-r border-slate-200 bg-slate-50/50">
                        {item.target}
                      </td>
                      <td className="p-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditClick(item)}
                            title="Edit RHK"
                            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.id)}
                            title="Hapus RHK"
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <span>Menampilkan <strong>{filteredItems.length}</strong> butir aspek sasaran kinerja</span>
          <span className="italic">Format matriks sesuai Peraturan Menteri PAN-RB No. 6 Tahun 2022</span>
        </div>
      </div>
    </div>
  );
};
