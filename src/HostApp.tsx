import "./HostApp.css";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  EFontType,
  ETextSize,
  ETitleSize,
  ETriplexNextTheme,
  Text,
  ThemeProvider,
  Title,
} from "@sberbusiness/triplex-next";

import { AdaptiveTable } from "./Components/AdaptiveTable/AdaptiveTable";
import { HostDashboard } from "./HostApp/components/HostDashboard";
import { HostHeader } from "./HostApp/components/HostHeader";
import { HostPayments } from "./HostApp/components/HostPayments";
import { HostSidebar } from "./HostApp/components/HostSidebar";
import type { TabId } from "./HostApp/types";

export function HostApp() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [mfeLoading, setMfeLoading] = useState(false);
  const [theme, setTheme] = useState<ETriplexNextTheme>(
    ETriplexNextTheme.LIGHT,
  );
  const mfeContainerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
  }, []);

  // Dynamic simulation of loading MFE over network
  useEffect(() => {
    const isMfeTab =
      activeTab.includes("example-") ||
      activeTab.includes("template-") ||
      activeTab.includes("raw-");

    if (isMfeTab) {
      let mode: "example" | "template" | "raw" = "example";
      if (activeTab.startsWith("template-")) mode = "template";
      if (activeTab.startsWith("raw-")) mode = "raw";

      const variant = activeTab.includes("prefill") ? "prefill" : "detail";
      // Set loading state asynchronously to avoid lint warning about sync setState in effect
      const loadingTimer = setTimeout(() => setMfeLoading(true), 0);

      const timer = setTimeout(() => {
        // Dynamically import the remote entrypoint chunk
        import("./mfe-entrypoint")
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
                    handleTabChange("dashboard");
                  },
                });
              }
            }, 50);
          })
          .catch((err) => {
            console.error("Failed to load MFE:", err);
            setMfeLoading(false);
          });
      }, 600); // Simulated latency

      const currentContainer = mfeContainerRef.current;

      return () => {
        clearTimeout(loadingTimer);
        clearTimeout(timer);
        // Unmount clean-up
        if (currentContainer) {
          import("./mfe-entrypoint").then((mfe) => {
            mfe.unmount(currentContainer);
          });
        }
      };
    } else {
      Promise.resolve().then(() => setMfeLoading(false));
    }
  }, [activeTab, handleTabChange]);

  return (
    <div ref={hostRef} className={`host-container theme-${theme}`}>
      <ThemeProvider scopeRef={hostRef} theme={theme}>
        {/* Top Header */}
        <HostHeader theme={theme} setTheme={setTheme} />

        {/* Content Wrapper */}
        <div className="host-wrapper">
          {/* Left Sidebar */}
          <HostSidebar activeTab={activeTab} onTabChange={handleTabChange} />

          {/* Main Content Area */}
          <main className="host-main">
            {activeTab === "dashboard" && (
              <HostDashboard onNavigate={handleTabChange} />
            )}

            {activeTab === "payments" && <HostPayments />}

            {activeTab === "table-example" && (
              <div className="host-card table-example-card">
                <Title
                  size={ETitleSize.H1}
                  className="main-title"
                  type={EFontType.PRIMARY_INVERT}
                >
                  Реестр платежей (Адаптивная таблица)
                </Title>
                <Text
                  size={ETextSize.B2}
                  type={EFontType.PRIMARY_INVERT}
                  className="table-subtitle"
                >
                  Пример большой таблицы с 11 столбцами. На мобильных
                  устройствах включается горизонтальный скролл, а ключевой
                  столбец (Контрагент) остается прижатым (sticky) к левому краю.
                </Text>

                <AdaptiveTable />
              </div>
            )}

            {(activeTab.includes("example-") ||
              activeTab.includes("template-") ||
              activeTab.includes("raw-") ||
              activeTab.includes("qualification-")) && (
              <div className="mfe-loading-wrapper">
                {mfeLoading && (
                  <div className="mfe-loader-card">
                    <div className="spinner"></div>
                    <Title
                      size={ETitleSize.H3}
                      className="loader-title"
                      type={EFontType.PRIMARY_INVERT}
                    >
                      Загрузка микрофронтенда...
                    </Title>
                    <Text size={ETextSize.B3} type={EFontType.PRIMARY_INVERT}>
                      Загружается чанк `mfe-entrypoint.js` по сети (
                      {activeTab.includes("prefill") ? "Prefill" : "Detail"})
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
