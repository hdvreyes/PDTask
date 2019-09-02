import { GET_DETAILS } from './types';
import { getStoredItem, setStorageItem } from "library/utils/asyncStorageManager";
import { BASE_URL, PERSON_END_POINT, DEALS_END_POINT, ACTIVITY_END_POINT, API_KEY, AS_PEOPLE, AS_DETAILS } from "library/config/config";

/**
 * This redux action will fetch the DEALS and ACTIVITIES or the person selected
 * We placed the api request here, so we can dispatch the results and update the props
 * @param {*} page 
 * @param {*} limit 
 */

export const getDetails = (person, page, limit) => {
  let deals = []
  let activities = []
  return dispatch => {
    /**
     * We'll fetch the DEALS first then loope thru the object and return it
     * The same process will happen to ACTIVITIES
     */
    fetch(BASE_URL + PERSON_END_POINT + "/" + person.id + "/" + DEALS_END_POINT + "?start=" + page + "&limit=" + limit + "&api_token=" + API_KEY)
    .then(result => result.json())
    .then(parsedResults => {
      /**
       * We'll recreate a new object, I don't think i'll be
       * needing the other fields.
       */
      if (parsedResults.data) {
        parsedResults.data.map((deal) => {
          /**
           * Let's go thru the fields and use only what we need to save
           */
          let newDealFields = setupDeal(deal);
          deals.push(newDealFields);
        })  
      }
      /**
       * Let's start fetch activities
       */
      return fetch(BASE_URL + PERSON_END_POINT + "/" + person.id + "/" + ACTIVITY_END_POINT + "?start=" + page + "&limit=" + limit + "&api_token=" + API_KEY)
    })
    .then(result => result.json())
    .then(parsedResults => {
      /**
       * We'll do the same thing we did for the deals
       */
      if (parsedResults.data) {
        parsedResults.data.map((activity) => {
          /**
           * Let's go thru the fields and use only what we need to save
           */
          let newActivityFields = setupActivity(activity);
          activities.push(newActivityFields);
        })
      }
      /** Update local storage */
      updateStorage(person, deals, activities);
      
      dispatch({
        type: GET_DETAILS,
        details: {
          id: person.id,
          deals: deals,
          activities: activities
        },
        next_page_available: false,
        next_page_start: page + limit
      });

    })
    .catch(error => {
      console.log(error.message);
      // If network failure occured we'll fall back to local storage
      dispatch(getLocalStorage(person));
    })
  }
}

/**
 * Let's update our local storage
 * @param {*} person 
 * @param {*} deals 
 * @param {*} activities 
 */
const updateStorage = (person, deals, activities) => {
  let store = {
    id: person.id,
    deals: deals,
    activities: activities
  }
  getStoredItem(AS_DETAILS)
  .then(results => {
    /**
     * Let's look for the person id if we can't find one,
     * fall back to pushing new record.
     * Otherwise we update that index
     */
    let index = results.findIndex(properties => properties.id === person.id)
    if(index < 0) {
      results.push(store)
    } else {
      results[index] = store
    }
    return setStorageItem(AS_DETAILS, JSON.stringify(results));
  })
  .then(status => {
    console.log("saving status:" + status);
  })
  .catch(error => {
    console.log(error);
  })
}

/**
 * If network requests fail, we'll fall back to local storage
 * To paginate we add the current page value and add the set limit
 * We can slice thru the stored array value paginate based on the array indeces
 * @param {*} page 
 * @param {*} limit 
 */
const getLocalStorage = (person) => {
  return dispatch => {
    getStoredItem(AS_DETAILS)
    .then(results => {
      let index = results.findIndex(properties => properties.id === person.id)
      dispatch({
        type: GET_DETAILS,
        details: (index >= 0) ? results[index] : {}
      });  

    })
    .catch(error => {
      console.log(error);
    })  
  }
}

/**
 * The following lines is just to reconstruct the object with
 * leaner fields. We won't be using some of the fields from the API
 * @param {*} deal 
 */
const setupDeal = (deal) => {
  let newDeal = {
    id: deal.id,
    title: deal.title,
    expected_close_date: deal.expected_close_date,
    done_activities_count: deal.done_activities_count,
    add_time: deal.add_time,
    participants_count: deal.participants_count,
    status: deal.status,
    formatted_value: deal.formatted_value,
    value: deal.value,
    update_time: deal.update_time,
    currency: deal.currency,
    won_time: deal.won_time
  }
  return newDeal;
}

const setupActivity = (activity) => {
  let newActivity = {
    id: activity.id,
    subject: activity.subject,
    active_flag: activity.active_flag,
    attendees: activity.attendees,
    location: activity.location,
    public_description: activity.public_description,
    type: activity.type,
    add_time: activity.add_time,
    busy_flag: activity.busy_flag,
    update_time: activity.update_time
  }
  return newActivity;
}
