/**
 * Определяет активный вариант отображения модуля.
 * Приоритет: prop > URL ?variant= > 'detail'
 */
export function getActiveVariant(
  variant?: 'detail' | 'prefill',
): 'detail' | 'prefill' {
  if (variant) return variant;
  if (typeof window !== 'undefined') {
    const urlVariant = new URLSearchParams(window.location.search).get('variant');
    if (urlVariant === 'prefill' || urlVariant === 'detail') {
      return urlVariant as 'detail' | 'prefill';
    }
  }
  return 'detail';
}
