import React, { useEffect, useState } from 'react';
import { 
  AlertCircle, 
  Check, 
  Download, 
  FileSpreadsheet, 
  RotateCcw, 
  Upload 
} from 'lucide-react';
import { RoleType, SKPData, TabType } from './types';
import { exportSKPToCSV, loadSKPData, resetSKPDataToDefault, saveSKPData } from './utils/skpCalculator';
import { Navbar } from './components/Navbar';
import { NavigationTabs } from './components/NavigationTabs';
import { DashboardView } from './components/DashboardView';
import { CoverDepanView } from './components/CoverDepanView';
import { ProfileSection } from './components/ProfileSection';
import { RencanaSKPView } from './components/RencanaSKPView';
import { EvaluasiKinerjaView } from './components/EvaluasiKinerjaView';
import { PerilakuBerakhlakView } from './components/PerilakuBerakhlakView';
import { LampiranView } from './components/LampiranView';
import { PrintPreviewModal } from './components/PrintPreviewModal';
import { AIAssistantModal } from './components/AIAssistantModal';

export default function App() {
  const [currentRole, setCurrentRole] = useState<RoleType>('guru');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [skpData, setSkpData] = useState<SKPData>(() => loadSKPData('guru'));
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AI Modal State
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiModalType, setAiModalType] = useState<string>('rhk');
  const [aiModalContext, setAiModalContext] = useState<string>('');

  // When role changes, load corresponding data
  const handleRoleChange = (newRole: RoleType) => {
    setCurrentRole(newRole);
    const loaded = loadSKPData(newRole);
    setSkpData(loaded);
    showToast(`Beralih ke mode ${newRole === 'kepala_sekolah' ? 'Kepala Sekolah' : 'Guru'}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Update SKP data and save
  const handleUpdateData = (partial: Partial<SKPData>) => {
    setSkpData((prev) => {
      const updated: SKPData = {
        ...prev,
        ...partial,
      };
      saveSKPData(currentRole, updated);
      return updated;
    });
  };

  // Reset to default template
  const handleResetData = () => {
    if (confirm(`Apakah Anda yakin ingin mereset seluruh data SKP ${currentRole === 'kepala_sekolah' ? 'Kepala Sekolah' : 'Guru'} ke format awal SMP Negeri 7 Sentani?`)) {
      const reset = resetSKPDataToDefault(currentRole);
      setSkpData(reset);
      showToast('Data SKP berhasil direset ke template standar BKN');
    }
  };

  // Export JSON backup
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(skpData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SKP_${currentRole.toUpperCase()}_SMPN7_SENTANI_${skpData.periode.tahun}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('File JSON backup berhasil diunduh');
  };

  // Export CSV for Excel
  const handleExportCSV = () => {
    const csvContent = exportSKPToCSV(skpData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SKP_${currentRole.toUpperCase()}_SMPN7_SENTANI_${skpData.periode.tahun}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('File CSV (Excel) berhasil diekspor');
  };

  // Open AI modal with context
  const handleOpenAI = (type = 'rhk', context = '') => {
    setAiModalType(type);
    setAiModalContext(context);
    setIsAIModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-slate-700 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header / Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        data={skpData}
        onOpenPrint={() => setActiveTab('cetak')}
        onOpenAI={() => handleOpenAI('rhk', '')}
        onExportJSON={handleExportJSON}
        onExportCSV={handleExportCSV}
        onResetData={handleResetData}
        isSaved={true}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Views */}
        <div className="transition-all duration-200">
          {activeTab === 'dashboard' && (
            <DashboardView
              data={skpData}
              onUpdate={handleUpdateData}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'cover' && (
            <CoverDepanView
              data={skpData}
              onUpdate={handleUpdateData}
              onNavigateTab={setActiveTab}
              onOpenPrint={() => setActiveTab('cetak')}
            />
          )}

          {activeTab === 'profil' && (
            <ProfileSection
              data={skpData}
              onUpdate={handleUpdateData}
            />
          )}

          {activeTab === 'rencana' && (
            <RencanaSKPView
              data={skpData}
              onUpdate={handleUpdateData}
              onOpenAI={handleOpenAI}
            />
          )}

          {activeTab === 'evaluasi' && (
            <EvaluasiKinerjaView
              data={skpData}
              onUpdate={handleUpdateData}
              onOpenAI={handleOpenAI}
            />
          )}

          {activeTab === 'perilaku' && (
            <PerilakuBerakhlakView
              data={skpData}
              onUpdate={handleUpdateData}
              onOpenAI={handleOpenAI}
            />
          )}

          {activeTab === 'lampiran' && (
            <LampiranView
              data={skpData}
              onUpdate={handleUpdateData}
            />
          )}

          {activeTab === 'cetak' && (
            <PrintPreviewModal
              data={skpData}
              isStandaloneTab={true}
            />
          )}
        </div>

        {/* Bottom Utility Bar (Hidden on print) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs no-print">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Tersimpan otomatis di peramban lokal • SMP Negeri 7 Sentani</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              id="btn-export-csv"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ekspor ke Excel (CSV)</span>
            </button>

            <button
              type="button"
              id="btn-export-json"
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Backup JSON</span>
            </button>

            <button
              type="button"
              id="btn-reset-template"
              onClick={handleResetData}
              className="flex items-center gap-1.5 px-3 py-1.5 text-rose-600 hover:bg-rose-50 font-semibold rounded-lg transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data ke Standar</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer (Hidden on print) */}
      <footer className="border-t border-slate-200/80 bg-white py-4 px-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Aplikasi E-SKP SMP Negeri 7 Sentani • Berdasarkan PermenPAN-RB No. 6 Tahun 2022
          </span>
          <span className="text-slate-400">
            Dinas Pendidikan Kabupaten Jayapura • Provinsi Papua
          </span>
        </div>
      </footer>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        role={currentRole}
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        initialType={aiModalType}
        initialContext={aiModalContext}
      />
    </div>
  );
}
