import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { HostApp } from './HostApp.tsx'

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }

  ReactDOM.render(
    <StrictMode>
      <HostApp />
    </StrictMode>,
    document.getElementById('root'),
  );
}

bootstrap();
