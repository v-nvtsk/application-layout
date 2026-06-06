import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

export interface MfeProps {
  initialOpen?: boolean;
  onClose?: () => void;
  variant?: 'detail' | 'prefill';
  mode?: 'example' | 'template' | 'raw';
}

export async function mount(container: HTMLElement, props: MfeProps = {}) {
  let Component;
  
  switch (props.mode) {
    case 'template': {
      const { ModuleTemplate } = await import('./Modules/ModuleTemplate');
      Component = ModuleTemplate;
      break;
    }
    case 'raw': {
      const { ModuleRawTemplate } = await import('./Modules/ModuleRawTemplate');
      Component = ModuleRawTemplate;
      break;
    }
    case 'example':
    default: {
      const { ModuleExample } = await import('./Modules/ModuleExample');
      Component = ModuleExample;
      break;
    }
  }
  
  ReactDOM.render(
    <StrictMode>
      <Component
        initialOpen={props.initialOpen ?? true}
        onClose={props.onClose}
        variant={props.variant}
      />
    </StrictMode>,
    container
  );
}

export function unmount(container: HTMLElement) {
  ReactDOM.unmountComponentAtNode(container);
}

declare global {
  interface Window {
    mountSettingsMfe: typeof mount;
    unmountSettingsMfe: typeof unmount;
  }
}

if (typeof window !== 'undefined') {
  window.mountSettingsMfe = mount;
  window.unmountSettingsMfe = unmount;
}
