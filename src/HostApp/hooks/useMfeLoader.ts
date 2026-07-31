import {
  useEffect,
  useRef,
  useState,
} from 'react';

import type { TabId } from '../types';

export type MfeMode = 'example' | 'template' | 'raw';

/**
 * Hook that loads the selected MFE based on the active tab.
 * Handles simulated network latency, dynamic import of the entrypoint,
 * mounting/unmounting the remote component, and loading indicator.
 */
export function useMfeLoader(activeTab: TabId, onTabChange: (tab: TabId) => void) {
  const [mfeLoading, setMfeLoading] = useState(false);
  const mfeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMfeTab =
      activeTab.includes('example-') ||
      activeTab.includes('template-') ||
      activeTab.includes('raw-');

    if (!isMfeTab) {
      // No MFE needed – ensure loading state cleared.
      setTimeout(() => setMfeLoading(false), 0); // async to satisfy lint
      return;
    }

    let mode: MfeMode = 'example';
    if (activeTab.startsWith('template-')) mode = 'template';
    if (activeTab.startsWith('raw-')) mode = 'raw';

    const variant = activeTab.includes('prefill') ? 'prefill' : 'detail';

    const loadingTimer = setTimeout(() => setMfeLoading(true), 0);

    const timer = setTimeout(() => {
      import('../../mfe-entrypoint')
        .then((mfe) => {
          setMfeLoading(false);
          setTimeout(() => {
            if (mfeContainerRef.current) {
              mfe.mount(mfeContainerRef.current, {
                initialOpen: true,
                variant,
                mode,
                onClose: () => onTabChange('dashboard'),
              });
            }
          }, 50);
        })
        .catch((err) => {
          console.error('Failed to load MFE:', err);
          setMfeLoading(false);
        });
    }, 600);

    const currentContainer = mfeContainerRef.current;
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(timer);
      if (currentContainer) {
        import('../../mfe-entrypoint').then((mfe) => mfe.unmount(currentContainer));
      }
    };
  }, [activeTab, onTabChange]);

  return { mfeLoading, mfeContainerRef };
}
