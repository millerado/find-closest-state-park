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
$ul.on('click', 'li', displayParkInfo);
$ul.on('click', 'p', hideDescription);

// Functions
function hideDescription(event) {
  event.target.classList.add('hidden');
}

// Needs debugging for clicking on list element multiple times and displaying multiple descriptions
function displayParkInfo(event) {
  console.log('clicked');
  // if (!event.target.classList.length || event.target.classList[0] === 'hidden')
  //   return;
  // const clickIndex = event.target.classList[0].slice(-1);
  // const pEl = document.createElement('p');
  // event.target.append(pEl);
  // pEl.innerText = `${stateParkList.data[clickIndex].description}`;
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
  console.log(parkData);
  parkData.data.forEach((park, index) => {
    const liEl = document.createElement('li');
    // const pEl = document.createElement('p');
    // pEl.innerText = `${park.description}`;
    // pEl.classList.add('hidden');
    // liEl.append(pEl);
    liEl.innerHTML = `${park.fullName}<br><p class="hidden">${park.description}</p>`;
    liEl.classList.add(`park-${index}`);
    $ul.append(liEl);
  });
}
