// Constants
const URL = 'https://developer.nps.gov/api/v1';
const API_KEY = 'cPYKs2IvkpGQERkBvONFwDJ8KVSKt1xjb9V3vzXm';

// States

// Cached Element Listeners
const $form = $('form');
const $main = $('main');
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
      renderParkList(data);
    },
    (error) => {
      console.log(error);
    }
  );
}

function renderParkList(parkData) {
  $main.html(`
  <h3>Parks in ${$input.val()}</h3>
  <ul>
  <li>${parkData.data[0].fullName}</>
  <li>${parkData.data[1].fullName}</li>
  <li>${parkData.data[2].fullName}</li>
  <li>${parkData.data[3].fullName}</li>
  <li>${parkData.data[4].fullName}</li>
  </ul>
  `);
}
