// Constants
const URL = 'https://developer.nps.gov/api/v1';
const API_KEY = 'cPYKs2IvkpGQERkBvONFwDJ8KVSKt1xjb9V3vzXm';

// States

// Cached Element Listeners
const $form = $('form');
const $main = $('main');
const $input = $('input[type="text"]');
const $ul = $('ul');

// Event Listeners
$form.on('submit', getAllStateParks);
$ul.on('click', displayParkInfo);

// Functions
function displayParkInfo(event) {
  console.log(event.target);
}

function getAllStateParks(event) {
  event && event.preventDefault();

  const inputState = $input.val();

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
  $ul.html(`
  <h3>Parks in ${$input.val()}</h3>`);
  parkData.data.forEach((park, index) => {
    $ul.append(`<li>${parkData.data[index].fullName}</li>
      <p>${parkData.data[index].description}`);
  });
}
