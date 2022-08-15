// Constants
const URL = 'https://developer.nps.gov/api/v1';
const API_KEY = 'cPYKs2IvkpGQERkBvONFwDJ8KVSKt1xjb9V3vzXm';
const stateAbbr = {
  alabama: 'AL',
  alaska: 'AK',
  arizona: 'AZ',
  arkansas: 'AR',
  california: 'CA',
  colorado: 'CO',
  connecticut: 'CT',
  delaware: 'DE',
  florida: 'FL',
  georgia: 'GA',
  hawaii: 'HI',
  idaho: 'ID',
  illinois: 'IL',
  indiana: 'IN',
  iowa: 'IA',
  kansas: 'KS',
  kentucky: 'KY',
  louisiana: 'LA',
  maine: 'ME',
  maryland: 'MD',
  massachusetts: 'MA',
  michigan: 'MI',
  minnesota: 'MN',
  mississippi: 'MS',
  missouri: 'MO',
  montana: 'MT',
  nebraska: 'NE',
  nevada: 'NV',
  'new hampshire': 'NH',
  'new jersey': 'NJ',
  'new mexico': 'NM',
  'new york': 'NY',
  'north carolina': 'NC',
  'north dakota': 'ND',
  ohio: 'OH',
  oklahoma: 'OK',
  oregon: 'OR',
  pennsylvania: 'PA',
  'rhode island': 'RI',
  'south carolina': 'SC',
  'south dakota': 'SD',
  tennessee: 'TN',
  texas: 'TX',
  utah: 'UT',
  vermont: 'VT',
  virginia: 'VA',
  washington: 'WA',
  'west virginia': 'WV',
  wisconsin: 'WI',
  wyoming: 'WY',
};
// States
let stateParkList = {};

// Cached Element Listeners
const $form = $('form');
const $main = $('main');
const $input = $('input[type="text"]');
const $ul = $('ul');

// Event Listeners
$form.on('submit', getAllStateParks);
$ul.on('click', 'li', toggleParkInfo);
$ul.on('click', 'div', hideParkInfo);

// Functions
function toggleParkInfo(event) {
  if (!(event.target.parentElement.nodeName === 'UL')) return;
  event.target.children[0].classList.toggle('hidden');
}

function hideParkInfo(event) {
  event.target.parentElement.classList.toggle('hidden');
}

function getAllStateParks(event) {
  event && event.preventDefault();
  if (stateAbbr[$input.val().toLowerCase()] === undefined) return;
  const inputState = stateAbbr[$input.val().toLowerCase()];
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

function normStateNameForDisplay() {
  let stateName = $input.val();
  const spaceIndex = stateName.indexOf(' ');

  if (!(spaceIndex === -1)) {
    stateName =
      stateName[0].toUpperCase() +
      stateName.slice(1, spaceIndex).toLowerCase() +
      ' ' +
      stateName[spaceIndex + 1].toUpperCase() +
      stateName.slice(spaceIndex + 2).toLowerCase();
  } else {
    stateName = stateName[0].toUpperCase() + stateName.slice(1).toLowerCase();
  }
  return stateName;
}

function renderParkList(parkData) {
  const stateName = normStateNameForDisplay();
  $ul.html(`
  <h3>Parks in ${stateName}</h3>`);
  parkData.data.forEach((park, index) => {
    const liEl = document.createElement('li');
    liEl.innerHTML = `${park.fullName}<div class='hidden'><p><strong>Location:</strong> ${park.addresses[0]['city']}, ${stateName}</p><p><strong>Entrance Fee:</strong> ${park.entranceFees[0]['cost']}</p><a href=${park.directionsUrl} target="_blank">Directions</a><img src=${park.images[0].url}><br><br><p>${park.description}</p></div>`;
    liEl.classList.add(`park-${index}`);
    $ul.append(liEl);
  });
}
