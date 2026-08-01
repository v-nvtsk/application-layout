import { useRef } from "react";

import { ETriplexNextTheme, ThemeProvider } from "@sberbusiness/triplex-next";

import { ModuleDetail } from "./components/ModuleDetail";

export interface ModuleTemplateDetailProps {
  onClose?: () => void;
}

export function ModuleTemplateDetail({
  onClose,
}: ModuleTemplateDetailProps = {}) {
  const appRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={appRef}>
      <ThemeProvider scopeRef={appRef} theme={ETriplexNextTheme.LIGHT}>
        <ModuleDetail onClose={onClose} />
      </ThemeProvider>
    </div>
  );
}
