import React from 'react';
import { Button, EButtonTheme, EComponentSize, ETriplexNextTheme } from '@sberbusiness/triplex-next';
import { BellStrokeNavIcon20 } from '@sberbusiness/icons-next';

interface HostHeaderProps {
  theme: ETriplexNextTheme;
  setTheme: React.Dispatch<React.SetStateAction<ETriplexNextTheme>>;
}

export const HostHeader: React.FC<HostHeaderProps> = ({ theme, setTheme }) => (
  <header className="host-header">
    <div className="host-logo">
      <span className="logo-icon">🏦</span>
      <span className="logo-text">СберБизнес</span>
      <span className="host-badge">HOST SHELL</span>
    </div>
    <div className="host-user">
      <Button
        theme={EButtonTheme.SECONDARY}
        size={EComponentSize.SM}
        onClick={() =>
          setTheme(prev =>
            prev === ETriplexNextTheme.LIGHT ? ETriplexNextTheme.DARK : ETriplexNextTheme.LIGHT
          )
        }
        className="theme-switcher-btn"
      >
        {theme === ETriplexNextTheme.LIGHT ? '🌙 Темная тема' : '☀️ Светлая тема'}
      </Button>
      <BellStrokeNavIcon20 paletteIndex={0} className="bell-icon" />
      <div className="user-avatar">ИП</div>
      <span className="user-name">Иван Петров</span>
    </div>
  </header>
);
