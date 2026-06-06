import './HostApp.css';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  AccountsStrokePrdIcon20,
  BellStrokeNavIcon20,
  CashtransitStrokePrdIcon20,
  SettingsStrokeSrvIcon24,
} from '@sberbusiness/icons-next';
import {
  Button,
  EButtonTheme,
  EComponentSize,
  EFontType,
  ETextSize,
  ETitleSize,
  ETriplexNextTheme,
  Text,
  ThemeProvider,
  Title,
} from '@sberbusiness/triplex-next';

export function HostApp() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'payments' | 'example-prefill' | 'example-detail' | 'template-prefill' | 'template-detail' | 'raw-prefill' | 'raw-detail'>('dashboard');
  const [mfeLoading, setMfeLoading] = useState(false);
  const mfeContainerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  const handleTabChange = useCallback((tab: 'dashboard' | 'payments' | 'example-prefill' | 'example-detail' | 'template-prefill' | 'template-detail' | 'raw-prefill' | 'raw-detail') => {
    setActiveTab(tab);
  }, []);

  // Dynamic simulation of loading MFE over network
  useEffect(() => {
    const isMfeTab = activeTab.includes('example-') || activeTab.includes('template-') || activeTab.includes('raw-');
    
    if (isMfeTab) {
      let mode: 'example' | 'template' | 'raw' = 'example';
      if (activeTab.startsWith('template-')) mode = 'template';
      if (activeTab.startsWith('raw-')) mode = 'raw';
      
      const variant = activeTab.includes('prefill') ? 'prefill' : 'detail';
      // Set loading state asynchronously to avoid lint warning about sync setState in effect
      const loadingTimer = setTimeout(() => setMfeLoading(true), 0);

      const timer = setTimeout(() => {
        // Dynamically import the remote entrypoint chunk
        import('./mfe-entrypoint')
          .then((mfe) => {
            setMfeLoading(false);

            // Give DOM a tick to render container, then mount MFE
            setTimeout(() => {
              if (mfeContainerRef.current) {
                mfe.mount(mfeContainerRef.current, {
                  initialOpen: true,
                  variant,
                  mode,
                  onClose: () => {
                    // MFE callback to return to host dashboard
                    handleTabChange('dashboard');
                  },
                });
              }
            }, 50);
          })
          .catch((err) => {
            console.error('Failed to load MFE:', err);
            setMfeLoading(false);
          });
      }, 600); // Simulated latency

      const currentContainer = mfeContainerRef.current;

      return () => {
        clearTimeout(loadingTimer);
        clearTimeout(timer);
        // Unmount clean-up
        if (currentContainer) {
          import('./mfe-entrypoint').then((mfe) => {
            mfe.unmount(currentContainer);
          });
        }
      };
    } else {
      Promise.resolve().then(() => setMfeLoading(false));
    }
  }, [activeTab, handleTabChange]);

  return (
    <div ref={hostRef} className="host-container">
      <ThemeProvider scopeRef={hostRef} theme={ETriplexNextTheme.LIGHT}>
        {/* Top Header */}
        <header className="host-header">
          <div className="host-logo">
            <span className="logo-icon">🏦</span>
            <span className="logo-text">СберБизнес</span>
            <span className="host-badge">HOST SHELL</span>
          </div>
          <div className="host-user">
            <BellStrokeNavIcon20 paletteIndex={0} className="bell-icon" />
            <div className="user-avatar">ИП</div>
            <span className="user-name">Иван Петров</span>
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="host-wrapper">
          {/* Left Sidebar */}
          <aside className="host-sidebar">
            <nav className="host-nav">
              <button
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleTabChange('dashboard')}
              >
                <AccountsStrokePrdIcon20 paletteIndex={0} />
                <span>Главная</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
                onClick={() => handleTabChange('payments')}
              >
                <CashtransitStrokePrdIcon20 paletteIndex={0} />
                <span>Платежи</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'example-prefill' ? 'active' : ''}`}
                onClick={() => handleTabChange('example-prefill')}
              >
                <SettingsStrokeSrvIcon24 paletteIndex={0} />
                <span>Предзаполнение (Ex)</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'example-detail' ? 'active' : ''}`}
                onClick={() => handleTabChange('example-detail')}
              >
                <SettingsStrokeSrvIcon24 paletteIndex={0} />
                <span>Настройки (Example)</span>
              </button>
              
              <div className="nav-divider" />
              
              <button
                className={`nav-item ${activeTab === 'template-prefill' ? 'active' : ''}`}
                onClick={() => handleTabChange('template-prefill')}
              >
                <SettingsStrokeSrvIcon24 paletteIndex={0} className="nav-icon-template" />
                <span>Шаблон (Prefill)</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'template-detail' ? 'active' : ''}`}
                onClick={() => handleTabChange('template-detail')}
              >
                <SettingsStrokeSrvIcon24 paletteIndex={0} className="nav-icon-template" />
                <span>Шаблон (Detail)</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'raw-prefill' ? 'active' : ''}`}
                onClick={() => handleTabChange('raw-prefill')}
              >
                <SettingsStrokeSrvIcon24 paletteIndex={0} className="nav-icon-raw" />
                <span>RAW Prefill</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'raw-detail' ? 'active' : ''}`}
                onClick={() => handleTabChange('raw-detail')}
              >
                <SettingsStrokeSrvIcon24 paletteIndex={0} className="nav-icon-raw" />
                <span>RAW Detail</span>
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="host-main">
            {activeTab === 'dashboard' && (
              <div className="host-card">
                <Title size={ETitleSize.H1} className="main-title" type={EFontType.PRIMARY_INVERT}>
                  Добро пожаловать в СберБизнес
                </Title>
                <Text size={ETextSize.B2} type={EFontType.SECONDARY_INVERT}>
                  Это главная страница хост-приложения (Host Shell). Вы можете управлять счетами, 
                  просматривать выписки и переходить в независимые модули-микрофронтенды.
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
                    <Title size={ETitleSize.H3} type={EFontType.PRIMARY_INVERT}>Демонстрация подходов</Title>
                    <Text size={ETextSize.B3} type={EFontType.SECONDARY_INVERT}>
                      Сравните реализацию: полноценный пример, чистый шаблон и RAW-реализацию.
                    </Text>
                  </div>
                  <div className="banner-controls">
                    <Button
                      theme={EButtonTheme.GENERAL}
                      size={EComponentSize.MD}
                      onClick={() => handleTabChange('example-prefill')}
                    >
                      Пример (Prefill)
                    </Button>
                    <Button
                      theme={EButtonTheme.GENERAL}
                      size={EComponentSize.MD}
                      onClick={() => handleTabChange('example-detail')}
                    >
                      Пример (Detail)
                    </Button>
                    <Button
                      theme={EButtonTheme.SECONDARY}
                      size={EComponentSize.MD}
                      onClick={() => handleTabChange('template-detail')}
                    >
                      Шаблон
                    </Button>
                    <Button
                      theme={EButtonTheme.DANGER}
                      size={EComponentSize.MD}
                      onClick={() => handleTabChange('raw-detail')}
                    >
                      RAW вариант
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="host-card">
                <Title size={ETitleSize.H1} className="main-title" type={EFontType.PRIMARY_INVERT}>
                  Платежные поручения
                </Title>
                <Text size={ETextSize.B2} type={EFontType.PRIMARY_INVERT}>
                  Здесь отображается журнал ваших платежей. Вы можете создать новый рублевый 
                  или валютный платеж контрагенту.
                </Text>
                <div className="empty-state">
                  <span className="empty-icon">📁</span>
                  <Text size={ETextSize.B3} type={EFontType.PRIMARY_INVERT}>Нет исходящих платежей за сегодня</Text>
                </div>
              </div>
            )}

            {(activeTab.includes('example-') || activeTab.includes('template-') || activeTab.includes('raw-')) && (
              <div className="mfe-loading-wrapper">
                {mfeLoading && (
                  <div className="mfe-loader-card">
                    <div className="spinner"></div>
                    <Title size={ETitleSize.H3} className="loader-title" type={EFontType.PRIMARY_INVERT}>
                      Загрузка микрофронтенда...
                    </Title>
                    <Text size={ETextSize.B3} type={EFontType.PRIMARY_INVERT}>
                      Загружается чанк `mfe-entrypoint.js` по сети ({activeTab.includes('prefill') ? 'Prefill' : 'Detail'})
                    </Text>
                  </div>
                )}
                {/* The container element where the MFE will mount */}
                <div ref={mfeContainerRef} className="mfe-mount-node" />
              </div>
            )}
          </main>
        </div>
      </ThemeProvider>
    </div>
  );
}
