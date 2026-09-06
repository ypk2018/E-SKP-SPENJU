// Utility for BKN Emoji Coordination & Synchronization
// PermenPAN-RB No. 6 Tahun 2022

export interface BknEmojiMeta {
  emoji: string;
  code: string;
  label: string;
  desc: string;
  category: 'primary' | 'appreciation' | 'achievement' | 'progress' | 'attention';
  defaultText: string;
}

export const BKN_EMOJIS: BknEmojiMeta[] = [
  {
    emoji: '🙂',
    code: 'senyum_bkn',
    label: 'Senyum Resmi BKN',
    desc: 'Format baku khas Excel BKN untuk kinerja terlaksana tertib dan baik',
    category: 'primary',
    defaultText: 'Pimpinan : Sudah baik, dapat ditingkatkan, sesuai bukti yang diterima 🙂',
  },
  {
    emoji: '👍',
    code: 'jempol_sesuai',
    label: 'Sesuai Ekspektasi',
    desc: 'Bukti fisik lengkap, target dan kualitas sesuai standar yang ditetapkan',
    category: 'primary',
    defaultText: 'Pimpinan : Sangat Baik, dapat dipertahankan, sesuai bukti fisik yang diterima 👍',
  },
  {
    emoji: '👏',
    code: 'apresiasi_waktu',
    label: 'Apresiasi & Waktu',
    desc: 'Penyelesaian tepat waktu, disiplin dan komitmen pelaksanaan tinggi',
    category: 'appreciation',
    defaultText: 'Pimpinan : Sangat Baik, dapat dipertahankan, sesuai dengan target waktu 👏',
  },
  {
    emoji: '🎯',
    code: 'target_tercapai',
    label: 'Target 100% Tuntas',
    desc: 'Realisasi kuantitas & kualitas tuntas 100% sesuai indikator',
    category: 'achievement',
    defaultText: 'Pimpinan : Target tercapai 100% secara optimal dan akuntabel 🎯',
  },
  {
    emoji: '🌟',
    code: 'istimewa_bintang',
    label: 'Melampaui Ekspektasi',
    desc: 'Kinerja istimewa, berdampak tinggi dan menjadi contoh teladan',
    category: 'achievement',
    defaultText: 'Pimpinan : Luar biasa, melampaui ekspektasi dan berdampak nyata bagi sekolah 🌟',
  },
  {
    emoji: '📈',
    code: 'progres_meningkat',
    label: 'Progres Signifikan',
    desc: 'Menunjukkan tren peningkatan kualitas proses dan hasil pembelajaran',
    category: 'progress',
    defaultText: 'Pimpinan : Terjadi peningkatan progres kerja yang signifikan, lanjutkan 📈',
  },
  {
    emoji: '💡',
    code: 'inovatif_kreatif',
    label: 'Inovasi & Kreativitas',
    desc: 'Inisiatif baru dan terobosan kreatif dalam proses kerja',
    category: 'appreciation',
    defaultText: 'Pimpinan : Pendekatan sangat kreatif dan inovatif sesuai Kurikulum Merdeka 💡',
  },
  {
    emoji: '🤝',
    code: 'kolaboratif_sinergi',
    label: 'Sinergi & Kolaborasi',
    desc: 'Kerja sama tim solid dan keharmonisan lingkungan kerja SMPN 7 Sentani',
    category: 'primary',
    defaultText: 'Pimpinan : Kolaborasi tim dan sinergi bersama rekan sejawat terjalin sangat baik 🤝',
  },
  {
    emoji: '⚠️',
    code: 'perlu_pembinaan',
    label: 'Perlu Kelengkapan',
    desc: 'Memerlukan percepatan realisasi atau penambahan bukti dukung fisik',
    category: 'attention',
    defaultText: 'Pimpinan : Perlu percepatan dan kelengkapan bukti dukung pada periode berikutnya ⚠️',
  },
];

// Extract active BKN emoji from text, defaults to '🙂'
export function extractActiveEmoji(text?: string): string {
  if (!text) return '🙂';
  for (const item of BKN_EMOJIS) {
    if (text.includes(item.emoji)) {
      return item.emoji;
    }
  }
  return '🙂';
}

// Check if string contains any BKN emoji
export function hasBknEmoji(text?: string): boolean {
  if (!text) return false;
  return BKN_EMOJIS.some((e) => text.includes(e.emoji));
}

// Dynamically coordinate / recommend an emoji based on realisasi and target inputs
export function coordinateEmojiFromInput(
  realisasi: string = '',
  target: string = '',
  aspek: string = ''
): BknEmojiMeta {
  const rLower = realisasi.toLowerCase();
  const tLower = target.toLowerCase();

  // Attention / deficiency indicators
  if (
    rLower.includes('belum') || 
    rLower.includes('kurang') || 
    rLower.includes('kendala') || 
    rLower.includes('terlambat') ||
    (rLower.includes('%') && parseInt(rLower, 10) < 75)
  ) {
    return BKN_EMOJIS.find((e) => e.emoji === '⚠️') || BKN_EMOJIS[0];
  }

  // Time / speed appreciation
  if (
    aspek.toLowerCase() === 'waktu' || 
    rLower.includes('tepat waktu') || 
    rLower.includes('sesuai target waktu') ||
    (tLower.includes('bulan') && rLower.includes('bulan'))
  ) {
    return BKN_EMOJIS.find((e) => e.emoji === '👏') || BKN_EMOJIS[2];
  }

  // Target 100% or optimal achievement
  if (
    rLower.includes('100%') || 
    rLower.includes('tuntas') || 
    rLower.includes('lengkap') ||
    (tLower.includes('dokumen') && rLower.includes('dokumen')) ||
    (tLower.includes('laporan') && rLower.includes('laporan')) ||
    (tLower.includes('kegiatan') && rLower.includes('kegiatan'))
  ) {
    return BKN_EMOJIS.find((e) => e.emoji === '🎯') || BKN_EMOJIS[3];
  }

  // Outstanding / beyond expectations
  if (
    rLower.includes('melampaui') || 
    rLower.includes('istimewa') || 
    rLower.includes('sangat baik')
  ) {
    return BKN_EMOJIS.find((e) => e.emoji === '🌟') || BKN_EMOJIS[4];
  }

  // Default: Signature BKN smile
  return BKN_EMOJIS[0]; // 🙂
}

// Synchronously replace or append linked emoji in text
export function linkEmojiToFeedback(existingText: string = '', newEmoji: string): string {
  let text = existingText.trim();

  // If text is empty, generate standard feedback with new emoji
  if (!text) {
    const meta = BKN_EMOJIS.find((e) => e.emoji === newEmoji);
    return meta ? meta.defaultText : `Pimpinan : Sudah baik, sesuai bukti yang diterima ${newEmoji}`;
  }

  // Remove existing emojis from text
  for (const item of BKN_EMOJIS) {
    text = text.split(item.emoji).join('').trim();
  }

  // Return text cleanly appended with the new linked emoji
  return `${text} ${newEmoji}`;
}

// Ensure every single item has at least one active BKN emoji
export function ensureBknEmojiInFeedback(feedback?: string): string {
  if (!feedback || feedback.trim() === '') {
    return 'Pimpinan : Sudah baik, dapat dipertahankan, sesuai bukti yang diterima 🙂';
  }
  if (!hasBknEmoji(feedback)) {
    return `${feedback.trim()} 🙂`;
  }
  return feedback;
}
