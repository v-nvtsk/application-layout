/**
 * Фабрика для обработчика закрытия модуля.
 * Закрывает LightBox, вызывает onClose или fallback на history.back().
 */
export function makeHandleClose(
  setIsOpen: (v: boolean) => void,
  onClose?: () => void,
) {
  return () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    } else if (typeof window !== 'undefined' && window.history) {
      window.history.back();
    }
  };
}
