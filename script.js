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
$ul.on('click', 'li', displayParkInfo);
$ul.on('click', 'p', displayParkInfo);

// Functions
function displayParkInfo(event) {
  if (event.target.children.length) {
    event.target.children[1].classList.toggle('hidden');
  } else {
    event.target.classList.add('hidden');
  }
}

function getAllStateParks(event) {
  event && event.preventDefault();

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

function renderParkList(parkData) {
  const stateName = normStateNameForDisplay();
  $ul.html(`
  <h3>Parks in ${stateName}</h3>`);
  parkData.data.forEach((park, index) => {
    const liEl = document.createElement('li');
    liEl.innerHTML = `${park.fullName}<br><p class="hidden">${park.description}</p>`;
    liEl.classList.add(`park-${index}`);
    $ul.append(liEl);
  });
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
