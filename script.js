const translateButton = document.querySelector('#translate-button');
const sourceText = document.querySelector('#source-text');
const targetText = document.querySelector('#target-text');

translateButton.addEventListener('click', async () => {
  const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': 'd9f378d08emshfd5d1038cbbaeefp15886ajsnebf65e578316',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
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
