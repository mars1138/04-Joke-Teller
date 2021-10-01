const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

const apiUrl =
  'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious,political,racist';

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: '1ba1aea123e141978cb486ed2e1a4194',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// get jokes from Joke API
async function getJokes() {
  try {
    let joke = '';

    // Disable Button
    toggleButton();

    // fetch joke from API
    const response = await fetch(apiUrl);
    const data = await response.json();

    joke = data.setup ? `${data.setup} ... ${data.delivery}` : data.joke;

    // Text-to-Speech
    tellMe(joke);
  } catch (error) {
    // Catch Errors Here
    console.log('oops ', error);
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
