// Constants
const URL = 'https://developer.nps.gov/api/v1';
const API_KEY = 'cPYKs2IvkpGQERkBvONFwDJ8KVSKt1xjb9V3vzXm';

// States
let stateParkList = {};

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
  const clickIndex = event.target.classList[0].slice(-1);
  console.log(stateParkList.data[clickIndex].description);
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
      stateParkList = data;
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
    $ul.append(
      `<li class="park-${index}">${parkData.data[index].fullName}</li>`
    );
  });
}
