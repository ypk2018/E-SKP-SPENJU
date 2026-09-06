import React from 'react';
import { 
  BarChart, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  UserCheck 
} from 'lucide-react';
import { CapaianOrganisasiType, PredikatKinerjaType, RatingType, SKPData } from '../types';
import { POLA_DISTRIBUSI_DATA, calculatePredikatKinerja } from '../utils/skpCalculator';

interface KuadranGrafikKinerjaProps {
  data: SKPData;
  onUpdate?: (updated: Partial<SKPData>) => void;
  readOnly?: boolean;
  isPrintMode?: boolean;
}

export const KuadranGrafikKinerja: React.FC<KuadranGrafikKinerjaProps> = ({
  data,
  onUpdate,
  readOnly = false,
  isPrintMode = false,
}) => {
  const handleSelectQuadrant = (hasil: RatingType, perilaku: RatingType) => {
    if (readOnly || !onUpdate) return;
    const predikat = calculatePredikatKinerja(hasil, perilaku);
    onUpdate({
      ratingHasilKerja: hasil,
      ratingPerilakuKerja: perilaku,
      predikatKinerja: predikat,
    });
  };

  const handleCapaianChange = (capaian: CapaianOrganisasiType) => {
    if (readOnly || !onUpdate) return;
    onUpdate({ capaianOrganisasi: capaian });
  };

  const distribusiPoints = POLA_DISTRIBUSI_DATA[data.capaianOrganisasi] || POLA_DISTRIBUSI_DATA['Baik'];
  const maxPola = Math.max(...distribusiPoints.map((d) => d.pola), 15);

  // SVG Bell Curve Coordinates based on capaian
  const getCurvePath = () => {
    switch (data.capaianOrganisasi) {
      case 'Istimewa':
        return 'M 10 110 Q 70 100 130 80 T 250 45 T 350 15 T 450 60';
      case 'Butuh Perbaikan':
        return 'M 10 100 Q 80 80 160 50 T 240 20 T 340 70 T 450 110';
      case 'Kurang':
        return 'M 10 80 Q 70 50 140 20 T 230 60 T 340 95 T 450 115';
      case 'Sangat Kurang':
        return 'M 10 30 Q 60 20 120 40 T 220 85 T 340 110 T 450 118';
      case 'Baik':
      default:
        // Symmetrical standard normal distribution curve
        return 'M 10 110 C 100 110, 160 85, 230 20 C 300 85, 360 110, 450 110';
    }
  };

  return (
    <div className={`space-y-5 ${isPrintMode ? 'font-serif text-black' : ''}`}>
      {/* 1. Header Bar: Capaian Kinerja Organisasi */}
      <div className={`flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border ${
        isPrintMode 
          ? 'bg-slate-50 border-black text-xs' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50/50 border-blue-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
            isPrintMode ? 'bg-slate-200 text-black' : 'bg-blue-600 text-white shadow-xs'
          }`}>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Capaian Kinerja Organisasi (Sekolah)
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-extrabold ${
                isPrintMode ? 'text-black' : 'text-blue-900'
              }`}>
                {data.capaianOrganisasi.toUpperCase()}
              </span>
              <span className="text-[10px] text-slate-500 italic">
                (Pedoman Matriks & Kurva Pola Distribusi BKN)
              </span>
            </div>
          </div>
        </div>

        {!readOnly && onUpdate && !isPrintMode && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-600">Ubah Capaian:</span>
            <select
              id="select-capaian-organisasi-evaluasi"
              value={data.capaianOrganisasi}
              onChange={(e) => handleCapaianChange(e.target.value as CapaianOrganisasiType)}
              className="text-xs font-bold px-2.5 py-1.5 bg-white border border-blue-300 rounded-lg text-blue-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="Istimewa">ISTIMEWA</option>
              <option value="Baik">BAIK</option>
              <option value="Butuh Perbaikan">BUTUH PERBAIKAN</option>
              <option value="Kurang">KURANG</option>
              <option value="Sangat Kurang">SANGAT KURANG</option>
            </select>
          </div>
        )}
      </div>

      {/* 2. Dua Kolom: Gambar Grafik Kurva Pola Distribusi & Gambar Grafik Kuadran 3x3 */}
      <div className={`grid grid-cols-1 ${isPrintMode ? 'grid-cols-2 gap-3 text-[10px]' : 'lg:grid-cols-12 gap-5'}`}>
        
        {/* PANEL KIRI: GRAFIK KURVA POLA DISTRIBUSI KINERJA BKN */}
        <div className={`${isPrintMode ? 'border border-black p-2.5 bg-white' : 'lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs'}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className={`font-bold text-xs flex items-center gap-1.5 ${isPrintMode ? 'text-black uppercase' : 'text-slate-900'}`}>
              <BarChart className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pola Distribusi Predikat Kinerja Organisasi</span>
            </h4>
            <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 font-semibold border border-slate-200">
              Kurva BKN
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mb-2 leading-relaxed">
            Distribusi normal proporsi predikat kinerja pegawai berdasarkan Capaian Organisasi <strong>{data.capaianOrganisasi}</strong>.
          </p>

          {/* Gambar Kurva Distribusi SVG */}
          <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200 relative overflow-hidden">
            <svg 
              viewBox="0 0 460 130" 
              className="w-full h-24 overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="10" y1="110" x2="450" y2="110" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="10" y1="65" x2="450" y2="65" stroke="#e2e8f0" strokeDasharray="3,3" />
              
              {/* Curve area fill & line */}
              <path 
                d={`${getCurvePath()} L 450 110 L 10 110 Z`} 
                fill="url(#curveFill)" 
              />
              <path 
                d={getCurvePath()} 
                fill="none" 
                stroke="#2563eb" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />

              {/* Peak pointer label */}
              <circle cx="230" cy="20" r="3.5" fill="#1d4ed8" />
            </svg>

            {/* Diagram Batang / Persentase Proporsi BKN */}
            <div className="grid grid-cols-5 gap-1.5 mt-2 pt-2 border-t border-slate-200 text-center">
              {distribusiPoints.map((dp, idx) => {
                const isAktif = dp.kategori.toLowerCase() === data.predikatKinerja.toLowerCase();
                const barHeight = Math.max(12, Math.round((dp.pola / maxPola) * 36));
                return (
                  <div 
                    key={idx} 
                    className={`p-1 rounded-md transition-all ${
                      isAktif 
                        ? 'bg-blue-100/90 font-bold border border-blue-300 ring-1 ring-blue-400' 
                        : 'bg-white/90 border border-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-extrabold text-slate-800">
                      {dp.pola}
                    </div>
                    <div className="w-full bg-slate-100 rounded-xs h-9 flex items-end justify-center my-0.5">
                      <div 
                        style={{ height: `${barHeight}px` }}
                        className={`w-full mx-1 rounded-t-xs ${
                          isAktif ? 'bg-blue-600' : 'bg-slate-400'
                        }`}
                      ></div>
                    </div>
                    <div className="text-[9px] truncate text-slate-700 font-medium">
                      {dp.kategori.split('/')[0]}
                    </div>
                    <div className="text-[8px] text-slate-500">
                      {dp.deskripsi.replace('Maksimal ', '<=').replace('Sekitar ', '~')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PANEL KANAN: GAMBAR GRAFIK MATRIKS KUADRAN 3x3 PERMENPAN-RB */}
        <div className={`${isPrintMode ? 'border border-black p-2.5 bg-white' : 'lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs'}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className={`font-bold text-xs flex items-center gap-1.5 ${isPrintMode ? 'text-black uppercase' : 'text-slate-900'}`}>
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Gambar Grafik Matriks Kuadran Kinerja (3x3)</span>
            </h4>
            <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-blue-50 text-blue-700 font-bold border border-blue-200">
              PermenPAN-RB 6/2022
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mb-2">
            Posisi silang antara <strong>Rating Hasil Kerja</strong> (Sumbu Y) dan <strong>Perilaku Kerja ASN</strong> (Sumbu X).
          </p>

          {/* Kuadran 3x3 Visual Matrix */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[10px] text-center">
              <thead>
                <tr>
                  <th className={`p-1.5 border ${isPrintMode ? 'border-black bg-slate-100' : 'border-slate-300 bg-slate-100 text-slate-700'} font-bold w-24 text-left`}>
                    Hasil \ Perilaku
                  </th>
                  <th className={`p-1.5 border ${isPrintMode ? 'border-black bg-slate-50' : 'border-slate-300 bg-slate-50 text-slate-700'} font-semibold`}>
                    Di Bawah Ekspektasi
                  </th>
                  <th className={`p-1.5 border ${isPrintMode ? 'border-black bg-slate-50' : 'border-slate-300 bg-slate-50 text-slate-700'} font-semibold`}>
                    Sesuai Ekspektasi
                  </th>
                  <th className={`p-1.5 border ${isPrintMode ? 'border-black bg-slate-50' : 'border-slate-300 bg-slate-50 text-slate-700'} font-semibold`}>
                    Di Atas Ekspektasi
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Baris 1: Hasil Di Atas Ekspektasi */}
                <tr>
                  <td className={`p-1.5 border font-bold text-left ${isPrintMode ? 'border-black bg-slate-50' : 'border-slate-300 bg-slate-50 text-slate-800'}`}>
                    Di Atas Ekspektasi
                  </td>

                  {/* Di Atas + Di Bawah -> Kurang/Misconduct */}
                  {renderQuadrantCell(
                    'Di Atas Ekspektasi',
                    'Di Bawah Ekspektasi',
                    'Kurang/Misconduct',
                    'bg-rose-50 text-rose-800 border-rose-200',
                    'bg-rose-600 text-white ring-2 ring-rose-700 shadow-md',
                    data,
                    handleSelectQuadrant,
                    readOnly,
                    isPrintMode
                  )}

                  {/* Di Atas + Sesuai -> Baik */}
                  {renderQuadrantCell(
                    'Di Atas Ekspektasi',
                    'Sesuai Ekspektasi',
                    'Baik',
                    'bg-blue-50 text-blue-800 border-blue-200',
                    'bg-blue-600 text-white ring-2 ring-blue-700 shadow-md',
                    data,
                    handleSelectQuadrant,
                    readOnly,
                    isPrintMode
                  )}

                  {/* Di Atas + Di Atas -> Sangat Baik */}
                  {renderQuadrantCell(
                    'Di Atas Ekspektasi',
                    'Di Atas Ekspektasi',
                    'Sangat Baik',
                    'bg-emerald-50 text-emerald-800 border-emerald-200',
                    'bg-emerald-600 text-white ring-2 ring-emerald-700 shadow-md',
                    data,
                    handleSelectQuadrant,
                    readOnly,
                    isPrintMode
                  )}
                </tr>

                {/* Baris 2: Hasil Sesuai Ekspektasi */}
                <tr>
                  <td className={`p-1.5 border font-bold text-left ${isPrintMode ? 'border-black bg-slate-50' : 'border-slate-300 bg-slate-50 text-slate-800'}`}>
                    Sesuai Ekspektasi
                  </td>

                  {/* Sesuai + Di Bawah -> Kurang/Misconduct */}
                  {renderQuadrantCell(
                    'Sesuai Ekspektasi',
                    'Di Bawah Ekspektasi',
                    'Kurang/Misconduct',
                    'bg-rose-50 text-rose-800 border-rose-200',
                    'bg-rose-600 text-white ring-2 ring-rose-700 shadow-md',
                    data,
                    handleSelectQuadrant,
                    readOnly,
                    isPrintMode
                  )}

                  {/* Sesuai + Sesuai -> Baik */}
                  {renderQuadrantCell(
                    'Sesuai Ekspektasi',
                    'Sesuai Ekspektasi',
                    'Baik',
                    'bg-blue-50 text-blue-800 border-blue-200',
                    'bg-blue-600 text-white ring-2 ring-blue-700 shadow-md',
                    data,
                    handleSelectQuadrant,
                    readOnly,
                    isPrintMode
                  )}

                  {/* Sesuai + Di Atas -> Baik */}
                  {renderQuadrantCell(
                    'Sesuai Ekspektasi',
                    'Di Atas Ekspektasi',
                    'Baik',
                    'bg-blue-50 text-blue-800 border-blue-200',
                    'bg-blue-600 text-white ring-2 ring-blue-700 shadow-md',
                    data,
                    handleSelectQuadrant,
                    readOnly,
                    isPrintMode
                  )}
                </tr>

                {/* Baris 3: Hasil Di Bawah Ekspektasi */}
                <tr>
                  <td className={`p-1.5 border font-bold text-left ${isPrintMode ? 'border-black bg-slate-50' : 'border-slate-300 bg-slate-50 text-slate-800'}`}>
                    Di Bawah Ekspektasi
                  </td>

                  {/* Di Bawah + Di Bawah -> Sangat Kurang */}
                  {renderQuadrantCell(
                    'Di Bawah Ekspektasi',
                    'Di Bawah Ekspektasi',
                    'Sangat Kurang',
                    'bg-slate-100 text-slate-800 border-slate-300',
                    'bg-slate-800 text-white ring-2 ring-slate-900 shadow-md',
                    data,
                    handleSelectQuadrant,
                    readOnly,
                    isPrintMode
                  )}

                  {/* Di Bawah + Sesuai -> Butuh Perbaikan */}
                  {renderQuadrantCell(
                    'Di Bawah Ekspektasi',
                    'Sesuai Ekspektasi',
                    'Butuh Perbaikan',
                    'bg-amber-50 text-amber-800 border-amber-200',
                    'bg-amber-600 text-white ring-2 ring-amber-700 shadow-md',
                    data,
                    handleSelectQuadrant,
                    readOnly,
                    isPrintMode
                  )}

                  {/* Di Bawah + Di Atas -> Butuh Perbaikan */}
                  {renderQuadrantCell(
                    'Di Bawah Ekspektasi',
                    'Di Atas Ekspektasi',
                    'Butuh Perbaikan',
                    'bg-amber-50 text-amber-800 border-amber-200',
                    'bg-amber-600 text-white ring-2 ring-amber-700 shadow-md',
                    data,
                    handleSelectQuadrant,
                    readOnly,
                    isPrintMode
                  )}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Status Posisi Pegawai Aktif */}
          <div className={`mt-2.5 p-2 rounded-lg flex items-center justify-between text-[11px] ${
            isPrintMode 
              ? 'bg-slate-100 border border-black' 
              : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'
          }`}>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-blue-700 font-bold">📍 Posisi Aktif Pegawai:</span>
              <span className="font-extrabold text-slate-900 uppercase">
                {data.pegawai.nama}
              </span>
            </div>
            <div className="flex items-center gap-1 font-bold">
              <span>PREDIKAT:</span>
              <span className={`px-2 py-0.5 rounded-sm text-[10px] font-black uppercase text-white ${
                data.predikatKinerja === 'Sangat Baik' 
                  ? 'bg-emerald-600' 
                  : data.predikatKinerja === 'Baik' 
                  ? 'bg-blue-600' 
                  : data.predikatKinerja === 'Butuh Perbaikan' 
                  ? 'bg-amber-600' 
                  : 'bg-rose-600'
              }`}>
                {data.predikatKinerja}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function renderQuadrantCell(
  hasil: RatingType,
  perilaku: RatingType,
  label: PredikatKinerjaType,
  inactiveClass: string,
  activeClass: string,
  data: SKPData,
  onSelect: (h: RatingType, p: RatingType) => void,
  readOnly: boolean,
  isPrintMode: boolean
) {
  const isSelected = data.ratingHasilKerja === hasil && data.ratingPerilakuKerja === perilaku;
  return (
    <td
      key={`${hasil}-${perilaku}`}
      onClick={() => onSelect(hasil, perilaku)}
      className={`p-2 border transition-all ${
        isPrintMode ? 'border-black' : 'border-slate-300'
      } ${
        !readOnly ? 'cursor-pointer hover:opacity-90' : ''
      } ${
        isSelected
          ? activeClass
          : isPrintMode
          ? 'bg-white text-black'
          : inactiveClass
      }`}
    >
      <div className="font-extrabold uppercase text-[10px] tracking-tight">
        {label}
      </div>
      {isSelected && (
        <div className={`text-[9px] font-bold mt-1 flex items-center justify-center gap-1 ${
          isPrintMode ? 'underline text-black' : 'text-amber-200 animate-pulse'
        }`}>
          <span>📍 POSISI PEGAWAI</span>
        </div>
      )}
    </td>
  );
}
