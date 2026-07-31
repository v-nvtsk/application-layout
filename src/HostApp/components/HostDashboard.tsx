import React from 'react';
import { Title, Text, ETitleSize, EFontType, ETextSize, Button, EButtonTheme, EComponentSize } from '@sberbusiness/triplex-next';

export const HostDashboard: React.FC<{ onNavigate: (tab: TabId) => void }> = ({ onNavigate }) => (
  <div className="host-card">
    <Title size={ETitleSize.H1} className="main-title" type={EFontType.PRIMARY_INVERT}>
      Добро пожаловать в СберБизнес
    </Title>
    <Text size={ETextSize.B2} type={EFontType.SECONDARY_INVERT}>
      Это главная страница хост-приложения (Host Shell). Вы можете управлять счетами, просматривать выписки и переходить в независимые модули-микрофронтенды.
    </Text>
    <div className="stats-grid">
      <div className="stat-card">
        <span className="stat-label">Расчетный счет</span>
        <span className="stat-value">1 245 800,50 ₽</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Блокировки</span>
        <span className="stat-value text-success">Отсутствуют</span>
      </div>
    </div>
    <div className="action-banner">
      <div className="banner-content">
        <Title size={ETitleSize.H3} type={EFontType.PRIMARY_INVERT}>
          Демонстрация подходов
        </Title>
        <Text size={ETextSize.B3} type={EFontType.SECONDARY_INVERT}>
          Сравните реализацию: полноценный пример, чистый шаблон и RAW-реализацию.
        </Text>
      </div>
      <div className="banner-controls">
        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={() => { /* placeholder for navigation */ }}>
          Пример (Prefill)
        </Button>
        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={() => { /* placeholder for navigation */ }}>
          Пример (Detail)
        </Button>
        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => { /* placeholder for navigation */ }}>
          Шаблон
        </Button>
        <Button theme={EButtonTheme.DANGER} size={EComponentSize.MD} onClick={() => { /* placeholder for navigation */ }}>
          RAW вариант
        </Button>
      </div>
    </div>
  </div>
);
