import React, { useState } from 'react';
import { 
  Bot, 
  Check, 
  Copy, 
  Loader2, 
  Send, 
  Sparkles, 
  X 
} from 'lucide-react';
import { RoleType } from '../types';

interface AIAssistantModalProps {
  role: RoleType;
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
  initialContext?: string;
  onApplyText?: (text: string) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  role,
  isOpen,
  onClose,
  initialType = 'rhk',
  initialContext = '',
  onApplyText,
}) => {
  const [requestType, setRequestType] = useState<string>(initialType);
  const [context, setContext] = useState<string>(initialContext);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          type: requestType,
          context: context || undefined,
        }),
      });

      const data = await response.json();
      if (data.suggestion) {
        setResult(data.suggestion);
      } else {
        setResult('Gagal mendapatkan saran dari asisten AI. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error fetching AI suggestion:', error);
      setResult('Terjadi kesalahan koneksi server. Menggunakan saran standar untuk SMP Negeri 7 Sentani.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Asisten AI SKP SMP Negeri 7 Sentani</h3>
              <p className="text-[11px] text-blue-100">
                Penyusunan RHK, IKI, Ekspektasi & Umpan Balik BerAKHLAK
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Pilih Kebutuhan Bantuan AI:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRequestType('rhk')}
                className={`p-2 rounded-xl text-left border font-semibold transition-all ${
                  requestType === 'rhk'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                1. RHK & IKI
              </button>
              <button
                type="button"
                onClick={() => setRequestType('feedback')}
                className={`p-2 rounded-xl text-left border font-semibold transition-all ${
                  requestType === 'feedback'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                2. Umpan Balik
              </button>
              <button
                type="button"
                onClick={() => setRequestType('perilaku')}
                className={`p-2 rounded-xl text-left border font-semibold transition-all ${
                  requestType === 'perilaku'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                3. Ekspektasi
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Topik / Konteks Khusus (Opsional):
            </label>
            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Contoh: Kurikulum Merdeka, PBD Rapor Pendidikan, Pembina Pramuka..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              id="btn-generate-ai-action"
              disabled={loading}
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold shadow-md cursor-pointer transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sedang merumuskan saran SKP...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Dapatkan Saran Rekomendasi AI</span>
                </>
              )}
            </button>
          </div>

          {/* Results Display */}
          {result && (
            <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-slate-500">
                <span className="font-bold text-[11px] text-slate-700 flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5 text-blue-600" />
                  Rekomendasi Terstruktur:
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-700 hover:bg-slate-100 font-semibold text-[10px]"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Tersalin' : 'Salin'}</span>
                  </button>
                  {onApplyText && (
                    <button
                      type="button"
                      onClick={() => {
                        onApplyText(result);
                        onClose();
                      }}
                      className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold text-[10px]"
                    >
                      Terapkan
                    </button>
                  )}
                </div>
              </div>

              <div className="text-slate-800 leading-relaxed max-h-56 overflow-y-auto whitespace-pre-line font-medium pr-1">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
