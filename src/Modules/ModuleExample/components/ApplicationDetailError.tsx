import React from 'react';
import {
  EFontType,
  EComponentSize,
  EButtonTheme,
  Button,
  Text,
  Title,
  ETextSize,
  ETitleSize,
} from '@sberbusiness/triplex-next';

interface ApplicationDetailErrorProps {
  message: string;
  onRetry: () => void;
}

export const ApplicationDetailError: React.FC<ApplicationDetailErrorProps> = ({
  message,
  onRetry,
}) => {
  return (
    <div className="detail-error-wrapper">
      <div className="detail-error-card">
        <span className="detail-error-icon">⚠️</span>
        <Title size={ETitleSize.H3} type={EFontType.PRIMARY_INVERT}>
          Ошибка загрузки данных
        </Title>
        <Text size={ETextSize.B3} type={EFontType.PRIMARY_INVERT}>
          {message}
        </Text>
        <Button
          theme={EButtonTheme.GENERAL}
          size={EComponentSize.MD}
          onClick={onRetry}
          className="detail-error-btn"
        >
          Повторить попытку
        </Button>
      </div>
    </div>
  );
};
