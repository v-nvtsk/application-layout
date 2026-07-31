import React from 'react';
import { Field } from 'react-final-form';
import {
  EIslandType,
  TextField,
  Radio,
  Checkbox,
} from '@sberbusiness/triplex-next';

import { ApplicationIsland } from '../../../Components/ApplicationIsland';
import { FieldsGrid, FieldsGridCell } from '../../../Components/FieldsGrid';
import { BasicRow } from '../../../Components/BasicRow';
import styles from './ModulePrefill.module.less';

/**
 * КОМПОНЕНТ ДЛЯ ОПИСАНИЯ ПОЛЕЙ ФОРМЫ ПРЕДЗАПОЛНЕНИЯ (ШАБЛОН)
 */
export const ModulePrefillFields: React.FC = () => {
  return (
    <div className={styles.templateIslandsContainer}>
      <ApplicationIsland
        title="📝 Основные реквизиты организации"
        type={EIslandType.TYPE_1}
      >
        <FieldsGrid>
          <FieldsGridCell fullWidth>
            <BasicRow label="Полное наименование организации" required>
              <Field name="organizationName">
                {({ input }) => (
                  <TextField
                    inputProps={{
                      placeholder: 'ООО "Вектор"',
                      value: input.value || '',
                      onChange: input.onChange,
                      onBlur: input.onBlur,
                      onFocus: input.onFocus,
                    }}
                  />
                )}
              </Field>
            </BasicRow>
          </FieldsGridCell>

          <FieldsGridCell>
            <BasicRow label="ИНН" required>
              <Field name="inn">
                {({ input }) => (
                  <TextField
                    inputProps={{
                      placeholder: '10-значный номер',
                      value: input.value || '',
                      onChange: input.onChange,
                      onBlur: input.onBlur,
                      onFocus: input.onFocus,
                    }}
                  />
                )}
              </Field>
            </BasicRow>
          </FieldsGridCell>

          <FieldsGridCell>
            <BasicRow label="КПП">
              <Field name="kpp">
                {({ input }) => (
                  <TextField
                    inputProps={{
                      placeholder: '9-значный номер',
                      value: input.value || '',
                      onChange: input.onChange,
                      onBlur: input.onBlur,
                      onFocus: input.onFocus,
                    }}
                  />
                )}
              </Field>
            </BasicRow>
          </FieldsGridCell>

          <FieldsGridCell fullWidth>
            <BasicRow label="Юридический адрес">
              <Field name="legalAddress">
                {({ input }) => (
                  <TextField
                    inputProps={{
                      placeholder: 'г. Москва, ул. Ленина, д. 1',
                      value: input.value || '',
                      onChange: input.onChange,
                      onBlur: input.onBlur,
                      onFocus: input.onFocus,
                    }}
                  />
                )}
              </Field>
            </BasicRow>
          </FieldsGridCell>
        </FieldsGrid>
      </ApplicationIsland>

      <ApplicationIsland
        title="⚙️ Параметры и дополнительные услуги"
        type={EIslandType.TYPE_2}
      >
        <FieldsGrid>
          <FieldsGridCell>
            <BasicRow label="Режим налогообложения">
              <div className={styles.radioGroupVertical}>
                <Field name="taxSystem" type="radio" value="osno">
                  {({ input }) => (
                    <Radio
                      checked={input.checked}
                      onChange={input.onChange}
                      name={input.name}
                      value="osno"
                    >
                      Общая (ОСНО)
                    </Radio>
                  )}
                </Field>
                <Field name="taxSystem" type="radio" value="usn">
                  {({ input }) => (
                    <Radio
                      checked={input.checked}
                      onChange={input.onChange}
                      name={input.name}
                      value="usn"
                    >
                      Упрощенная (УСН)
                    </Radio>
                  )}
                </Field>
                <Field name="taxSystem" type="radio" value="patent">
                  {({ input }) => (
                    <Radio
                      checked={input.checked}
                      onChange={input.onChange}
                      name={input.name}
                      value="patent"
                    >
                      Патент
                    </Radio>
                  )}
                </Field>
              </div>
            </BasicRow>
          </FieldsGridCell>

          <FieldsGridCell>
            <BasicRow label="Подключаемые услуги">
              <div className={styles.radioGroupVertical}>
                <Field name="accountingService" type="checkbox">
                  {({ input }) => (
                    <Checkbox
                      checked={!!input.checked}
                      onChange={input.onChange}
                    >
                      Бухгалтерский учет
                    </Checkbox>
                  )}
                </Field>
                <Field name="legalService" type="checkbox">
                  {({ input }) => (
                    <Checkbox
                      checked={!!input.checked}
                      onChange={input.onChange}
                    >
                      Юридическое сопровождение
                    </Checkbox>
                  )}
                </Field>
                <Field name="edoService" type="checkbox">
                  {({ input }) => (
                    <Checkbox
                      checked={!!input.checked}
                      onChange={input.onChange}
                    >
                      ЭДО (Электронный документооборот)
                    </Checkbox>
                  )}
                </Field>
              </div>
            </BasicRow>
          </FieldsGridCell>
        </FieldsGrid>
      </ApplicationIsland>

      <ApplicationIsland
        title="✅ Подтверждение"
        type={EIslandType.TYPE_3}
      >
        <Field name="confirmCorrectness" type="checkbox">
          {({ input }) => (
            <Checkbox
              checked={!!input.checked}
              onChange={input.onChange}
            >
              Я подтверждаю корректность введенных данных
            </Checkbox>
          )}
        </Field>
      </ApplicationIsland>
    </div>
  );
};
