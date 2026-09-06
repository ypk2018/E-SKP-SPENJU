export type RoleType = 'kepala_sekolah' | 'guru';

export type TabType = 'dashboard' | 'cover' | 'profil' | 'rencana' | 'evaluasi' | 'perilaku' | 'lampiran' | 'cetak';

export type AspekType = 'Kuantitas' | 'Kualitas' | 'Waktu' | 'Biaya';

export type RatingType = 'Di Atas Ekspektasi' | 'Sesuai Ekspektasi' | 'Di Bawah Ekspektasi';

export type CapaianOrganisasiType = 
  | 'Istimewa' 
  | 'Baik' 
  | 'Butuh Perbaikan' 
  | 'Kurang/Misconduct' 
  | 'Sangat Kurang';

export type PredikatKinerjaType = 
  | 'Sangat Baik' 
  | 'Baik' 
  | 'Butuh Perbaikan' 
  | 'Kurang/Misconduct' 
  | 'Sangat Kurang';

export interface PegawaiProfile {
  nama: string;
  nip: string;
  pangkatGol: string;
  jabatan: string;
  unitKerja: string;
}

export interface PejabatPenilaiProfile {
  nama: string;
  nip: string;
  pangkatGol: string;
  jabatan: string;
  unitKerja: string;
}

export interface AtasanPenilaiProfile {
  nama: string;
  nip: string;
  pangkatGol: string;
  jabatan: string;
  unitKerja: string;
}

export interface PeriodeInfo {
  periodeJenis: 'Triwulan I' | 'Triwulan II' | 'Triwulan III' | 'Triwulan IV' | 'Tahunan / Akhir';
  rentangWaktu: string; // e.g. "01 Januari s.d 31 Desember 2024"
  tahun: string;
  tempat: string;
  tanggalSKP: string; // e.g. "03 Januari 2024"
  tanggalEvaluasi: string; // e.g. "31 Desember 2024"
}

export interface RencanaHasilKerjaItem {
  id: string;
  kategori: 'UTAMA' | 'TAMBAHAN';
  rhkPimpinan: string; // Rencana Hasil Kerja Pimpinan / Atasan yang Diintervensi
  rencanaKinerja: string; // Rencana Hasil Kerja Pegawai
  aspek: AspekType;
  iki: string; // Indikator Kinerja Individu
  target: string; // e.g. "1 Dokumen", "100%", "12 Bulan"
  realisasi: string; // e.g. "1 Dokumen sesuai bukti fisik"
  buktiDukung: string; // e.g. "Laporan Kegiatan, Link Google Drive, Sertifikat"
  umpanBalik: string; // Umpan Balik Berkelanjutan dari Pimpinan
  ratingAspek?: RatingType;
}

export interface PerilakuBerakhlakItem {
  id: number;
  nama: string;
  coreValue: 'Berorientasi Pelayanan' | 'Akuntabel' | 'Kompeten' | 'Harmonis' | 'Loyal' | 'Adaptif' | 'Kolaboratif';
  panduanPerilaku: string[];
  ekspektasiKhusus: string;
  umpanBalik: string;
}

export interface LampiranSKP {
  dukunganSumberDaya: string[];
  skemaPertanggungjawaban: string[];
  konsekuensi: string[];
}

export interface SKPData {
  role: RoleType;
  pegawai: PegawaiProfile;
  penilai: PejabatPenilaiProfile;
  atasanPenilai: AtasanPenilaiProfile;
  periode: PeriodeInfo;
  capaianOrganisasi: CapaianOrganisasiType;
  ratingHasilKerja: RatingType;
  ratingPerilakuKerja: RatingType;
  predikatKinerja: PredikatKinerjaType;
  catatanRekomendasi: string;
  items: RencanaHasilKerjaItem[];
  perilaku: PerilakuBerakhlakItem[];
  lampiran: LampiranSKP;
  customLogoUrl?: string; // Base64 data URL or custom logo for Sekolah / Kop and Cover
  customGarudaLogoUrl?: string; // Base64 data URL or custom logo Garuda for Lembar Evaluasi & Matriks
}
