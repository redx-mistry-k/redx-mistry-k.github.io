const translateButton = document.querySelector('#translate-button');
const sourceText = document.querySelector('#source-text');
const targetText = document.querySelector('#target-text');

translateButton.addEventListener('click', async () => {
  const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
  const options = {
    method: 'POST',
    headers: {
    },
    body: new URLSearchParams({
      q: sourceText.value,
      source: 'en',
      target: 'es'
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    targetText.value = result.data.translations[0].translatedText;
  } catch (error) {
    console.error(error);
  }
});
