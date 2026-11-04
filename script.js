const boton = document.querySelector('#boton-vela');
const ofrenda = document.querySelector('#ofrenda');
const traducciones = {
  en: {
    pageTitle: 'My digital ofrenda',
    description: 'A Day of the Dead digital ofrenda for Frida the cat.',
    title: 'For my pet Frida',
    hint: 'Light the candle to read the dedication.',
    dedication: 'You were a very sweet kitty. We found you on the street and gave you a home. We miss you so much.',
    imageAlt: 'Frida, the cat',
    candleOn: 'Light the candle',
    candleOff: 'Blow out the candle'
  },
  es: {
    pageTitle: 'Mi ofrenda digital',
    description: 'Una ofrenda digital de Día de Muertos para la gatita Frida.',
    title: 'Para mi mascota Frida',
    hint: 'Enciende la vela para leer la dedicatoria.',
    dedication: 'Fuiste una muy buena gatita que encontramos en la calle y dimos un hogar. Te extrañaremos mucho.',
    imageAlt: 'Frida, la gatita',
    candleOn: 'Encender la vela',
    candleOff: 'Apagar la vela'
  }
};
const metaDescription = document.querySelector('meta[name="description"]');
const candleLabel = boton.querySelector('[data-i18n]');

function preferredLanguage() {
  let preferences = [];

  try {
    if (Array.isArray(navigator.languages)) preferences = navigator.languages;
  } catch (error) {
    // Try navigator.language below when the languages list is unavailable.
  }

  if (preferences.length === 0) {
    try {
      if (typeof navigator.language === 'string') preferences = [navigator.language];
    } catch (error) {
      // Fall back to Spanish when the browser language is unavailable.
    }
  }

  for (const preference of preferences) {
    if (typeof preference !== 'string') continue;
    const language = preference.toLowerCase().split('-')[0];
    if (language === 'en' || language === 'es') return language;
  }
  return 'es';
}

function setLanguage(language) {
  const translations = traducciones[language] || traducciones.en;
  document.documentElement.lang = language;
  document.title = translations.pageTitle;
  metaDescription.content = translations.description;

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    if (key !== 'candleOn') element.textContent = translations[key];
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(element => {
    element.alt = translations[element.dataset.i18nAlt];
  });

  const isLit = ofrenda.classList.contains('encendida');
  candleLabel.textContent = isLit ? translations.candleOff : translations.candleOn;
  document.querySelectorAll('[data-language]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  });
}

document.querySelectorAll('[data-language]').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});

setLanguage(preferredLanguage());

boton.addEventListener('click', () => {
  const encendida = ofrenda.classList.toggle('encendida');
  boton.setAttribute('aria-pressed', encendida);
  candleLabel.textContent = encendida ? traducciones[document.documentElement.lang].candleOff : traducciones[document.documentElement.lang].candleOn;
});
