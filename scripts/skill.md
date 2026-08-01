# Инструкция: Создание модулей и работа с асинхронными операциями

## 1. Генерация нового модуля

Запустите скрипт генерации из корня проекта:
```bash
npm run create-module -- --name <ModuleName>
```
*Пример: `npm run create-module -- --name Qualification`*

---

## 2. Работа с хуком асинхронных операций

Хук `useRequest` используется внутри модульных обёрток для связи UI с асинхронными действиями (Redux Thunk или API-клиент).

### Шаблон хука загрузки данных (Query / Get)
```typescript
// hooks/useFetchModuleData.ts
import { useRequest } from '../../../shared/hooks/useRequest';

export function useFetchModuleData() {
  // Передаем async-функцию (например, dispatch thunk)
  return useRequest(() => dispatch(fetchDataThunk()).unwrap());
}
```

### Шаблон хука действия/сохранения (Mutation / Action)
```typescript
// hooks/useSaveModuleData.ts
import { useRequest } from '../../../shared/hooks/useRequest';

export function useSaveModuleData() {
  const { execute, isLoading, error, clearError } = useRequest(
    (data: ModuleData) => dispatch(saveDataThunk(data)).unwrap(),
    { immediate: false } // Выполняется вручную через execute(data)
  );

  return {
    save: execute,
    isSaving: isLoading,
    saveError: error,
    clearSaveError: clearError,
  };
}
```

---

## 3. Обработка ошибок в компонентах

Локальный стейт `error` в хуке `useRequest` наполняется только для критических ошибок (`BUSINESS_CRITICAL`). Обычные бизнес-ошибки (`BUSINESS`) и сетевые (`NETWORK`) обрабатываются глобально (нотификации или лайтбокс с ошибкой) и игнорируются хуком.

Пример обработки критической ошибки `SOME_ERROR` в UI-компоненте для показа специального контента вместо формы:
```typescript
const { data, error, isLoading } = useFetchModuleData();

// 1. Проверяем, что ошибка принадлежит классу ClientError
const isClientErr = ClientError.isClientError(error);

// 2. Проверяем, является ли ошибка бизнес-критичной
const isBusinessCritical = ClientError.isBusinessCritical;

// 3. Обрабатываем конкретный код ошибки
const isCustomErrorScreen = isBusinessCritical && error.errorCode === 'SOME_ERROR';

if (isCustomErrorScreen) {
  return <ErrorLayout title="Доступ ограничен" description={error.errorDesc} />;
}
```
