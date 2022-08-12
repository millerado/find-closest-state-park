// Constants
const URL = 'https://developer.nps.gov/api/v1';
const API_KEY = 'cPYKs2IvkpGQERkBvONFwDJ8KVSKt1xjb9V3vzXm';

// States

// Cached Element Listeners
const $form = $('form');
const $input = $('input[type="text"]');

// Event Listeners
$form.on('submit', getAllStateParks);

// Functions

function getAllStateParks(event) {
  event && event.preventDefault();

  const inputState = $input.val();
  console.log(inputState);

  const promise = $.ajax(
    `${URL}/parks?stateCode=${inputState}&api_key=${API_KEY}`
  );

  promise.then(
    (data) => {
      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}
