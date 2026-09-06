import React, { useState } from 'react';
import { 
  Award,
  Calendar, 
  CheckCircle2, 
  ChevronDown,
  ChevronRight, 
  ChevronUp, 
  Download, 
  Edit3, 
  ExternalLink, 
  FileCheck, 
  FileSpreadsheet, 
  Image as ImageIcon,
  Printer, 
  School, 
  ShieldCheck, 
  Sparkles, 
  UserCheck 
} from 'lucide-react';
import { SKPData, TabType } from '../types';
import { LogoUploader } from './LogoUploader';
import { LogoSekolah } from './LogoSekolah';

interface CoverDepanViewProps {
  data: SKPData;
  onUpdate: (updated: Partial<SKPData>) => void;
  onNavigateTab: (tab: TabType) => void;
  onOpenPrint: () => void;
}

export const CoverDepanView: React.FC<CoverDepanViewProps> = ({
  data,
  onUpdate,
  onNavigateTab,
  onOpenPrint,
}) => {
  const isKepalaSekolah = data.role === 'kepala_sekolah';
  const [showUploader, setShowUploader] = useState(true);

  return (
    <div className="space-y-6">
      {/* Top Action & Announcement Bar */}
      <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-blue-800/40">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-200">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Halaman Sampul Resmi • Standar PermenPAN-RB No. 6 Tahun 2022</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Cover Depan Sasaran Kinerja Pegawai (SKP)</span>
          </h2>
          <p className="text-xs text-blue-200/80 max-w-2xl">
            Dokumen resmi evaluasi kinerja aparatur sipil negara di lingkungan SMP Negeri 7 Sentani, Dinas Pendidikan Kabupaten Jayapura.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            id="btn-toggle-uploader-cover"
            onClick={() => setShowUploader(!showUploader)}
            className="px-3.5 py-2.5 bg-blue-700/80 hover:bg-blue-600 text-white font-semibold text-xs rounded-xl border border-blue-500/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ImageIcon className="w-4 h-4 text-amber-300" />
            <span>{showUploader ? 'Sembunyikan Pengunggah Logo' : 'Kelola / Upload Logo'}</span>
            {showUploader ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
          </button>
          <button
            type="button"
            id="btn-cetak-cover-depan"
            onClick={onOpenPrint}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / PDF Cover Depan</span>
          </button>
          <button
            type="button"
            id="btn-edit-profil-cover"
            onClick={() => onNavigateTab('profil')}
            className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Data Identitas</span>
          </button>
        </div>
      </div>

      {/* TEMPAT UPLOAD LOGO SEKOLAH & LOGO GARUDA */}
      {showUploader && (
        <div className="animate-fadeIn">
          <LogoUploader
            currentLogoUrl={data.customLogoUrl}
            currentGarudaLogoUrl={data.customGarudaLogoUrl}
            onLogoChange={(logoUrl) => onUpdate({ customLogoUrl: logoUrl })}
            onGarudaLogoChange={(logoUrl) => onUpdate({ customGarudaLogoUrl: logoUrl })}
            title="Tempat Upload Logo: Logo Sekolah & Logo Garuda Pancasila"
            description="Unggah Logo Sekolah untuk Cover Depan SKP dan Logo Garuda untuk Lembar Evaluasi & Matriks Kualitatif/Evaluasi SKP."
          />
        </div>
      )}

      {/* Main Cover Document Canvas (A4 Paper Aesthetic) */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-300 shadow-2xl p-8 md:p-14 text-slate-900 relative overflow-hidden">
        {/* Subtle watermark background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025] flex items-center justify-center">
          {data.customLogoUrl ? (
            <img
              src={data.customLogoUrl}
              alt="Watermark"
              className="w-[500px] h-[500px] object-contain grayscale"
              referrerPolicy="no-referrer"
            />
          ) : (
            <School className="w-[600px] h-[600px] text-blue-900" />
          )}
        </div>

        {/* Double Border Frame Resmi Kedinasan */}
        <div className="border-4 border-slate-900 p-6 md:p-8 rounded-lg relative">
          <div className="border border-slate-700 p-6 md:p-8">
            {/* Header Kop Resmi dengan Logo Sekolah */}
            <div className="text-center space-y-2 pb-6 border-b-2 border-slate-900">
              <LogoSekolah
                customLogoUrl={data.customLogoUrl}
                className="w-24 h-24 mx-auto mb-2"
              />
              <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-slate-700">
                Pemerintah Kabupaten Jayapura • Dinas Pendidikan
              </p>
              <h1 className="text-lg md:text-xl font-black tracking-wide uppercase text-slate-950">
                SMP NEGERI 7 SENTANI
              </h1>
              <p className="text-[11px] text-slate-600 italic">
                Jalan Raya Sentani, Distrik Sentani, Kabupaten Jayapura, Provinsi Papua
              </p>
            </div>

            {/* Judul Dokumen Utama */}
            <div className="text-center my-10 md:my-14 space-y-3">
              <span className="inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold uppercase tracking-wider border border-slate-300">
                DOKUMEN RESMI BKN & KEMENDIKBUDRISTEK
              </span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-950 uppercase font-serif">
                SASARAN KINERJA PEGAWAI (SKP)
              </h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wide text-blue-950">
                PENDEKATAN HASIL KERJA KUANTITATIF BAGI PEJABAT FUNGSIONAL {isKepalaSekolah ? 'KEPALA SEKOLAH' : 'GURU'}
              </p>
              <p className="text-xs font-semibold text-slate-700 uppercase bg-blue-50/80 py-1.5 px-4 rounded-lg inline-block border border-blue-200">
                PERIODE PENILAIAN: {data.periode.rentangWaktu.toUpperCase()}
              </p>
            </div>

            {/* Identitas Resmi Pegawai Yang Dinilai & Pejabat Penilai Kinerja (Tanpa Predikat & Tanpa Tanda Tangan) */}
            <div className="space-y-5 my-10 max-w-2xl mx-auto">
              {/* 1. PEGAWAI YANG DINILAI */}
              <div className="border-2 border-slate-800 rounded-xl overflow-hidden shadow-xs">
                <div className="bg-slate-900 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>1. PEGAWAI YANG DINILAI</span>
                  <span className="text-[10px] text-amber-300 font-semibold">PEGAWAI ASN</span>
                </div>
                <div className="p-4 bg-white space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-100 pb-1.5">
                    <span className="w-40 text-slate-500 font-medium shrink-0">Nama Lengkap</span>
                    <span className="font-bold text-slate-950 text-sm">: {data.pegawai.nama}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-100 pb-1.5">
                    <span className="w-40 text-slate-500 font-medium shrink-0">NIP</span>
                    <span className="font-mono font-semibold text-slate-900">: {data.pegawai.nip}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-100 pb-1.5">
                    <span className="w-40 text-slate-500 font-medium shrink-0">Pangkat / Golongan</span>
                    <span className="font-medium text-slate-900">: {data.pegawai.pangkatGol}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-100 pb-1.5">
                    <span className="w-40 text-slate-500 font-medium shrink-0">Jabatan</span>
                    <span className="font-semibold text-slate-900">: {data.pegawai.jabatan}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline pt-0.5">
                    <span className="w-40 text-slate-500 font-medium shrink-0">Unit Kerja</span>
                    <span className="font-semibold text-slate-950">: {data.pegawai.unitKerja}</span>
                  </div>
                </div>
              </div>

              {/* 2. PEJABAT PENILAI KINERJA */}
              <div className="border-2 border-slate-800 rounded-xl overflow-hidden shadow-xs">
                <div className="bg-slate-800 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>2. PEJABAT PENILAI KINERJA</span>
                  <span className="text-[10px] text-blue-200 font-semibold">PIMPINAN PENILAI</span>
                </div>
                <div className="p-4 bg-white space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-100 pb-1.5">
                    <span className="w-40 text-slate-500 font-medium shrink-0">Nama Lengkap</span>
                    <span className="font-bold text-slate-950 text-sm">: {data.penilai.nama}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-100 pb-1.5">
                    <span className="w-40 text-slate-500 font-medium shrink-0">NIP</span>
                    <span className="font-mono font-semibold text-slate-900">: {data.penilai.nip}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-100 pb-1.5">
                    <span className="w-40 text-slate-500 font-medium shrink-0">Pangkat / Golongan</span>
                    <span className="font-medium text-slate-900">: {data.penilai.pangkatGol}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-100 pb-1.5">
                    <span className="w-40 text-slate-500 font-medium shrink-0">Jabatan</span>
                    <span className="font-semibold text-slate-900">: {data.penilai.jabatan}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline pt-0.5">
                    <span className="w-40 text-slate-500 font-medium shrink-0">Unit Kerja</span>
                    <span className="font-semibold text-slate-950">: {data.penilai.unitKerja}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Bawah Cover Resmi (Tanpa Tanda Tangan) */}
            <div className="mt-12 pt-6 border-t-2 border-slate-900 text-center text-xs space-y-1">
              <p className="font-bold uppercase tracking-wider text-slate-900 text-sm">
                {data.pegawai.unitKerja.toUpperCase()}
              </p>
              <p className="text-slate-600 font-semibold tracking-wide uppercase">
                {data.periode.tempat} • TAHUN {data.periode.tahun}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Card below Cover */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => onNavigateTab('rencana')}
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileSpreadsheet className="w-4 h-4" />
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Rencana Kinerja SKP</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Lihat {data.items.length} butir sasaran kinerja pimpinan dan pegawai.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('evaluasi')}
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <FileCheck className="w-4 h-4" />
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Evaluasi & Kuadran</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Realisasi bukti dukung, grafik kuadran 3x3, dan umpan balik emoji BKN.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('perilaku')}
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2 rounded-lg bg-rose-50 text-rose-700 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Award className="w-4 h-4" />
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Perilaku BerAKHLAK</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            7 nilai dasar ASN dan evaluasi ekspektasi pimpinan ber-emoji.
          </p>
        </button>
      </div>
    </div>
  );
};
