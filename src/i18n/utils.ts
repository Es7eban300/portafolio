import es from './es.json';
import en from './en.json';

const translations: Record<string, Record<string, any>> = { es, en };

export type Lang = 'es' | 'en';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'es';
}

export function t(key: string, lang: Lang): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value ?? key;
}

export function getTranslations(lang: Lang) {
  return translations[lang];
}

export function getLocalePath(path: string, lang: Lang): string {
  if (lang === 'es') return path;
  return `/en${path}`;
}
