import React from 'react';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  FileText, 
  GraduationCap, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  UserCheck
} from 'lucide-react';
import { RoleType, SKPData } from '../types';

interface NavbarProps {
  currentRole: RoleType;
  onRoleChange: (role: RoleType) => void;
  data: SKPData;
  onOpenPrint: () => void;
  onOpenAI: () => void;
  onExportJSON: () => void;
  onExportCSV: () => void;
  onResetData: () => void;
  isSaved: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  data,
  onOpenPrint,
  onOpenAI,
  onExportJSON,
  onExportCSV,
  onResetData,
  isSaved,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Banner with School Identity */}
      <div className="bg-slate-900 text-white px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-blue-600 font-semibold text-[10px] tracking-wider uppercase">
              PermenPAN-RB No. 6/2022
            </span>
            <span className="text-slate-300">
              Dinas Pendidikan Kab. Jayapura • SMP Negeri 7 Sentani
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <span>Periode: <strong className="text-white">{data?.periode?.rentangWaktu || '01 JANUARI SD 31 DESEMBER TAHUN 2024'}</strong></span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isSaved ? 'Tersimpan Otomatis' : 'Menyimpan...'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & School Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 leading-none">
                E-SKP SENTANI
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                v2.5 BKN
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              SMP Negeri 7 Sentani • Kinerja Guru & Kepala Sekolah
            </p>
          </div>
        </div>

        {/* Center: Role Switcher (Guru vs Kepala Sekolah) */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            type="button"
            id="role-switch-kepala-sekolah"
            onClick={() => onRoleChange('kepala_sekolah')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentRole === 'kepala_sekolah'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Kepala Sekolah</span>
            {currentRole === 'kepala_sekolah' && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            )}
          </button>
          <button
            type="button"
            id="role-switch-guru"
            onClick={() => onRoleChange('guru')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentRole === 'guru'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guru Mata Pelajaran</span>
            {currentRole === 'guru' && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            )}
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* AI Helper Button */}
          <button
            type="button"
            id="btn-open-ai-helper"
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs shadow-purple-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Asisten AI SKP</span>
          </button>

          {/* Export Dropdown / Buttons */}
          <div className="relative group">
            <button
              type="button"
              id="btn-export-menu"
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium border border-slate-300 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Ekspor</span>
            </button>
            <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1 hidden group-hover:block z-40">
              <button
                type="button"
                id="btn-export-json"
                onClick={onExportJSON}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Simpan File JSON</span>
              </button>
              <button
                type="button"
                id="btn-export-csv"
                onClick={onExportCSV}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ekspor Tabel (CSV)</span>
              </button>
            </div>
          </div>

          {/* Reset Template */}
          <button
            type="button"
            id="btn-reset-template"
            onClick={onResetData}
            title="Reset ke Template Bawaan Excel"
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Print to PDF Official Standard BKN */}
          <button
            type="button"
            id="btn-open-print-preview"
            onClick={onOpenPrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak SKP Resmi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
