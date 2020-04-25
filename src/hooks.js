import { useState } from 'react';
import Axios from 'axios';
import { v4 as uuid } from 'uuid';

//takes a boolean as initial value (default=true)/
//returns state and a function to flip value of state
function useFlip(initialValue = true) {
  const [isFlipped, setIsFlipped] = useState(initialValue);

  const flip = () => {
    setIsFlipped(oldValue => !oldValue);
  }

  return [isFlipped, flip];

}

// Takes a base URL and returns an array as state of all response.data to the api
// along with a function for adding another response.data object to the state from the api
// with a discretionary addon to the url.
function useAxios(baseUrl) {
  const [apiCalls, setApiCalls] = useState([]);

  const addApiCall = async (urlAddition="") => {

    if (baseUrl.endsWith("/")) { baseUrl = baseUrl.slice(0, baseUrl.length - 1) };
    if (urlAddition.startsWith("/")) { urlAddition = urlAddition.slice(1) };

    const url = `${baseUrl}/${urlAddition}`
    const response = await Axios.get(url);
    setApiCalls(old => [...old, { ...response.data, id: uuid() }]);
  }

  const clearApiCalls = () => {
    setApiCalls([]);
  }

  return [apiCalls, addApiCall, clearApiCalls]
}

function useLocalStorage(key, initialValue) {

const retrievedFromStorage = window.localStorage.getItem(key);
const syncValue = (retrievedFromStorage ? retrievedFromStorage : initialValue)

const [value, setState] = useState(syncValue)

const setSyncState = (upDateValue) => {
  setState(upDateValue)
  window.localStorage.setItem(key, syncValue)
}

return [syncValue, setSyncState]

}

export { useFlip, useAxios, useLocalStorage};