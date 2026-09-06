import React from 'react';
import { 
  BarChart3, 
  BookOpen, 
  FileCheck2, 
  FileSpreadsheet, 
  HeartHandshake, 
  Layers, 
  Printer, 
  Users 
} from 'lucide-react';
import { TabType } from '../types';

export type TabId = TabType;

interface NavigationTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  itemsCount?: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  itemsCount,
}) => {
  const tabs = [
    {
      id: 'dashboard' as TabId,
      label: 'Dashboard & Kuadran',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'cover' as TabId,
      label: 'Cover Depan SKP',
      icon: BookOpen,
      badge: 'Resmi BKN',
    },
    {
      id: 'profil' as TabId,
      label: 'Profil & Pejabat',
      icon: Users,
      badge: null,
    },
    {
      id: 'rencana' as TabId,
      label: 'Rencana SKP',
      icon: FileSpreadsheet,
      badge: itemsCount,
    },
    {
      id: 'evaluasi' as TabId,
      label: 'Evaluasi & Bukti',
      icon: FileCheck2,
      badge: 'Emoji BKN',
    },
    {
      id: 'perilaku' as TabId,
      label: 'Perilaku BerAKHLAK',
      icon: HeartHandshake,
      badge: '7 Nilai',
    },
    {
      id: 'lampiran' as TabId,
      label: 'Lampiran SKP',
      icon: Layers,
      badge: null,
    },
    {
      id: 'cetak' as TabId,
      label: 'Dokumen Cetak / PDF',
      icon: Printer,
      badge: 'Siap Cetak',
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex space-x-1 overflow-x-auto no-scrollbar py-2" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                id={`tab-btn-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`group flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span>{tab.label}</span>
                {tab.badge !== null && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                      isActive
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
