import React from 'react';

import { EIslandType } from '@sberbusiness/triplex-next';

import { ApplicationIsland } from '../../../Components/ApplicationIsland';

export interface ModuleDetailFieldsProps {
  data?: Record<string, unknown>;
}

/**
 * КОМПОНЕНТ ДЛЯ ОПИСАНИЯ ПОЛЕЙ ДЕТАЛЬНОЙ ФОРМЫ (ШАБЛОН)
 * 
 * Здесь вы можете разместить ваши бизнес-секции (ApplicationIsland) и поля ввода.
 */
export const ModuleDetailFields: React.FC<ModuleDetailFieldsProps> = ({ data: _data }) => {
  return (
    <>
      <ApplicationIsland
        title="[Название секции]"
        type={EIslandType.TYPE_1}
      >
        {/* Добавьте сюда поля формы */}
        {null}
      </ApplicationIsland>

      {/* Добавьте больше секций ApplicationIsland по необходимости */}
    </>
  );
};
