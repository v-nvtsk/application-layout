import { useRef, useState } from "react";

import { ETriplexNextTheme, ThemeProvider } from "@sberbusiness/triplex-next";

import { makeHandleClose } from "../../shared/utils/makeHandleClose";
import { ModulePrefill } from "./components/ModulePrefill";

export interface ModuleTemplatePrefillProps {
  initialOpen?: boolean;
  onClose?: () => void;
}

export function ModuleTemplatePrefill({
  initialOpen = true,
  onClose,
}: ModuleTemplatePrefillProps = {}) {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(initialOpen);
  const appRef = useRef<HTMLDivElement>(null);
  const handleClose = makeHandleClose(setIsLightBoxOpen, onClose);

  return (
    <div ref={appRef}>
      <ThemeProvider scopeRef={appRef} theme={ETriplexNextTheme.LIGHT}>
        <ModulePrefill
          isOpen={isLightBoxOpen}
          onClose={handleClose}
          onSave={handleClose}
        />
      </ThemeProvider>
    </div>
  );
}
