import React, { useRef, useState } from 'react';
import { 
  Check, 
  Eye, 
  Image as ImageIcon, 
  RotateCcw, 
  School, 
  Sparkles, 
  Trash2, 
  UploadCloud,
  Layers,
  Award
} from 'lucide-react';
import { LogoSekolah } from './LogoSekolah';
import { GarudaEmas } from './GarudaEmas';

export type LogoTargetType = 'sekolah' | 'garuda';

interface LogoUploaderProps {
  currentLogoUrl?: string; // Logo Sekolah untuk Kop dan Cover Depan
  currentGarudaLogoUrl?: string; // Logo Garuda untuk Lembar Evaluasi & Matriks Kualitatif
  onLogoChange: (logoUrl: string | undefined) => void;
  onGarudaLogoChange?: (logoUrl: string | undefined) => void;
  initialTab?: LogoTargetType;
  title?: string;
  description?: string;
  className?: string;
}

// Preset untuk Logo Sekolah (Cover Depan)
const PRESET_LOGOS_SEKOLAH = [
  {
    name: 'Logo Tut Wuri Handayani (Kemendikbudristek)',
    shortName: 'Tut Wuri Handayani',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg',
    tag: 'Resmi Kemendikbud',
  },
  {
    name: 'Lambang Pemerintah Kabupaten Jayapura',
    shortName: 'Pemkab Jayapura',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lambang_Kabupaten_Jayapura.png/480px-Lambang_Kabupaten_Jayapura.png',
    tag: 'Daerah Jayapura',
  },
  {
    name: 'Logo BKN (Badan Kepegawaian Negara)',
    shortName: 'Logo BKN RI',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Logo_Badan_Kepegawaian_Negara.png/500px-Logo_Badan_Kepegawaian_Negara.png',
    tag: 'Kepegawaian BKN',
  },
];

// Preset untuk Logo Garuda (Lembar Evaluasi & Matriks)
const PRESET_LOGOS_GARUDA = [
  {
    name: 'Lambang Negara Garuda Pancasila Resmi',
    shortName: 'Garuda Pancasila Resmi',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Coat_of_arms_of_Indonesia_Garuda_Pancasila.svg/480px-Coat_of_arms_of_Indonesia_Garuda_Pancasila.svg.png',
    tag: 'Resmi RI (Warna)',
  },
  {
    name: 'Logo BKN (Badan Kepegawaian Negara)',
    shortName: 'Logo BKN RI',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Logo_Badan_Kepegawaian_Negara.png/500px-Logo_Badan_Kepegawaian_Negara.png',
    tag: 'Standar ASN BKN',
  },
  {
    name: 'Lambang Pemkab Jayapura',
    shortName: 'Pemkab Jayapura',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lambang_Kabupaten_Jayapura.png/480px-Lambang_Kabupaten_Jayapura.png',
    tag: 'Pemerintah Daerah',
  },
];

export const LogoUploader: React.FC<LogoUploaderProps> = ({
  currentLogoUrl,
  currentGarudaLogoUrl,
  onLogoChange,
  onGarudaLogoChange,
  initialTab = 'sekolah',
  title = 'Pusat Pengaturan & Upload Logo Dokumen SKP',
  description = 'Kelola Logo Sekolah untuk Cover Depan dan Logo Garuda untuk Lembar Evaluasi & Matriks Kualitatif.',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<LogoTargetType>(initialTab);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isSekolahTab = activeTab === 'sekolah';
  const activeUrl = isSekolahTab ? currentLogoUrl : currentGarudaLogoUrl;

  const handleFileProcess = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Harap pilih file gambar (PNG, JPG, JPEG, WEBP, atau SVG).');
      return;
    }

    // Limit to 4MB for localStorage safety
    if (file.size > 4 * 1024 * 1024) {
      setErrorMsg('Ukuran file gambar maksimal 4 MB agar performa tetap cepat.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        if (isSekolahTab) {
          onLogoChange(result);
          setSuccessMsg('Logo Sekolah (Cover Depan) berhasil diunggah & diperbarui!');
        } else {
          onGarudaLogoChange?.(result);
          setSuccessMsg('Logo Garuda (Lembar Evaluasi & Matriks Kualitatif) berhasil diunggah!');
        }
        setTimeout(() => setSuccessMsg(null), 3500);
      }
    };
    reader.onerror = () => {
      setErrorMsg('Gagal membaca file gambar. Silakan coba file lain.');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleResetToDefault = () => {
    if (isSekolahTab) {
      onLogoChange(undefined);
      setSuccessMsg('Logo dikembalikan ke lambang standar sekolah (Tut Wuri Handayani SMPN 7 Sentani).');
    } else {
      onGarudaLogoChange?.(undefined);
      setSuccessMsg('Logo Garuda dikembalikan ke Lambang Garuda Pancasila Emas Baku BKN.');
    }
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleSelectPreset = (url: string) => {
    if (isSekolahTab) {
      onLogoChange(url);
      setSuccessMsg('Preset logo sekolah berhasil diterapkan!');
    } else {
      onGarudaLogoChange?.(url);
      setSuccessMsg('Preset logo Garuda berhasil diterapkan!');
    }
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className={`bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 ${className}`}>
      {/* Header Utama & Tab Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
        </div>

        {/* Tab Switcher: Logo Sekolah vs Logo Garuda */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            type="button"
            id="tab-upload-sekolah"
            onClick={() => setActiveTab('sekolah')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'sekolah'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>1. Logo Sekolah</span>
            <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-semibold ${
              currentLogoUrl ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
            }`}>
              {currentLogoUrl ? 'Kustom' : 'Standar'}
            </span>
          </button>

          <button
            type="button"
            id="tab-upload-garuda"
            onClick={() => setActiveTab('garuda')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'garuda'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>2. Logo Garuda</span>
            <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-semibold ${
              currentGarudaLogoUrl ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {currentGarudaLogoUrl ? 'Kustom' : 'Emas BKN'}
            </span>
          </button>
        </div>
      </div>

      {/* Target Info Banner */}
      <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
        isSekolahTab 
          ? 'bg-blue-50/70 border-blue-200 text-blue-900' 
          : 'bg-amber-50/70 border-amber-200 text-amber-900'
      }`}>
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider text-[11px]">
            {isSekolahTab ? '🏫 Tempat Penempatan:' : '🦅 Tempat Penempatan:'}
          </span>
          <span className="font-medium">
            {isSekolahTab 
              ? 'Halaman Sampul (Cover Depan SKP) & Kop Surat Resmi Sekolah' 
              : 'Lembar Dokumen Evaluasi Kinerja & Matriks Kualitatif / Evaluasi SKP (PermenPAN-RB No. 6/2022)'}
          </span>
        </div>

        {activeUrl && (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setPreviewModalOpen(true)}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 rounded-md text-xs font-semibold flex items-center gap-1 transition-all border border-slate-200 cursor-pointer"
              title="Lihat Pratinjau Logo"
            >
              <Eye className="w-3 h-3" />
              <span>Pratinjau</span>
            </button>
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded-md text-xs font-semibold flex items-center gap-1 transition-all border border-rose-200 cursor-pointer"
              title="Kembali ke lambang bawaan"
            >
              <Trash2 className="w-3 h-3" />
              <span>Reset Standar</span>
            </button>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-fadeIn">
          ⚠️ {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Drag-and-Drop & Click Upload Zone */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Current Logo Preview Box */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-slate-50 text-center min-h-[160px]">
          {isSekolahTab ? (
            activeUrl ? (
              <div className="space-y-2">
                <div className="w-24 h-24 mx-auto rounded-xl bg-white p-2 border border-slate-200 shadow-xs flex items-center justify-center overflow-hidden">
                  <img
                    src={activeUrl}
                    alt="Logo Sekolah Terpilih"
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  ✓ Logo Kustom Sekolah Aktif
                </span>
              </div>
            ) : (
              <div className="space-y-2 text-slate-500">
                <LogoSekolah className="w-20 h-20 mx-auto" />
                <div>
                  <p className="text-xs font-bold text-slate-700">Logo Standar Sekolah</p>
                  <p className="text-[11px] text-slate-400">SMP Negeri 7 Sentani</p>
                </div>
              </div>
            )
          ) : (
            activeUrl ? (
              <div className="space-y-2">
                <div className="w-24 h-24 mx-auto rounded-xl bg-white p-2 border border-slate-200 shadow-xs flex items-center justify-center overflow-hidden">
                  <img
                    src={activeUrl}
                    alt="Logo Garuda Terpilih"
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  ✓ Logo Garuda Kustom Aktif
                </span>
              </div>
            ) : (
              <div className="space-y-2 text-slate-500">
                <GarudaEmas className="w-20 h-20 mx-auto" />
                <div>
                  <p className="text-xs font-bold text-amber-900">Garuda Pancasila Emas</p>
                  <p className="text-[11px] text-slate-500">Baku PermenPAN-RB No. 6/2022</p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Upload Dropzone */}
        <div
          id={`dropzone-logo-${activeTab}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`md:col-span-8 p-6 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 min-h-[160px] ${
            isDragging
              ? 'border-blue-500 bg-blue-50/70 scale-[1.01]'
              : isSekolahTab
                ? 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50'
                : 'border-slate-300 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/30'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleInputChange}
            accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
            className="hidden"
            id={`file-input-logo-${activeTab}`}
          />

          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xs ${
            isSekolahTab ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
          }`}>
            <UploadCloud className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-800">
              <span className={isSekolahTab ? 'text-blue-600 underline font-extrabold' : 'text-amber-700 underline font-extrabold'}>
                Klik untuk memilih file {isSekolahTab ? 'Logo Sekolah' : 'Logo Garuda'}
              </span>{' '}
              atau seret & lepas gambar ke sini
            </p>
            <p className="text-[11px] text-slate-500">
              Format: PNG, JPG, JPEG, WEBP, atau SVG transparan (Maks. 4 MB)
            </p>
          </div>
        </div>
      </div>

      {/* Preset Pilihan Cepat sesuai Tab yang Aktif */}
      <div className="pt-2 border-t border-slate-100 space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>
            {isSekolahTab 
              ? 'Atau pilih preset logo sekolah resmi:' 
              : 'Atau pilih preset lambang Garuda resmi:'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(isSekolahTab ? PRESET_LOGOS_SEKOLAH : PRESET_LOGOS_GARUDA).map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset.url)}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 bg-white transition-all flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 p-1 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200 group-hover:border-blue-300">
                <img
                  src={preset.url}
                  alt={preset.name}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-900">
                  {preset.shortName}
                </p>
                <span className="text-[10px] text-slate-500 font-medium">{preset.tag}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Preview Gambar Besar */}
      {previewModalOpen && activeUrl && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="text-sm font-bold text-slate-900">
                Pratinjau {isSekolahTab ? 'Logo Sekolah' : 'Logo Garuda'}
              </h4>
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="w-56 h-56 mx-auto bg-slate-50 p-4 rounded-xl border flex items-center justify-center">
              <img
                src={activeUrl}
                alt="Pratinjau Logo"
                className="max-h-full max-w-full object-contain drop-shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs text-slate-500">
              {isSekolahTab 
                ? 'Logo ini otomatis tampil pada Cover Depan Dokumen SKP.' 
                : 'Logo ini otomatis tampil pada Lembar Evaluasi & Matriks Kualitatif.'}
            </p>

            <button
              type="button"
              onClick={() => setPreviewModalOpen(false)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Tutup Pratinjau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
