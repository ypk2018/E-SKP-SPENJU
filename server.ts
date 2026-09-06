import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      app: 'E-SKP SMP Negeri 7 Sentani',
      timestamp: new Date().toISOString(),
    });
  });

  // AI Suggestion API (for RHK, IKI, Target, Bukti Dukung, or Pimpinan Continuous Feedback)
  app.post('/api/ai/suggest', async (req, res) => {
    try {
      const { type, role, context, currentText } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Return smart rule-based fallback if no API key is configured yet
        return res.json({
          success: true,
          isFallback: true,
          suggestions: getLocalFallbackSuggestions(type, role, context, currentText),
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      let systemPrompt = `Anda adalah konsultan ahli kepegawaian BKN dan Kementerian Pendidikan untuk Sasaran Kinerja Pegawai (SKP) berstandar PermenPAN-RB No. 6 Tahun 2022 di SMP Negeri 7 Sentani, Kabupaten Jayapura, Papua.
Berikan rekomendasi yang spesifik, formal, terukur, dan bernuansa profesional untuk ${role === 'kepala_sekolah' ? 'Kepala Sekolah SMP' : 'Guru SMP'}.
Jawab dalam format JSON array yang berisi string saran atau kalimat rekomendasi.`;

      let userPrompt = '';
      if (type === 'rhk') {
        userPrompt = `Buatkan 3 saran Rencana Hasil Kerja (RHK) ${context || 'Utama'} yang terukur untuk ${role === 'kepala_sekolah' ? 'Kepala Sekolah' : 'Guru SMP'} berstandar PermenPAN-RB No. 6 Tahun 2022. Kembalikan array JSON berisi 3 string ringkas dan jelas.`;
      } else if (type === 'feedback') {
        userPrompt = `Buatkan 3 alternatif Umpan Balik Berkelanjutan dari Pimpinan (Pejabat Penilai Kinerja) untuk kinerja berikut: "${currentText || context}". Nada pimpinan harus membangun, mengapresiasi, dan memberi motivasi positif sesuai budaya BerAKHLAK. Kembalikan array JSON berisi 3 string.`;
      } else if (type === 'iki') {
        userPrompt = `Buatkan 3 pilihan Indikator Kinerja Individu (IKI) beserta target realistis untuk RHK berikut: "${currentText || context}". Format: "Jumlah Dokumen...", "Persentase...", dsb. Kembalikan array JSON berisi 3 string.`;
      } else {
        userPrompt = `Berikan 3 rekomendasi catatan/rekomendasi akhir evaluasi kinerja bagi ${role === 'kepala_sekolah' ? 'Kepala Sekolah' : 'Guru SMP'} yang berpredikat Baik/Sangat Baik. Kembalikan array JSON berisi 3 string.`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const responseText = response.text || '[]';
      let suggestions: string[] = [];
      try {
        const parsed = JSON.parse(responseText);
        if (Array.isArray(parsed)) {
          suggestions = parsed;
        } else if (parsed.suggestions && Array.isArray(parsed.suggestions)) {
          suggestions = parsed.suggestions;
        } else {
          suggestions = Object.values(parsed).map((v) => String(v));
        }
      } catch {
        suggestions = [responseText];
      }

      res.json({
        success: true,
        isFallback: false,
        suggestions,
      });
    } catch (error: any) {
      console.error('Error generating AI suggestions:', error);
      // Graceful fallback to rule-based suggestions on any AI failure
      res.json({
        success: true,
        isFallback: true,
        suggestions: getLocalFallbackSuggestions(
          req.body.type,
          req.body.role,
          req.body.context,
          req.body.currentText
        ),
      });
    }
  });

  // Vite middleware in dev, static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server SKP SMP Negeri 7 Sentani berjalan di http://0.0.0.0:${PORT}`);
  });
}

function getLocalFallbackSuggestions(
  type: string,
  role: string,
  context?: string,
  currentText?: string
): string[] {
  if (type === 'feedback') {
    return [
      'Pimpinan: Sangat Baik, pekerjaan diselesaikan melampaui ekspektasi dan bukti dukung sangat valid. Pertahankan! 🙂',
      'Pimpinan: Sudah baik dan sesuai standar operasional yang ditetapkan, dapat ditingkatkan pada periode berikutnya 👍',
      'Pimpinan: Hasil kerja konsisten, akuntabel, dan menunjukkan komitmen tinggi terhadap kemajuan SMP Negeri 7 Sentani.',
    ];
  }

  if (type === 'iki') {
    return [
      'Jumlah Dokumen / Laporan yang disusun secara lengkap dan tervalidasi (Target: 1 Dokumen)',
      'Persentase ketercapaian program kerja sesuai standar mutu pendidikan (Target: 100%)',
      'Ketepatan waktu penyelesaian laporan pelaksanaan kegiatan (Target: 12 Bulan)',
    ];
  }

  if (role === 'kepala_sekolah') {
    return [
      'Tersusunnya Dokumen Kurikulum Operasional Satuan Pendidikan (KOSP) dan Rencana Kerja Sekolah SMP Negeri 7 Sentani.',
      'Terlaksananya Supervisi Akademik dan Klinis terhadap seluruh Pendidik dan Tenaga Kependidikan.',
      'Meningkatnya Capaian Rapor Pendidikan dan Literasi-Numerasi Sekolah Berbasis Data (PBD).',
    ];
  } else {
    return [
      'Tersusunnya Modul Ajar Berdiferensiasi dan Asesmen Autentik Kurikulum Merdeka yang kontekstual.',
      'Terlaksananya Pembelajaran Aktif yang Mendorong Nalar Kritis dan Profil Pelajar Pancasila.',
      'Terlaksananya Program Remedial, Pengayaan, dan Bimbingan Belajar Siswa Berkelanjutan.',
    ];
  }
}

startServer();
