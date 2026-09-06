import { CapaianOrganisasiType, PredikatKinerjaType, RatingType, RoleType, SKPData } from '../types';
import { defaultGuruSKP, defaultKepsekSKP } from '../data/defaultTemplates';

/**
 * Matriks 3x3 Kuadran Penilaian Kinerja Pegawai
 * PermenPAN-RB No. 6 Tahun 2022 / BKN
 *
 * Sumbu Y: Hasil Kerja (Di Atas, Sesuai, Di Bawah)
 * Sumbu X: Perilaku Kerja (Di Bawah, Sesuai, Di Atas)
 */
export function calculatePredikatKinerja(
  hasilKerja: RatingType,
  perilakuKerja: RatingType
): PredikatKinerjaType {
  if (hasilKerja === 'Di Atas Ekspektasi') {
    if (perilakuKerja === 'Di Atas Ekspektasi') return 'Sangat Baik';
    if (perilakuKerja === 'Sesuai Ekspektasi') return 'Baik';
    return 'Kurang/Misconduct';
  } else if (hasilKerja === 'Sesuai Ekspektasi') {
    if (perilakuKerja === 'Di Atas Ekspektasi') return 'Baik';
    if (perilakuKerja === 'Sesuai Ekspektasi') return 'Baik';
    return 'Kurang/Misconduct';
  } else {
    // Di Bawah Ekspektasi
    if (perilakuKerja === 'Di Atas Ekspektasi') return 'Butuh Perbaikan';
    if (perilakuKerja === 'Sesuai Ekspektasi') return 'Butuh Perbaikan';
    return 'Sangat Kurang';
  }
}

/**
 * Pola Distribusi Predikat Kinerja Pegawai berdasarkan Capaian Organisasi
 * Dari tabel referensi PermenPAN-RB No. 6 Tahun 2022 di file Excel
 */
export interface DistribusiPoint {
  kategori: string;
  pola: number;
  deskripsi: string;
}

export const POLA_DISTRIBUSI_DATA: Record<CapaianOrganisasiType, DistribusiPoint[]> = {
  Istimewa: [
    { kategori: 'Sangat Kurang', pola: 0, deskripsi: 'Maksimal 0%' },
    { kategori: 'Kurang/Misconduct', pola: 1, deskripsi: 'Maksimal 5%' },
    { kategori: 'Butuh Perbaikan', pola: 3, deskripsi: 'Sekitar 10%' },
    { kategori: 'Baik', pola: 7, deskripsi: 'Sekitar 30%' },
    { kategori: 'Sangat Baik', pola: 13, deskripsi: 'Dominan (55-60%)' },
  ],
  Baik: [
    { kategori: 'Sangat Kurang', pola: 2, deskripsi: 'Maksimal 5%' },
    { kategori: 'Kurang/Misconduct', pola: 3, deskripsi: 'Maksimal 10%' },
    { kategori: 'Butuh Perbaikan', pola: 6, deskripsi: 'Sekitar 25%' },
    { kategori: 'Baik', pola: 11, deskripsi: 'Dominan (45-50%)' },
    { kategori: 'Sangat Baik', pola: 2, deskripsi: 'Maksimal 10%' },
  ],
  'Butuh Perbaikan': [
    { kategori: 'Sangat Kurang', pola: 3, deskripsi: 'Maksimal 10%' },
    { kategori: 'Kurang/Misconduct', pola: 4, deskripsi: 'Sekitar 15%' },
    { kategori: 'Butuh Perbaikan', pola: 10, deskripsi: 'Dominan (45%)' },
    { kategori: 'Baik', pola: 4, deskripsi: 'Sekitar 15%' },
    { kategori: 'Sangat Baik', pola: 3, deskripsi: 'Maksimal 10%' },
  ],
  'Kurang/Misconduct': [
    { kategori: 'Sangat Kurang', pola: 2, deskripsi: 'Sekitar 10%' },
    { kategori: 'Kurang/Misconduct', pola: 11, deskripsi: 'Dominan (50%)' },
    { kategori: 'Butuh Perbaikan', pola: 6, deskripsi: 'Sekitar 25%' },
    { kategori: 'Baik', pola: 3, deskripsi: 'Sekitar 10%' },
    { kategori: 'Sangat Baik', pola: 2, deskripsi: 'Maksimal 5%' },
  ],
  'Sangat Kurang': [
    { kategori: 'Sangat Kurang', pola: 13, deskripsi: 'Dominan (55-60%)' },
    { kategori: 'Kurang/Misconduct', pola: 7, deskripsi: 'Sekitar 30%' },
    { kategori: 'Butuh Perbaikan', pola: 3, deskripsi: 'Sekitar 10%' },
    { kategori: 'Baik', pola: 1, deskripsi: 'Maksimal 5%' },
    { kategori: 'Sangat Baik', pola: 0, deskripsi: 'Maksimal 0%' },
  ],
};

const STORAGE_KEY_PREFIX = 'skp_smpn7_sentani_';

export function saveSKPToStorage(data: SKPData) {
  try {
    const key = `${STORAGE_KEY_PREFIX}${data.role}`;
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn('Gagal menyimpan ke localStorage:', err);
  }
}

export function saveSKPData(role: RoleType, data: SKPData) {
  saveSKPToStorage(data);
}

export function loadSKPFromStorage(role: RoleType): SKPData | null {
  try {
    const key = `${STORAGE_KEY_PREFIX}${role}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Gagal memuat dari localStorage:', err);
    return null;
  }
}

export function loadSKPData(role: RoleType): SKPData {
  const saved = loadSKPFromStorage(role);
  if (
    saved &&
    typeof saved === 'object' &&
    saved.periode &&
    saved.periode.tahun &&
    saved.pegawai &&
    saved.penilai &&
    Array.isArray(saved.items) &&
    saved.items.length > 0
  ) {
    return saved;
  }
  const defaultData = role === 'kepala_sekolah' ? { ...defaultKepsekSKP } : { ...defaultGuruSKP };
  saveSKPToStorage(defaultData);
  return defaultData;
}

export function resetSKPDataToDefault(role: RoleType): SKPData {
  const defaultData = role === 'kepala_sekolah' ? { ...defaultKepsekSKP } : { ...defaultGuruSKP };
  saveSKPToStorage(defaultData);
  return defaultData;
}

export function exportSKPToCSV(data: SKPData): string {
  const headers = [
    'No',
    'Kategori',
    'Rencana Hasil Kerja Pimpinan',
    'Rencana Hasil Kerja Pegawai',
    'Aspek',
    'Indikator Kinerja Individu (IKI)',
    'Target',
    'Realisasi Berdasarkan Bukti Dukung',
    'Bukti Dukung',
    'Umpan Balik Berkelanjutan',
  ];

  const rows = data.items.map((item, idx) => [
    idx + 1,
    item.kategori,
    `"${(item.rhkPimpinan || '').replace(/"/g, '""')}"`,
    `"${(item.rencanaKinerja || '').replace(/"/g, '""')}"`,
    item.aspek,
    `"${(item.iki || '').replace(/"/g, '""')}"`,
    `"${(item.target || '').replace(/"/g, '""')}"`,
    `"${(item.realisasi || '').replace(/"/g, '""')}"`,
    `"${(item.buktiDukung || '').replace(/"/g, '""')}"`,
    `"${(item.umpanBalik || '').replace(/"/g, '""')}"`,
  ]);

  return '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
}

export function exportSKPAsJSON(data: SKPData) {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  const filename = `SKP_${data.role === 'kepala_sekolah' ? 'Kepala_Sekolah' : 'Guru'}_${data.pegawai.nama.replace(/[^a-zA-Z0-9]/g, '_')}_${data.periode.tahun}.json`;
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportSKPAsCSV(data: SKPData) {
  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(exportSKPToCSV(data));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', csvContent);
  const filename = `SKP_Evaluasi_${data.role}_${data.periode.tahun}.csv`;
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
