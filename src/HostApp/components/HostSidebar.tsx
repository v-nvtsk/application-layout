import React from 'react';
import {
  AccountsStrokePrdIcon20,
  CashtransitStrokePrdIcon20,
  SettingsStrokeSrvIcon24,
} from '@sberbusiness/icons-next';
import type { TabId } from '../types';

interface HostSidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const HostSidebar: React.FC<HostSidebarProps> = ({ activeTab, onTabChange }) => (
  <aside className="host-sidebar">
    <nav className="host-nav">
      <button
        className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
        onClick={() => onTabChange("dashboard")}
      >
        <AccountsStrokePrdIcon20 paletteIndex={0} />
        <span>Главная</span>
      </button>
      <button
        className={`nav-item ${activeTab === "payments" ? "active" : ""}`}
        onClick={() => onTabChange("payments")}
      >
        <CashtransitStrokePrdIcon20 paletteIndex={0} />
        <span>Платежи</span>
      </button>
      <button
        className={`nav-item ${activeTab === "table-example" ? "active" : ""}`}
        onClick={() => onTabChange("table-example")}
      >
        <AccountsStrokePrdIcon20 paletteIndex={0} />
        <span>Таблица (Адаптив)</span>
      </button>
      <button
        className={`nav-item ${activeTab === "example-prefill" ? "active" : ""}`}
        onClick={() => onTabChange("example-prefill")}
      >
        <SettingsStrokeSrvIcon24 paletteIndex={0} />
        <span>Предзаполнение (Ex)</span>
      </button>
      <button
        className={`nav-item ${activeTab === "example-detail" ? "active" : ""}`}
        onClick={() => onTabChange("example-detail")}
      >
        <SettingsStrokeSrvIcon24 paletteIndex={0} />
        <span>Настройки (Example)</span>
      </button>
      <div className="nav-divider" />
      <button
        className={`nav-item ${activeTab === "template-prefill" ? "active" : ""}`}
        onClick={() => onTabChange("template-prefill")}
      >
        <SettingsStrokeSrvIcon24 paletteIndex={0} className="nav-icon-template" />
        <span>Шаблон (Prefill)</span>
      </button>
      <button
        className={`nav-item ${activeTab === "template-detail" ? "active" : ""}`}
        onClick={() => onTabChange("template-detail")}
      >
        <SettingsStrokeSrvIcon24 paletteIndex={0} className="nav-icon-template" />
        <span>Шаблон (Detail)</span>
      </button>
      <button
        className={`nav-item ${activeTab === "raw-prefill" ? "active" : ""}`}
        onClick={() => onTabChange("raw-prefill")}
      >
        <SettingsStrokeSrvIcon24 paletteIndex={0} className="nav-icon-raw" />
        <span>RAW Prefill</span>
      </button>
      <button
        className={`nav-item ${activeTab === "raw-detail" ? "active" : ""}`}
        onClick={() => onTabChange("raw-detail")}
      >
        <SettingsStrokeSrvIcon24 paletteIndex={0} className="nav-icon-raw" />
        <span>RAW Detail</span>
      </button>
    </nav>
  </aside>
);
