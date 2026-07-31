import React from "react";

import {
  EFontType,
  ETextSize,
  ETitleSize,
  Text,
  Title,
} from "@sberbusiness/triplex-next";

export const HostPayments: React.FC = () => (
  <div className="host-card">
    <Title
      size={ETitleSize.H1}
      className="main-title"
      type={EFontType.PRIMARY_INVERT}
    >
      Платежные поручения
    </Title>
    <Text size={ETextSize.B2} type={EFontType.PRIMARY_INVERT}>
      Здесь отображается журнал ваших платежей. Вы можете создать новый рублевый
      или валютный платеж контрагенту.
    </Text>
    <div className="empty-state">
      <span className="empty-icon">📁</span>
      <Text size={ETextSize.B3} type={EFontType.PRIMARY_INVERT}>
        Нет исходящих платежей за сегодня
      </Text>
    </div>
  </div>
);
