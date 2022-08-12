// Constants
const URL = 'https://developer.nps.gov/api/v1';
const API_KEY = 'cPYKs2IvkpGQERkBvONFwDJ8KVSKt1xjb9V3vzXm';

// States

// Cached Element Listeners

// Event Listeners

// Functions

function getAllStateParks() {
  const promise = $.ajax(`${URL}/parks?stateCode=CO&api_key=${API_KEY}`);

  promise.then(
    (data) => {
      console.log(data);
      console.log(data.data[0].fullName);
      console.log(data.data[0].description);
    },
    (error) => {
      console.log(error);
    }
  );
}
