import React from 'react';
import { 
  Building2, 
  Calendar, 
  Check, 
  Image as ImageIcon,
  MapPin, 
  ShieldCheck, 
  User, 
  UserCheck, 
  Users 
} from 'lucide-react';
import { SKPData } from '../types';
import { LogoUploader } from './LogoUploader';

interface ProfileSectionProps {
  data: SKPData;
  onUpdate: (updated: Partial<SKPData>) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  data,
  onUpdate,
}) => {
  const handlePegawaiChange = (field: keyof typeof data.pegawai, value: string) => {
    onUpdate({
      pegawai: {
        ...data.pegawai,
        [field]: value,
      },
    });
  };

  const handlePenilaiChange = (field: keyof typeof data.penilai, value: string) => {
    onUpdate({
      penilai: {
        ...data.penilai,
        [field]: value,
      },
    });
  };

  const handleAtasanChange = (field: keyof typeof data.atasanPenilai, value: string) => {
    onUpdate({
      atasanPenilai: {
        ...data.atasanPenilai,
        [field]: value,
      },
    });
  };

  const handlePeriodeChange = (field: keyof typeof data.periode, value: string) => {
    onUpdate({
      periode: {
        ...data.periode,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Data Pegawai & Pejabat Penilai Kinerja
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Data ini akan dicantumkan pada seluruh lembar dokumen resmi SKP dan lembar pengesahan tanda tangan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
            SMP Negeri 7 Sentani
          </span>
        </div>
      </div>

      {/* 3 Columns for 3 Profiles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. PEGAWAI YANG DINILAI */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pegawai yang Dinilai</h3>
              <p className="text-[11px] text-slate-500">
                {data.role === 'kepala_sekolah' ? 'Kepala Sekolah' : 'Guru Satuan Pendidikan'}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
              <input
                type="text"
                id="input-pegawai-nama"
                value={data.pegawai.nama}
                onChange={(e) => handlePegawaiChange('nama', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">NIP (Nomor Induk Pegawai)</label>
              <input
                type="text"
                id="input-pegawai-nip"
                value={data.pegawai.nip}
                onChange={(e) => handlePegawaiChange('nip', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Pangkat / Golongan Ruang</label>
              <input
                type="text"
                id="input-pegawai-pangkat"
                value={data.pegawai.pangkatGol}
                onChange={(e) => handlePegawaiChange('pangkatGol', e.target.value)}
                placeholder="Contoh: PEMBINA, (IV/a) atau PENATA, (III/c)"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Jabatan</label>
              <input
                type="text"
                id="input-pegawai-jabatan"
                value={data.pegawai.jabatan}
                onChange={(e) => handlePegawaiChange('jabatan', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Unit Kerja</label>
              <input
                type="text"
                id="input-pegawai-unit"
                value={data.pegawai.unitKerja}
                onChange={(e) => handlePegawaiChange('unitKerja', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* 2. PEJABAT PENILAI KINERJA */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pejabat Penilai Kinerja</h3>
              <p className="text-[11px] text-slate-500">
                {data.role === 'kepala_sekolah' ? 'Kepala Dinas Pendidikan' : 'Kepala Sekolah'}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Pejabat Penilai</label>
              <input
                type="text"
                id="input-penilai-nama"
                value={data.penilai.nama}
                onChange={(e) => handlePenilaiChange('nama', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">NIP Pejabat Penilai</label>
              <input
                type="text"
                id="input-penilai-nip"
                value={data.penilai.nip}
                onChange={(e) => handlePenilaiChange('nip', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Pangkat / Golongan</label>
              <input
                type="text"
                id="input-penilai-pangkat"
                value={data.penilai.pangkatGol}
                onChange={(e) => handlePenilaiChange('pangkatGol', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Jabatan</label>
              <input
                type="text"
                id="input-penilai-jabatan"
                value={data.penilai.jabatan}
                onChange={(e) => handlePenilaiChange('jabatan', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Instansi / Unit Kerja</label>
              <input
                type="text"
                id="input-penilai-unit"
                value={data.penilai.unitKerja}
                onChange={(e) => handlePenilaiChange('unitKerja', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* 3. ATASAN PEJABAT PENILAI */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Atasan Pejabat Penilai</h3>
              <p className="text-[11px] text-slate-500">
                {data.role === 'kepala_sekolah' ? 'Sekretaris Daerah (Sekda)' : 'Kepala Dinas Pendidikan'}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Atasan Penilai</label>
              <input
                type="text"
                id="input-atasan-nama"
                value={data.atasanPenilai.nama}
                onChange={(e) => handleAtasanChange('nama', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">NIP</label>
              <input
                type="text"
                id="input-atasan-nip"
                value={data.atasanPenilai.nip}
                onChange={(e) => handleAtasanChange('nip', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Pangkat / Golongan</label>
              <input
                type="text"
                id="input-atasan-pangkat"
                value={data.atasanPenilai.pangkatGol}
                onChange={(e) => handleAtasanChange('pangkatGol', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Jabatan</label>
              <input
                type="text"
                id="input-atasan-jabatan"
                value={data.atasanPenilai.jabatan}
                onChange={(e) => handleAtasanChange('jabatan', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Unit Kerja / Instansi</label>
              <input
                type="text"
                id="input-atasan-unit"
                value={data.atasanPenilai.unitKerja}
                onChange={(e) => handleAtasanChange('unitKerja', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* TEMPAT UPLOAD LOGO SEKOLAH & GARUDA */}
      <LogoUploader
        currentLogoUrl={data.customLogoUrl}
        currentGarudaLogoUrl={data.customGarudaLogoUrl}
        onLogoChange={(logoUrl) => onUpdate({ customLogoUrl: logoUrl })}
        onGarudaLogoChange={(logoUrl) => onUpdate({ customGarudaLogoUrl: logoUrl })}
        title="Pusat Pengaturan Logo: Logo Sekolah & Logo Garuda"
        description="Kelola Logo Sekolah untuk Halaman Sampul (Cover Depan) dan Logo Garuda Pancasila untuk Lembar Evaluasi & Matriks Kualitatif."
      />

      {/* Periode Penilaian & Tanggal Dokumen */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          Periode Penilaian & Penanggalan Dokumen
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Jenis Periode Penilaian</label>
            <select
              id="select-periode-jenis"
              value={data.periode.periodeJenis}
              onChange={(e) => handlePeriodeChange('periodeJenis', e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="Tahunan / Akhir">Tahunan / Akhir (1 Tahun Penuh)</option>
              <option value="Triwulan I">Triwulan I (Januari - Maret)</option>
              <option value="Triwulan II">Triwulan II (April - Juni)</option>
              <option value="Triwulan III">Triwulan III (Juli - September)</option>
              <option value="Triwulan IV">Triwulan IV (Oktober - Desember)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Rentang Waktu Evaluasi</label>
            <input
              type="text"
              id="input-periode-rentang"
              value={data.periode.rentangWaktu}
              onChange={(e) => handlePeriodeChange('rentangWaktu', e.target.value)}
              placeholder="Contoh: 01 JANUARI SD 31 DESEMBER TAHUN 2024"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Tahun Anggaran</label>
            <input
              type="text"
              id="input-periode-tahun"
              value={data.periode.tahun}
              onChange={(e) => handlePeriodeChange('tahun', e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Tempat Penetapan</label>
            <div className="relative">
              <input
                type="text"
                id="input-periode-tempat"
                value={data.periode.tempat}
                onChange={(e) => handlePeriodeChange('tempat', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Tanggal Penetapan SKP Awal</label>
            <input
              type="text"
              id="input-periode-tgl-skp"
              value={data.periode.tanggalSKP}
              onChange={(e) => handlePeriodeChange('tanggalSKP', e.target.value)}
              placeholder="Contoh: 03 Januari 2024"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Tanggal Lembar Evaluasi Akhir</label>
            <input
              type="text"
              id="input-periode-tgl-eval"
              value={data.periode.tanggalEvaluasi}
              onChange={(e) => handlePeriodeChange('tanggalEvaluasi', e.target.value)}
              placeholder="Contoh: 31 Desember 2024"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
