import fetch from 'node-fetch';
const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

export const translateText = async (text, targetLang) => {
  if (!text) return '';

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
          format: 'text',
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error('Google API error:', data.error);
      return text;
    }

    if (!data?.data?.translations?.length) {
      console.error('Bad translation response:', data);
      return text;
    }

    return data.data.translations[0].translatedText;

  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

export const translateAll = async ({ title, description, language }) => {
  if (!title && !description) return {
    title_rus: null,
    title_en: null,
    title_he: null,
    description_rus: null,
    description_en: null,
    description_he: null,
  };

  const getTranslation = async (text, target) => {
    if (!text) return null;
    if (language === target) return text;
    return translateText(text, target);
  };

  const [
    title_rus,
    title_en,
    title_he,
    description_rus,
    description_en,
    description_he
  ] = await Promise.all([
    getTranslation(title, 'rus'),
    getTranslation(title, 'en'),
    getTranslation(title, 'he'),
    getTranslation(description, 'rus'),
    getTranslation(description, 'en'),
    getTranslation(description, 'he'),
  ]);

  return { title_rus, title_en, title_he, description_rus, description_en, description_he };
};