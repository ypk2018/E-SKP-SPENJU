import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  Download, 
  Eye, 
  FileText, 
  Printer, 
  Sparkles, 
  X 
} from 'lucide-react';
import { SKPData } from '../types';
import { KuadranGrafikKinerja } from './KuadranGrafikKinerja';
import { GarudaEmas } from './GarudaEmas';
import { LogoSekolah } from './LogoSekolah';

interface PrintPreviewModalProps {
  data: SKPData;
  onClose?: () => void;
  isStandaloneTab?: boolean;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  data,
  onClose,
  isStandaloneTab = false,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<'sampul' | 'cover' | 'rencana' | 'evaluasi' | 'lampiran' | 'semua'>('sampul');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`space-y-6 ${isStandaloneTab ? '' : 'p-4 md:p-6 bg-slate-900/60 fixed inset-0 z-50 overflow-y-auto flex items-center justify-center'}`}>
      <div className={`bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden w-full ${isStandaloneTab ? '' : 'max-w-5xl my-6'}`}>
        {/* Top Control Bar (Hidden on Print) */}
        <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold leading-tight">
                Format Berkas Resmi BKN PermenPAN-RB No. 6 Tahun 2022
              </h2>
              <p className="text-[11px] text-slate-300">
                SMP Negeri 7 Sentani • Dokumen Siap Cetak (A4/F4)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Document Switcher */}
            <div className="inline-flex p-1 bg-slate-800 rounded-lg text-xs font-semibold text-slate-300 border border-slate-700">
              <button
                type="button"
                id="print-select-sampul"
                onClick={() => setSelectedDoc('sampul')}
                className={`px-2.5 py-1 rounded transition-all ${
                  selectedDoc === 'sampul' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'hover:text-white'
                }`}
              >
                0. Cover Depan
              </button>
              <button
                type="button"
                id="print-select-cover"
                onClick={() => setSelectedDoc('cover')}
                className={`px-2.5 py-1 rounded transition-all ${
                  selectedDoc === 'cover' ? 'bg-blue-600 text-white shadow-xs' : 'hover:text-white'
                }`}
              >
                1. Lembar Evaluasi
              </button>
              <button
                type="button"
                id="print-select-rencana"
                onClick={() => setSelectedDoc('rencana')}
                className={`px-2.5 py-1 rounded transition-all ${
                  selectedDoc === 'rencana' ? 'bg-blue-600 text-white shadow-xs' : 'hover:text-white'
                }`}
              >
                2. Rencana SKP
              </button>
              <button
                type="button"
                id="print-select-evaluasi"
                onClick={() => setSelectedDoc('evaluasi')}
                className={`px-2.5 py-1 rounded transition-all ${
                  selectedDoc === 'evaluasi' ? 'bg-blue-600 text-white shadow-xs' : 'hover:text-white'
                }`}
              >
                3. Matriks Kualitatif / Evaluasi
              </button>
              <button
                type="button"
                id="print-select-lampiran"
                onClick={() => setSelectedDoc('lampiran')}
                className={`px-2.5 py-1 rounded transition-all ${
                  selectedDoc === 'lampiran' ? 'bg-blue-600 text-white shadow-xs' : 'hover:text-white'
                }`}
              >
                4. Lampiran
              </button>
              <button
                type="button"
                id="print-select-semua"
                onClick={() => setSelectedDoc('semua')}
                className={`px-2.5 py-1 rounded transition-all ${
                  selectedDoc === 'semua' ? 'bg-emerald-600 text-white shadow-xs' : 'hover:text-white'
                }`}
              >
                Semua Lembar
              </button>
            </div>

            {/* Print Trigger Button */}
            <button
              type="button"
              id="btn-do-print"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Printable Sheets Area */}
        <div className="p-4 md:p-8 bg-slate-100/70 overflow-x-auto min-h-[600px] print:p-0 print:bg-white">
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* 0. COVER DEPAN RESMI (HALAMAN SAMPUL SKP) */}
            {(selectedDoc === 'sampul' || selectedDoc === 'semua') && (
              <div className="bg-white p-8 md:p-14 border border-slate-300 shadow-md print:shadow-none print:border-none print:p-6 text-slate-900 font-serif print:page-break-after">
                <div className="border-4 border-slate-900 p-6 md:p-8 rounded-lg">
                  <div className="border border-slate-700 p-6 md:p-8">
                    {/* Header Kop Resmi dengan Logo Sekolah */}
                    <div className="text-center space-y-2 pb-6 border-b-2 border-slate-900">
                      <LogoSekolah
                        customLogoUrl={data.customLogoUrl}
                        className="w-24 h-24 mx-auto mb-2"
                      />
                      <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-slate-700">
                        PEMERINTAH KABUPATEN JAYAPURA • DINAS PENDIDIKAN
                      </p>
                      <h1 className="text-xl md:text-2xl font-black tracking-wide uppercase text-slate-950">
                        SMP NEGERI 7 SENTANI
                      </h1>
                      <p className="text-xs text-slate-600 italic">
                        Alamat: Jalan Raya Sentani, Distrik Sentani, Kabupaten Jayapura, Papua
                      </p>
                    </div>

                    {/* Judul Dokumen */}
                    <div className="text-center my-10 space-y-3">
                      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-slate-950">
                        SASARAN KINERJA PEGAWAI (SKP)
                      </h2>
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-700">
                        PENDEKATAN HASIL KERJA KUANTITATIF BAGI PEJABAT FUNGSIONAL
                      </p>
                      <p className="text-xs font-semibold text-slate-600">
                        PERIODE PENILAIAN: {data.periode.rentangWaktu.toUpperCase()} TAHUN {data.periode.tahun}
                      </p>
                    </div>

                    {/* Identitas Pegawai yang Dinilai & Pejabat Penilai Kinerja (Tanpa Predikat & Tanpa Tanda Tangan) */}
                    <div className="my-10 space-y-4 max-w-xl mx-auto text-xs">
                      {/* 1. Pegawai yang Dinilai */}
                      <div className="p-4 bg-slate-50 border-2 border-slate-400 rounded-md">
                        <p className="font-bold text-slate-900 uppercase text-xs mb-2.5 border-b-2 border-slate-300 pb-1">
                          1. PEGAWAI YANG DINILAI:
                        </p>
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td className="w-36 py-1 font-semibold text-slate-700">Nama Lengkap</td>
                              <td className="w-4">:</td>
                              <td className="font-bold text-slate-950 text-sm">{data.pegawai.nama}</td>
                            </tr>
                            <tr>
                              <td className="py-1 font-semibold text-slate-700">NIP</td>
                              <td>:</td>
                              <td className="font-mono font-semibold">{data.pegawai.nip}</td>
                            </tr>
                            <tr>
                              <td className="py-1 font-semibold text-slate-700">Pangkat / Golongan</td>
                              <td>:</td>
                              <td>{data.pegawai.pangkatGol}</td>
                            </tr>
                            <tr>
                              <td className="py-1 font-semibold text-slate-700">Jabatan</td>
                              <td>:</td>
                              <td className="font-medium">{data.pegawai.jabatan}</td>
                            </tr>
                            <tr>
                              <td className="py-1 font-semibold text-slate-700">Unit Kerja</td>
                              <td>:</td>
                              <td className="font-medium">{data.pegawai.unitKerja}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* 2. Pejabat Penilai Kinerja */}
                      <div className="p-4 bg-slate-50 border-2 border-slate-400 rounded-md">
                        <p className="font-bold text-slate-900 uppercase text-xs mb-2.5 border-b-2 border-slate-300 pb-1">
                          2. PEJABAT PENILAI KINERJA:
                        </p>
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td className="w-36 py-1 font-semibold text-slate-700">Nama Lengkap</td>
                              <td className="w-4">:</td>
                              <td className="font-bold text-slate-950 text-sm">{data.penilai.nama}</td>
                            </tr>
                            <tr>
                              <td className="py-1 font-semibold text-slate-700">NIP</td>
                              <td>:</td>
                              <td className="font-mono font-semibold">{data.penilai.nip}</td>
                            </tr>
                            <tr>
                              <td className="py-1 font-semibold text-slate-700">Pangkat / Golongan</td>
                              <td>:</td>
                              <td>{data.penilai.pangkatGol}</td>
                            </tr>
                            <tr>
                              <td className="py-1 font-semibold text-slate-700">Jabatan</td>
                              <td>:</td>
                              <td className="font-medium">{data.penilai.jabatan}</td>
                            </tr>
                            <tr>
                              <td className="py-1 font-semibold text-slate-700">Unit Kerja</td>
                              <td>:</td>
                              <td className="font-medium">{data.penilai.unitKerja}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Penutup Cover Resmi BKN (Tanpa Tanda Tangan) */}
                    <div className="mt-12 pt-5 border-t-2 border-slate-900 text-center text-xs space-y-1">
                      <p className="font-bold uppercase tracking-wider text-slate-900">
                        {data.pegawai.unitKerja.toUpperCase()}
                      </p>
                      <p className="text-slate-600 font-semibold uppercase">
                        {data.periode.tempat} • TAHUN {data.periode.tahun}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 1. DOKUMEN EVALUASI KINERJA PEGAWAI (COVER & HASIL AKHIR) */}
            {(selectedDoc === 'cover' || selectedDoc === 'semua') && (
              <div className="bg-white p-8 md:p-10 border border-slate-300 shadow-md print:shadow-none print:border-none print:p-4 text-slate-900 font-serif print:page-break-after">
                {/* LOGO GARUDA EMAS DI ATAS DOKUMEN EVALUASI (TANPA KOP INSTANSI SESUAI PERMENPAN-RB NO. 6/2022) */}
                <div className="text-center mb-6 pt-2">
                  <GarudaEmas customLogoUrl={data.customGarudaLogoUrl} className="w-24 h-24 mx-auto mb-3" />
                  <div className="space-y-1">
                    <h2 className="text-base md:text-lg font-black uppercase tracking-wider font-serif">
                      DOKUMEN EVALUASI KINERJA PEGAWAI
                    </h2>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-800">
                      PENDEKATAN HASIL KERJA KUANTITATIF
                    </p>
                    <p className="text-xs font-semibold uppercase text-slate-700">
                      PERIODE: {data.periode.periodeJenis.toUpperCase()} TAHUN {data.periode.tahun}
                    </p>
                    <p className="text-xs text-slate-600">
                      PERIODE PENILAIAN: {data.periode.rentangWaktu}
                    </p>
                  </div>
                </div>

                {/* Table Identitas */}
                <table className="w-full border-collapse border border-black text-xs mb-6">
                  <tbody>
                    {/* Pegawai yang Dinilai */}
                    <tr className="bg-slate-100 font-bold">
                      <td className="border border-black p-2 w-8 text-center">1.</td>
                      <td colSpan={3} className="border border-black p-2 uppercase">
                        PEGAWAI YANG DINILAI
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 w-48 font-medium">NAMA</td>
                      <td className="border border-black p-2 w-4 text-center">:</td>
                      <td className="border border-black p-2 font-bold">{data.pegawai.nama}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">NIP</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2">{data.pegawai.nip}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">PANGKAT / GOL. RUANG</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2">{data.pegawai.pangkatGol}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">JABATAN</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2">{data.pegawai.jabatan}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">UNIT KERJA</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2">{data.pegawai.unitKerja}</td>
                    </tr>

                    {/* Pejabat Penilai Kinerja */}
                    <tr className="bg-slate-100 font-bold">
                      <td className="border border-black p-2 text-center">2.</td>
                      <td colSpan={3} className="border border-black p-2 uppercase">
                        PEJABAT PENILAI KINERJA
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">NAMA</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2 font-bold">{data.penilai.nama}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">NIP</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2">{data.penilai.nip}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">PANGKAT / GOL. RUANG</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2">{data.penilai.pangkatGol}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">JABATAN</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2">{data.penilai.jabatan}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">UNIT KERJA</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2">{data.penilai.unitKerja}</td>
                    </tr>

                    {/* Atasan Pejabat Penilai Kinerja */}
                    <tr className="bg-slate-100 font-bold">
                      <td className="border border-black p-2 text-center">3.</td>
                      <td colSpan={3} className="border border-black p-2 uppercase">
                        ATASAN PEJABAT PENILAI KINERJA
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">NAMA</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2 font-bold">{data.atasanPenilai.nama}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">NIP</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2">{data.atasanPenilai.nip}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">PANGKAT / GOL. RUANG</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2">{data.atasanPenilai.pangkatGol}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">JABATAN</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2">{data.atasanPenilai.jabatan}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">UNIT KERJA</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2">{data.atasanPenilai.unitKerja}</td>
                    </tr>

                    {/* Evaluasi Kinerja */}
                    <tr className="bg-slate-100 font-bold">
                      <td className="border border-black p-2 text-center">4.</td>
                      <td colSpan={3} className="border border-black p-2 uppercase">
                        EVALUASI KINERJA
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">CAPAIAN KINERJA ORGANISASI</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2 font-bold uppercase">{data.capaianOrganisasi}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2 font-medium">PREDIKAT KINERJA PEGAWAI</td>
                      <td className="border border-black p-2 text-center">:</td>
                      <td className="border border-black p-2 font-bold uppercase">{data.predikatKinerja}</td>
                    </tr>

                    {/* Catatan / Rekomendasi */}
                    <tr className="bg-slate-100 font-bold">
                      <td className="border border-black p-2 text-center">5.</td>
                      <td colSpan={3} className="border border-black p-2 uppercase">
                        CATATAN / REKOMENDASI
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td colSpan={3} className="border border-black p-3 leading-relaxed italic">
                        {data.catatanRekomendasi || 'Kinerja terlaksana secara baik dan tertib sesuai target organisasi.'}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Tanda Tangan */}
                <div className="grid grid-cols-2 gap-8 text-center text-xs mt-10 pt-4">
                  <div>
                    <p className="mb-1">{data.periode.tempat}, {data.periode.tanggalEvaluasi}</p>
                    <p className="font-semibold mb-16">Pegawai yang Dinilai,</p>
                    <p className="font-bold underline uppercase">{data.pegawai.nama}</p>
                    <p>NIP. {data.pegawai.nip}</p>
                  </div>
                  <div>
                    <p className="mb-1">{data.periode.tempat}, {data.periode.tanggalEvaluasi}</p>
                    <p className="font-semibold mb-16">Pejabat Penilai Kinerja,</p>
                    <p className="font-bold underline uppercase">{data.penilai.nama}</p>
                    <p>NIP. {data.penilai.nip}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. FORMULIR SASARAN KINERJA PEGAWAI (RENCANA AWAL) */}
            {(selectedDoc === 'rencana' || selectedDoc === 'semua') && (
              <div className="bg-white p-8 md:p-10 border border-slate-300 shadow-md print:shadow-none print:border-none print:p-4 text-slate-900 font-serif print:page-break-after">
                <div className="text-center space-y-1 mb-4">
                  <h2 className="text-base font-bold underline uppercase">
                    SASARAN KINERJA PEGAWAI
                  </h2>
                  <p className="text-xs font-semibold uppercase">
                    PENDEKATAN HASIL KERJA KUANTITATIF (PERIODE: {data.periode.rentangWaktu})
                  </p>
                  <p className="text-xs font-medium">
                    {data.pegawai.unitKerja}
                  </p>
                </div>

                {/* Identitas Header Singkat */}
                <table className="w-full border-collapse border border-black text-xs mb-4">
                  <tbody>
                    <tr className="bg-slate-100 font-bold">
                      <td colSpan={2} className="border border-black p-1.5 w-1/2">PEGAWAI YANG DINILAI</td>
                      <td colSpan={2} className="border border-black p-1.5 w-1/2">PEJABAT PENILAI KINERJA</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5 w-28">Nama</td>
                      <td className="border border-black p-1.5 font-bold">{data.pegawai.nama}</td>
                      <td className="border border-black p-1.5 w-28">Nama</td>
                      <td className="border border-black p-1.5 font-bold">{data.penilai.nama}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">NIP</td>
                      <td className="border border-black p-1.5">{data.pegawai.nip}</td>
                      <td className="border border-black p-1.5">NIP</td>
                      <td className="border border-black p-1.5">{data.penilai.nip}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">Pangkat/Gol</td>
                      <td className="border border-black p-1.5">{data.pegawai.pangkatGol}</td>
                      <td className="border border-black p-1.5">Pangkat/Gol</td>
                      <td className="border border-black p-1.5">{data.penilai.pangkatGol}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">Jabatan</td>
                      <td className="border border-black p-1.5">{data.pegawai.jabatan}</td>
                      <td className="border border-black p-1.5">Jabatan</td>
                      <td className="border border-black p-1.5">{data.penilai.jabatan}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5">Unit Kerja</td>
                      <td className="border border-black p-1.5">{data.pegawai.unitKerja}</td>
                      <td className="border border-black p-1.5">Unit Kerja</td>
                      <td className="border border-black p-1.5">{data.penilai.unitKerja}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Tabel Rencana SKP */}
                <table className="w-full border-collapse border border-black text-xs mb-6">
                  <thead>
                    <tr className="bg-slate-100 text-center font-bold">
                      <th className="border border-black p-1.5 w-8">NO</th>
                      <th className="border border-black p-1.5">RENCANA HASIL KERJA ATASAN YANG DIINTERVENSI</th>
                      <th className="border border-black p-1.5">RENCANA HASIL KERJA</th>
                      <th className="border border-black p-1.5 w-20">ASPEK</th>
                      <th className="border border-black p-1.5">INDIKATOR KINERJA INDIVIDU</th>
                      <th className="border border-black p-1.5 w-24">TARGET</th>
                    </tr>
                    <tr className="text-center text-[10px] text-slate-600 bg-slate-50">
                      <th className="border border-black p-0.5">(1)</th>
                      <th className="border border-black p-0.5">(2)</th>
                      <th className="border border-black p-0.5">(3)</th>
                      <th className="border border-black p-0.5">(4)</th>
                      <th className="border border-black p-0.5">(5)</th>
                      <th className="border border-black p-0.5">(6)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-slate-100 font-bold">
                      <td colSpan={6} className="border border-black p-1.5">A. UTAMA</td>
                    </tr>
                    {data.items.filter((i) => i.kategori === 'UTAMA').map((item, idx) => (
                      <tr key={item.id}>
                        <td className="border border-black p-1.5 text-center">{idx + 1}</td>
                        <td className="border border-black p-1.5">{item.rhkPimpinan}</td>
                        <td className="border border-black p-1.5 font-semibold">{item.rencanaKinerja}</td>
                        <td className="border border-black p-1.5 text-center">{item.aspek}</td>
                        <td className="border border-black p-1.5">{item.iki}</td>
                        <td className="border border-black p-1.5 text-center font-bold">{item.target}</td>
                      </tr>
                    ))}

                    {data.items.filter((i) => i.kategori === 'TAMBAHAN').length > 0 && (
                      <>
                        <tr className="bg-slate-100 font-bold">
                          <td colSpan={6} className="border border-black p-1.5">B. TAMBAHAN</td>
                        </tr>
                        {data.items.filter((i) => i.kategori === 'TAMBAHAN').map((item, idx) => (
                          <tr key={item.id}>
                            <td className="border border-black p-1.5 text-center">{idx + 1}</td>
                            <td className="border border-black p-1.5">{item.rhkPimpinan}</td>
                            <td className="border border-black p-1.5 font-semibold">{item.rencanaKinerja}</td>
                            <td className="border border-black p-1.5 text-center">{item.aspek}</td>
                            <td className="border border-black p-1.5">{item.iki}</td>
                            <td className="border border-black p-1.5 text-center font-bold">{item.target}</td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>

                {/* Tanda Tangan */}
                <div className="grid grid-cols-2 gap-8 text-center text-xs mt-8">
                  <div>
                    <p className="mb-1">{data.periode.tempat}, {data.periode.tanggalSKP}</p>
                    <p className="font-semibold mb-16">Pegawai yang Dinilai,</p>
                    <p className="font-bold underline uppercase">{data.pegawai.nama}</p>
                    <p>NIP. {data.pegawai.nip}</p>
                  </div>
                  <div>
                    <p className="mb-1">{data.periode.tempat}, {data.periode.tanggalSKP}</p>
                    <p className="font-semibold mb-16">Pejabat Penilai Kinerja,</p>
                    <p className="font-bold underline uppercase">{data.penilai.nama}</p>
                    <p>NIP. {data.penilai.nip}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. EVALUASI KINERJA PEGAWAI (HASIL KERJA KUANTITATIF & PERILAKU BERAKHLAK) */}
            {(selectedDoc === 'evaluasi' || selectedDoc === 'semua') && (
              <div className="bg-white p-8 md:p-10 border border-slate-300 shadow-md print:shadow-none print:border-none print:p-4 text-slate-900 font-serif print:page-break-after">
                <div className="text-center mb-4">
                  <GarudaEmas customLogoUrl={data.customGarudaLogoUrl} className="w-16 h-16 mx-auto mb-2" />
                  <div className="space-y-1">
                    <h2 className="text-base font-bold uppercase tracking-wide">
                      EVALUASI KINERJA PEGAWAI
                    </h2>
                    <p className="text-xs font-semibold uppercase">
                      PENDEKATAN HASIL KERJA KUANTITATIF BAGI PEJABAT FUNGSIONAL
                    </p>
                    <p className="text-xs font-medium">
                      PERIODE: {data.periode.rentangWaktu} • {data.pegawai.unitKerja}
                    </p>
                  </div>
                </div>

                {/* Capaian Organisasi, Pola Distribusi Kurva & Gambar Grafik Matriks Kuadran 3x3 */}
                <div className="mb-5 border border-black p-3 bg-white">
                  <div className="text-xs font-bold uppercase mb-2 border-b border-black pb-1">
                    CAPAIAN KINERJA ORGANISASI & POLA DISTRIBUSI MATRIKS KUADRAN BKN
                  </div>
                  <KuadranGrafikKinerja
                    data={data}
                    readOnly={true}
                    isPrintMode={true}
                  />
                </div>

                {/* Tabel Evaluasi Kuantitatif Lengkap */}
                <table className="w-full border-collapse border border-black text-[11px] mb-4">
                  <thead>
                    <tr className="bg-slate-100 text-center font-bold">
                      <th className="border border-black p-1 w-7">NO</th>
                      <th className="border border-black p-1">RENCANA HASIL KERJA PIMPINAN YANG DIINTERVENSI</th>
                      <th className="border border-black p-1">RENCANA HASIL KERJA</th>
                      <th className="border border-black p-1 w-16">ASPEK</th>
                      <th className="border border-black p-1">INDIKATOR KINERJA INDIVIDU</th>
                      <th className="border border-black p-1 w-16">TARGET</th>
                      <th className="border border-black p-1">REALISASI BERDASARKAN BUKTI DUKUNG</th>
                      <th className="border border-black p-1">UMPAN BALIK BERKELANJUTAN</th>
                    </tr>
                    <tr className="text-center text-[9px] text-slate-600 bg-slate-50">
                      <th className="border border-black p-0.5">(1)</th>
                      <th className="border border-black p-0.5">-</th>
                      <th className="border border-black p-0.5">(2)</th>
                      <th className="border border-black p-0.5">-</th>
                      <th className="border border-black p-0.5">(3)</th>
                      <th className="border border-black p-0.5">(4)</th>
                      <th className="border border-black p-0.5">(6)</th>
                      <th className="border border-black p-0.5">(7)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-slate-100 font-bold">
                      <td colSpan={8} className="border border-black p-1">A. UTAMA</td>
                    </tr>
                    {data.items.filter((i) => i.kategori === 'UTAMA').map((item, idx) => (
                      <tr key={item.id}>
                        <td className="border border-black p-1 text-center">{idx + 1}</td>
                        <td className="border border-black p-1">{item.rhkPimpinan}</td>
                        <td className="border border-black p-1 font-semibold">{item.rencanaKinerja}</td>
                        <td className="border border-black p-1 text-center">{item.aspek}</td>
                        <td className="border border-black p-1">{item.iki}</td>
                        <td className="border border-black p-1 text-center font-bold">{item.target}</td>
                        <td className="border border-black p-1">{item.realisasi || '-'}</td>
                        <td className="border border-black p-1 italic">{item.umpanBalik || '-'}</td>
                      </tr>
                    ))}

                    {data.items.filter((i) => i.kategori === 'TAMBAHAN').length > 0 && (
                      <>
                        <tr className="bg-slate-100 font-bold">
                          <td colSpan={8} className="border border-black p-1">B. TAMBAHAN</td>
                        </tr>
                        {data.items.filter((i) => i.kategori === 'TAMBAHAN').map((item, idx) => (
                          <tr key={item.id}>
                            <td className="border border-black p-1 text-center">{idx + 1}</td>
                            <td className="border border-black p-1">{item.rhkPimpinan}</td>
                            <td className="border border-black p-1 font-semibold">{item.rencanaKinerja}</td>
                            <td className="border border-black p-1 text-center">{item.aspek}</td>
                            <td className="border border-black p-1">{item.iki}</td>
                            <td className="border border-black p-1 text-center font-bold">{item.target}</td>
                            <td className="border border-black p-1">{item.realisasi || '-'}</td>
                            <td className="border border-black p-1 italic">{item.umpanBalik || '-'}</td>
                          </tr>
                        ))}
                      </>
                    )}

                    {/* Rating Hasil Kerja Bar */}
                    <tr className="bg-slate-200 font-bold">
                      <td colSpan={4} className="border border-black p-1.5 uppercase">
                        RATING HASIL KERJA*
                      </td>
                      <td colSpan={4} className="border border-black p-1.5 uppercase text-blue-900">
                        : {data.ratingHasilKerja}
                      </td>
                    </tr>

                    {/* PERILAKU KERJA */}
                    <tr className="bg-slate-100 font-bold">
                      <td colSpan={6} className="border border-black p-1.5 uppercase">
                        PERILAKU KERJA
                      </td>
                      <td colSpan={2} className="border border-black p-1.5 uppercase text-center">
                        UMPAN BALIK BERKELANJUTAN BERDASARKAN BUKTI DUKUNG
                      </td>
                    </tr>

                    {data.perilaku.map((p, pIdx) => (
                      <tr key={p.id}>
                        <td className="border border-black p-1 text-center">{pIdx + 1}</td>
                        <td colSpan={5} className="border border-black p-1.5">
                          <strong className="block mb-1 text-xs">{p.nama}</strong>
                          <ul className="list-disc list-inside text-[10px] space-y-0.5 text-slate-700">
                            {p.panduanPerilaku.map((g, gIdx) => (
                              <li key={gIdx}>{g}</li>
                            ))}
                          </ul>
                          {p.ekspektasiKhusus && (
                            <div className="mt-1 pt-1 border-t border-slate-300 text-[10px] text-slate-800">
                              <em>Ekspektasi Khusus Pimpinan:</em> {p.ekspektasiKhusus}
                            </div>
                          )}
                        </td>
                        <td colSpan={2} className="border border-black p-1.5 italic text-slate-800 align-top text-[10px]">
                          {p.umpanBalik || '-'}
                        </td>
                      </tr>
                    ))}

                    {/* Rating Perilaku Kerja Bar */}
                    <tr className="bg-slate-200 font-bold">
                      <td colSpan={4} className="border border-black p-1.5 uppercase">
                        RATING PERILAKU KERJA*
                      </td>
                      <td colSpan={4} className="border border-black p-1.5 uppercase text-blue-900">
                        : {data.ratingPerilakuKerja}
                      </td>
                    </tr>

                    {/* Predikat Kinerja Pegawai Bar */}
                    <tr className="bg-slate-300 font-black text-xs">
                      <td colSpan={4} className="border border-black p-2 uppercase">
                        PREDIKAT KINERJA PEGAWAI*
                      </td>
                      <td colSpan={4} className="border border-black p-2 uppercase text-emerald-950">
                        : {data.predikatKinerja}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Tanda Tangan Penilai */}
                <div className="text-right text-xs mt-6">
                  <p className="mb-1">{data.periode.tempat}, {data.periode.tanggalEvaluasi}</p>
                  <p className="font-semibold mb-16">Pejabat Penilai Kinerja,</p>
                  <p className="font-bold underline uppercase">{data.penilai.nama}</p>
                  <p>NIP. {data.penilai.nip}</p>
                </div>
              </div>
            )}

            {/* 4. LAMPIRAN SASARAN KINERJA PEGAWAI */}
            {(selectedDoc === 'lampiran' || selectedDoc === 'semua') && (
              <div className="bg-white p-8 md:p-10 border border-slate-300 shadow-md print:shadow-none print:border-none print:p-4 text-slate-900 font-serif print:page-break-after">
                <div className="text-center space-y-1 mb-4">
                  <h2 className="text-base font-bold underline uppercase">
                    LAMPIRAN SASARAN KINERJA PEGAWAI
                  </h2>
                  <p className="text-xs font-semibold uppercase">
                    {data.pegawai.unitKerja} • PERIODE: {data.periode.rentangWaktu}
                  </p>
                </div>

                <table className="w-full border-collapse border border-black text-xs mb-6">
                  <tbody>
                    {/* Dukungan Sumber Daya */}
                    <tr className="bg-slate-100 font-bold">
                      <td colSpan={2} className="border border-black p-2 uppercase">
                        I. DUKUNGAN SUMBER DAYA
                      </td>
                    </tr>
                    {data.lampiran.dukunganSumberDaya.map((item, idx) => (
                      <tr key={idx}>
                        <td className="border border-black p-1.5 w-8 text-center">{idx + 1}.</td>
                        <td className="border border-black p-1.5">{item}</td>
                      </tr>
                    ))}

                    {/* Skema Pertanggungjawaban */}
                    <tr className="bg-slate-100 font-bold">
                      <td colSpan={2} className="border border-black p-2 uppercase">
                        II. SKEMA PERTANGGUNGJAWABAN
                      </td>
                    </tr>
                    {data.lampiran.skemaPertanggungjawaban.map((item, idx) => (
                      <tr key={idx}>
                        <td className="border border-black p-1.5 w-8 text-center">{idx + 1}.</td>
                        <td className="border border-black p-1.5">{item}</td>
                      </tr>
                    ))}

                    {/* Konsekuensi */}
                    <tr className="bg-slate-100 font-bold">
                      <td colSpan={2} className="border border-black p-2 uppercase">
                        III. KONSEKUENSI
                      </td>
                    </tr>
                    {data.lampiran.konsekuensi.map((item, idx) => (
                      <tr key={idx}>
                        <td className="border border-black p-1.5 w-8 text-center">{idx + 1}.</td>
                        <td className="border border-black p-1.5">{item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Tanda Tangan */}
                <div className="grid grid-cols-2 gap-8 text-center text-xs mt-8">
                  <div>
                    <p className="mb-1">{data.periode.tempat}, {data.periode.tanggalSKP}</p>
                    <p className="font-semibold mb-16">Pegawai yang Dinilai,</p>
                    <p className="font-bold underline uppercase">{data.pegawai.nama}</p>
                    <p>NIP. {data.pegawai.nip}</p>
                  </div>
                  <div>
                    <p className="mb-1">{data.periode.tempat}, {data.periode.tanggalSKP}</p>
                    <p className="font-semibold mb-16">Pejabat Penilai Kinerja,</p>
                    <p className="font-bold underline uppercase">{data.penilai.nama}</p>
                    <p>NIP. {data.penilai.nip}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
