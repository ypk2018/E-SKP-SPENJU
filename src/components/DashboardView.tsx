import React from 'react';
import { 
  Award, 
  BarChart, 
  CheckCircle, 
  Compass, 
  FileText, 
  HelpCircle, 
  Info, 
  TrendingUp, 
  User, 
  Zap 
} from 'lucide-react';
import { CapaianOrganisasiType, PredikatKinerjaType, RatingType, SKPData } from '../types';
import { POLA_DISTRIBUSI_DATA, calculatePredikatKinerja } from '../utils/skpCalculator';
import confetti from 'canvas-confetti';

interface DashboardViewProps {
  data: SKPData;
  onUpdate: (updated: Partial<SKPData>) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  data,
  onUpdate,
  onNavigateTab,
}) => {
  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleHasilKerjaChange = (newRating: RatingType) => {
    const newPredikat = calculatePredikatKinerja(newRating, data.ratingPerilakuKerja);
    onUpdate({
      ratingHasilKerja: newRating,
      predikatKinerja: newPredikat,
    });
    if (newPredikat === 'Sangat Baik' || newPredikat === 'Baik') {
      triggerCelebration();
    }
  };

  const handlePerilakuChange = (newRating: RatingType) => {
    const newPredikat = calculatePredikatKinerja(data.ratingHasilKerja, newRating);
    onUpdate({
      ratingPerilakuKerja: newRating,
      predikatKinerja: newPredikat,
    });
    if (newPredikat === 'Sangat Baik' || newPredikat === 'Baik') {
      triggerCelebration();
    }
  };

  const handleCapaianOrganisasiChange = (capaian: CapaianOrganisasiType) => {
    onUpdate({ capaianOrganisasi: capaian });
  };

  // Metrics
  const totalUtama = data.items.filter((i) => i.kategori === 'UTAMA').length;
  const totalTambahan = data.items.filter((i) => i.kategori === 'TAMBAHAN').length;
  const denganBukti = data.items.filter((i) => i.buktiDukung && i.buktiDukung.trim().length > 0).length;
  const persentaseBukti = data.items.length > 0 ? Math.round((denganBukti / data.items.length) * 100) : 0;

  // Predikat color styling
  const getPredikatBadge = (predikat: PredikatKinerjaType) => {
    switch (predikat) {
      case 'Sangat Baik':
        return {
          bg: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/20',
          border: 'border-emerald-500',
          text: 'text-emerald-700',
          desc: 'Melampaui ekspektasi pimpinan dengan dedikasi istimewa di SMP Negeri 7 Sentani.',
        };
      case 'Baik':
        return {
          bg: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/20',
          border: 'border-blue-500',
          text: 'text-blue-700',
          desc: 'Kinerja memenuhi seluruh ekspektasi tugas pokok dan perilaku kerja ASN BerAKHLAK.',
        };
      case 'Butuh Perbaikan':
        return {
          bg: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/20',
          border: 'border-amber-500',
          text: 'text-amber-700',
          desc: 'Terdapat beberapa indikator kinerja yang memerlukan pembinaan dan tindak lanjut pendampingan.',
        };
      case 'Kurang/Misconduct':
        return {
          bg: 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-rose-500/20',
          border: 'border-rose-500',
          text: 'text-rose-700',
          desc: 'Target belum tercapai atau terdapat catatan ketidaksesuaian perilaku kerja.',
        };
      case 'Sangat Kurang':
      default:
        return {
          bg: 'bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-slate-500/20',
          border: 'border-slate-700',
          text: 'text-slate-800',
          desc: 'Diperlukan evaluasi mendalam dan pembinaan kedinasan secara komprehensif.',
        };
    }
  };

  const predikatStyle = getPredikatBadge(data.predikatKinerja);

  // Distribution chart data for current selected organizational achievement
  const distribusiPoints = POLA_DISTRIBUSI_DATA[data.capaianOrganisasi] || POLA_DISTRIBUSI_DATA['Baik'];
  const maxPola = Math.max(...distribusiPoints.map((d) => d.pola), 15);

  return (
    <div className="space-y-6">
      {/* Hero Welcome & Overview Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-50 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Sistem Manajemen Kinerja ASN • PermenPAN-RB No. 6 Tahun 2022</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Evaluasi Kinerja {data.role === 'kepala_sekolah' ? 'Kepala Sekolah' : 'Guru'} SMP Negeri 7 Sentani
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Pegawai: <strong className="text-slate-900 font-bold">{data.pegawai.nama}</strong> ({data.pegawai.nip}) • 
              Penilai: <strong className="text-slate-800">{data.penilai.nama}</strong> ({data.penilai.jabatan}).
            </p>
          </div>

          {/* Big Predikat Outcome Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-left">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Predikat Kinerja Akhir
              </div>
              <div className={`mt-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-lg font-black tracking-wide shadow-md ${predikatStyle.bg}`}>
                <Award className="w-5 h-5" />
                <span>{data.predikatKinerja.toUpperCase()}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 max-w-[240px]">
                {predikatStyle.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Simulation Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              1. Rating Hasil Kerja
            </label>
            <select
              value={data.ratingHasilKerja}
              id="select-rating-hasil-kerja"
              onChange={(e) => handleHasilKerjaChange(e.target.value as RatingType)}
              className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="Di Atas Ekspektasi">Di Atas Ekspektasi (Tinggi)</option>
              <option value="Sesuai Ekspektasi">Sesuai Ekspektasi (Standar)</option>
              <option value="Di Bawah Ekspektasi">Di Bawah Ekspektasi (Rendah)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              2. Rating Perilaku Kerja (BerAKHLAK)
            </label>
            <select
              value={data.ratingPerilakuKerja}
              id="select-rating-perilaku-kerja"
              onChange={(e) => handlePerilakuChange(e.target.value as RatingType)}
              className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="Di Atas Ekspektasi">Di Atas Ekspektasi (Teladan)</option>
              <option value="Sesuai Ekspektasi">Sesuai Ekspektasi (Konsisten)</option>
              <option value="Di Bawah Ekspektasi">Di Bawah Ekspektasi (Kurang)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              3. Capaian Kinerja Organisasi
            </label>
            <select
              value={data.capaianOrganisasi}
              id="select-capaian-organisasi"
              onChange={(e) => handleCapaianOrganisasiChange(e.target.value as CapaianOrganisasiType)}
              className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="Istimewa">Istimewa (Sangat Tinggi)</option>
              <option value="Baik">Baik (Sesuai Rencana)</option>
              <option value="Butuh Perbaikan">Butuh Perbaikan</option>
              <option value="Kurang/Misconduct">Kurang / Misconduct</option>
              <option value="Sangat Kurang">Sangat Kurang</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">RHK Utama</div>
            <div className="text-xl font-bold text-slate-900">{totalUtama} Butir Aspek</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Tugas Tambahan</div>
            <div className="text-xl font-bold text-slate-900">{totalTambahan} Butir Aspek</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Bukti Dukung Terisi</div>
            <div className="text-xl font-bold text-slate-900">{persentaseBukti}% ({denganBukti}/{data.items.length})</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Perilaku BerAKHLAK</div>
            <div className="text-xl font-bold text-slate-900">7 Core Values</div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: 3x3 Kuadran Matrix & Pola Distribusi Kurva */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual 3x3 Kuadran PermenPAN-RB No. 6 Tahun 2022 */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <BarChart className="w-4 h-4 text-blue-600" />
                Matriks Kuadran Kinerja Pegawai (3x3)
              </h3>
              <p className="text-xs text-slate-500">
                Hubungan Hasil Kerja vs Perilaku Kerja (PermenPAN-RB 6/2022)
              </p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
              BKN Standard
            </span>
          </div>

          {/* Kuadran 3x3 Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <th className="p-2 border border-slate-200 bg-slate-100 text-slate-600 text-left font-semibold text-[11px] w-28">
                    Hasil Kerja \ Perilaku
                  </th>
                  <th className="p-2 border border-slate-200 bg-slate-50 text-slate-700 text-center font-semibold">
                    Di Bawah Ekspektasi
                  </th>
                  <th className="p-2 border border-slate-200 bg-slate-50 text-slate-700 text-center font-semibold">
                    Sesuai Ekspektasi
                  </th>
                  <th className="p-2 border border-slate-200 bg-slate-50 text-slate-700 text-center font-semibold">
                    Di Atas Ekspektasi
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1: Hasil Di Atas Ekspektasi */}
                <tr>
                  <td className="p-2 border border-slate-200 bg-slate-50 font-semibold text-slate-800">
                    Di Atas Ekspektasi
                  </td>
                  {/* Di Atas + Di Bawah = Kurang/Misconduct */}
                  <td 
                    onClick={() => {
                      onUpdate({
                        ratingHasilKerja: 'Di Atas Ekspektasi',
                        ratingPerilakuKerja: 'Di Bawah Ekspektasi',
                        predikatKinerja: 'Kurang/Misconduct',
                      });
                    }}
                    className={`p-2.5 border border-slate-200 text-center cursor-pointer transition-all ${
                      data.ratingHasilKerja === 'Di Atas Ekspektasi' && data.ratingPerilakuKerja === 'Di Bawah Ekspektasi'
                        ? 'bg-rose-500 text-white font-black ring-2 ring-rose-600 scale-102 shadow-md'
                        : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                    }`}
                  >
                    <div className="text-[11px]">KURANG / MISCONDUCT</div>
                    {data.ratingHasilKerja === 'Di Atas Ekspektasi' && data.ratingPerilakuKerja === 'Di Bawah Ekspektasi' && (
                      <div className="text-[9px] font-normal mt-0.5">● Posisi Saat Ini</div>
                    )}
                  </td>
                  {/* Di Atas + Sesuai = Baik */}
                  <td 
                    onClick={() => {
                      onUpdate({
                        ratingHasilKerja: 'Di Atas Ekspektasi',
                        ratingPerilakuKerja: 'Sesuai Ekspektasi',
                        predikatKinerja: 'Baik',
                      });
                      triggerCelebration();
                    }}
                    className={`p-2.5 border border-slate-200 text-center cursor-pointer transition-all ${
                      data.ratingHasilKerja === 'Di Atas Ekspektasi' && data.ratingPerilakuKerja === 'Sesuai Ekspektasi'
                        ? 'bg-blue-600 text-white font-black ring-2 ring-blue-700 scale-102 shadow-md'
                        : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                    }`}
                  >
                    <div className="text-[11px]">BAIK</div>
                    {data.ratingHasilKerja === 'Di Atas Ekspektasi' && data.ratingPerilakuKerja === 'Sesuai Ekspektasi' && (
                      <div className="text-[9px] font-normal mt-0.5">● Posisi Saat Ini</div>
                    )}
                  </td>
                  {/* Di Atas + Di Atas = Sangat Baik */}
                  <td 
                    onClick={() => {
                      onUpdate({
                        ratingHasilKerja: 'Di Atas Ekspektasi',
                        ratingPerilakuKerja: 'Di Atas Ekspektasi',
                        predikatKinerja: 'Sangat Baik',
                      });
                      triggerCelebration();
                    }}
                    className={`p-2.5 border border-slate-200 text-center cursor-pointer transition-all ${
                      data.ratingHasilKerja === 'Di Atas Ekspektasi' && data.ratingPerilakuKerja === 'Di Atas Ekspektasi'
                        ? 'bg-emerald-600 text-white font-black ring-2 ring-emerald-700 scale-102 shadow-md'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    <div className="text-[11px]">SANGAT BAIK</div>
                    {data.ratingHasilKerja === 'Di Atas Ekspektasi' && data.ratingPerilakuKerja === 'Di Atas Ekspektasi' && (
                      <div className="text-[9px] font-normal mt-0.5">● Posisi Saat Ini</div>
                    )}
                  </td>
                </tr>

                {/* Row 2: Hasil Sesuai Ekspektasi */}
                <tr>
                  <td className="p-2 border border-slate-200 bg-slate-50 font-semibold text-slate-800">
                    Sesuai Ekspektasi
                  </td>
                  {/* Sesuai + Di Bawah = Kurang/Misconduct */}
                  <td 
                    onClick={() => {
                      onUpdate({
                        ratingHasilKerja: 'Sesuai Ekspektasi',
                        ratingPerilakuKerja: 'Di Bawah Ekspektasi',
                        predikatKinerja: 'Kurang/Misconduct',
                      });
                    }}
                    className={`p-2.5 border border-slate-200 text-center cursor-pointer transition-all ${
                      data.ratingHasilKerja === 'Sesuai Ekspektasi' && data.ratingPerilakuKerja === 'Di Bawah Ekspektasi'
                        ? 'bg-rose-500 text-white font-black ring-2 ring-rose-600 scale-102 shadow-md'
                        : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                    }`}
                  >
                    <div className="text-[11px]">KURANG / MISCONDUCT</div>
                    {data.ratingHasilKerja === 'Sesuai Ekspektasi' && data.ratingPerilakuKerja === 'Di Bawah Ekspektasi' && (
                      <div className="text-[9px] font-normal mt-0.5">● Posisi Saat Ini</div>
                    )}
                  </td>
                  {/* Sesuai + Sesuai = Baik */}
                  <td 
                    onClick={() => {
                      onUpdate({
                        ratingHasilKerja: 'Sesuai Ekspektasi',
                        ratingPerilakuKerja: 'Sesuai Ekspektasi',
                        predikatKinerja: 'Baik',
                      });
                      triggerCelebration();
                    }}
                    className={`p-2.5 border border-slate-200 text-center cursor-pointer transition-all ${
                      data.ratingHasilKerja === 'Sesuai Ekspektasi' && data.ratingPerilakuKerja === 'Sesuai Ekspektasi'
                        ? 'bg-blue-600 text-white font-black ring-2 ring-blue-700 scale-102 shadow-md'
                        : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                    }`}
                  >
                    <div className="text-[11px]">BAIK</div>
                    {data.ratingHasilKerja === 'Sesuai Ekspektasi' && data.ratingPerilakuKerja === 'Sesuai Ekspektasi' && (
                      <div className="text-[9px] font-normal mt-0.5">● Posisi Saat Ini</div>
                    )}
                  </td>
                  {/* Sesuai + Di Atas = Baik */}
                  <td 
                    onClick={() => {
                      onUpdate({
                        ratingHasilKerja: 'Sesuai Ekspektasi',
                        ratingPerilakuKerja: 'Di Atas Ekspektasi',
                        predikatKinerja: 'Baik',
                      });
                      triggerCelebration();
                    }}
                    className={`p-2.5 border border-slate-200 text-center cursor-pointer transition-all ${
                      data.ratingHasilKerja === 'Sesuai Ekspektasi' && data.ratingPerilakuKerja === 'Di Atas Ekspektasi'
                        ? 'bg-blue-600 text-white font-black ring-2 ring-blue-700 scale-102 shadow-md'
                        : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                    }`}
                  >
                    <div className="text-[11px]">BAIK</div>
                    {data.ratingHasilKerja === 'Sesuai Ekspektasi' && data.ratingPerilakuKerja === 'Di Atas Ekspektasi' && (
                      <div className="text-[9px] font-normal mt-0.5">● Posisi Saat Ini</div>
                    )}
                  </td>
                </tr>

                {/* Row 3: Hasil Di Bawah Ekspektasi */}
                <tr>
                  <td className="p-2 border border-slate-200 bg-slate-50 font-semibold text-slate-800">
                    Di Bawah Ekspektasi
                  </td>
                  {/* Di Bawah + Di Bawah = Sangat Kurang */}
                  <td 
                    onClick={() => {
                      onUpdate({
                        ratingHasilKerja: 'Di Bawah Ekspektasi',
                        ratingPerilakuKerja: 'Di Bawah Ekspektasi',
                        predikatKinerja: 'Sangat Kurang',
                      });
                    }}
                    className={`p-2.5 border border-slate-200 text-center cursor-pointer transition-all ${
                      data.ratingHasilKerja === 'Di Bawah Ekspektasi' && data.ratingPerilakuKerja === 'Di Bawah Ekspektasi'
                        ? 'bg-slate-800 text-white font-black ring-2 ring-slate-900 scale-102 shadow-md'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    <div className="text-[11px]">SANGAT KURANG</div>
                    {data.ratingHasilKerja === 'Di Bawah Ekspektasi' && data.ratingPerilakuKerja === 'Di Bawah Ekspektasi' && (
                      <div className="text-[9px] font-normal mt-0.5">● Posisi Saat Ini</div>
                    )}
                  </td>
                  {/* Di Bawah + Sesuai = Butuh Perbaikan */}
                  <td 
                    onClick={() => {
                      onUpdate({
                        ratingHasilKerja: 'Di Bawah Ekspektasi',
                        ratingPerilakuKerja: 'Sesuai Ekspektasi',
                        predikatKinerja: 'Butuh Perbaikan',
                      });
                    }}
                    className={`p-2.5 border border-slate-200 text-center cursor-pointer transition-all ${
                      data.ratingHasilKerja === 'Di Bawah Ekspektasi' && data.ratingPerilakuKerja === 'Sesuai Ekspektasi'
                        ? 'bg-amber-600 text-white font-black ring-2 ring-amber-700 scale-102 shadow-md'
                        : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                    }`}
                  >
                    <div className="text-[11px]">BUTUH PERBAIKAN</div>
                    {data.ratingHasilKerja === 'Di Bawah Ekspektasi' && data.ratingPerilakuKerja === 'Sesuai Ekspektasi' && (
                      <div className="text-[9px] font-normal mt-0.5">● Posisi Saat Ini</div>
                    )}
                  </td>
                  {/* Di Bawah + Di Atas = Butuh Perbaikan */}
                  <td 
                    onClick={() => {
                      onUpdate({
                        ratingHasilKerja: 'Di Bawah Ekspektasi',
                        ratingPerilakuKerja: 'Di Atas Ekspektasi',
                        predikatKinerja: 'Butuh Perbaikan',
                      });
                    }}
                    className={`p-2.5 border border-slate-200 text-center cursor-pointer transition-all ${
                      data.ratingHasilKerja === 'Di Bawah Ekspektasi' && data.ratingPerilakuKerja === 'Di Atas Ekspektasi'
                        ? 'bg-amber-600 text-white font-black ring-2 ring-amber-700 scale-102 shadow-md'
                        : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                    }`}
                  >
                    <div className="text-[11px]">BUTUH PERBAIKAN</div>
                    {data.ratingHasilKerja === 'Di Bawah Ekspektasi' && data.ratingPerilakuKerja === 'Di Atas Ekspektasi' && (
                      <div className="text-[9px] font-normal mt-0.5">● Posisi Saat Ini</div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>
              Klik salah satu kotak kuadran untuk mensimulasikan hasil penilaian kinerja pegawai secara interaktif.
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Kurva Distribusi Capaian Organisasi */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Kurva Pola Distribusi Kinerja Organisasi
              </h3>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                {data.capaianOrganisasi}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Pedoman kurva distribusi normal predikat kinerja di lingkungan SMP Negeri 7 Sentani sesuai panduan BKN.
            </p>

            {/* Visual SVG Curve Graph */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="h-44 flex items-end justify-between gap-2 pt-6">
                {distribusiPoints.map((item, idx) => {
                  const heightPercent = Math.round((item.pola / maxPola) * 100);
                  const isCurrent = item.kategori.toLowerCase() === data.predikatKinerja.toLowerCase();
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className="text-[11px] font-bold text-slate-600 group-hover:text-blue-600">
                        {item.pola}
                      </div>
                      <div className="w-full max-w-[36px] bg-slate-200 rounded-t-lg relative flex items-end h-32 overflow-hidden">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-lg transition-all duration-500 ${
                            isCurrent
                              ? 'bg-gradient-to-t from-blue-600 to-indigo-500 shadow-md'
                              : 'bg-slate-400 group-hover:bg-slate-500'
                          }`}
                        ></div>
                      </div>
                      <span className={`text-[10px] text-center leading-tight mt-1 truncate max-w-[60px] ${
                        isCurrent ? 'font-bold text-blue-700' : 'text-slate-500'
                      }`}>
                        {item.kategori.split('/')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                <span>Total Sampel Satuan Kerja: <strong>24 Pegawai</strong></span>
                <span className="text-blue-600 font-semibold">Pola Ideal BKN</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900 leading-relaxed">
            <strong>Keterangan Capaian Organisasi "{data.capaianOrganisasi}":</strong>{' '}
            {data.capaianOrganisasi === 'Baik' &&
              'Sebagian besar pegawai idealnya berpredikat BAIK (45-50%), dengan toleransi proporsional untuk predikat Sangat Baik, Butuh Perbaikan, dan Kurang.'}
            {data.capaianOrganisasi === 'Istimewa' &&
              'Sebagian besar pegawai berpredikat SANGAT BAIK (55-60%), sebagai cerminan unit kerja berprestasi tinggi.'}
            {data.capaianOrganisasi === 'Butuh Perbaikan' &&
              'Sebagian besar pegawai berpredikat BUTUH PERBAIKAN (45%), membutuhkan penguatan kompetensi dan fasilitas.'}
            {data.capaianOrganisasi === 'Kurang/Misconduct' &&
              'Dominasi pada predikat Kurang/Misconduct karena belum terpenuhinya target organisasi.'}
            {data.capaianOrganisasi === 'Sangat Kurang' &&
              'Sebagian besar berpredikat Sangat Kurang, memerlukan restrukturisasi dan pembinaan intensif.'}
          </div>
        </div>
      </div>

      {/* Action Shortcut Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-base font-bold flex items-center gap-2">
            <span>Siap mencetak Berkas Kinerja SMP Negeri 7 Sentani?</span>
          </h4>
          <p className="text-xs text-slate-300 max-w-xl">
            Semua data tersinkronisasi otomatis ke dalam 4 format dokumen resmi PermenPAN-RB No. 6 Tahun 2022 (Cover Evaluasi, Formulir SKP, Evaluasi Kuantitatif, dan Lampiran).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onNavigateTab('evaluasi')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20 transition-all cursor-pointer"
          >
            Lengkapi Bukti & Feedback
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('cetak')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            Lihat Format Cetak Resmi
          </button>
        </div>
      </div>
    </div>
  );
};
