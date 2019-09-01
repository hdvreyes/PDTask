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
  console.log("-----------")
  console.log(person)
  console.log("-----------")

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
      console.log(parsedResults)
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
    })
  }
}


const updateStorage = (person, deals, activities) => {
  // let newPersonDetails = person;
  // let newResults = []

  // deals.map(deal => {
  //   if (!person.details.deals.find(stored => stored.id === deal.id)) {
  //     newPersonDetails.deals.push(deal);
  //   } else {
  //     let index = person.details.deals.findIndex(properties => properties.id === deal.id)
  //     person.details.deals[index] = deal;  
  //   }
  // })
// [{
//   id:
//   details:[]
//   acitvities:[]
// }]
//   person.details = {
//     deals: updateAndPush(person.details.deals, deals),
//     activities: updateAndPush(person.details.activities, activities)
//   }
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
    console.log("NEWNEWNEW")

    console.log(results)
    console.log("NEWNEWNEW")

    // results[index] = person;
    
    // console.log("NEWNEWNEW")
    // console.log(results[index])
    // console.log("NEWNEWNEW")
    // console.log("EEEEEEEEEEE")
    // console.log(results)
    // console.log("EEEEEEEEEEE")

    // // results.map(result => {
    // //   // Let's check if the person ID is not already stored
    // //   if (!results.find(stored => stored.id === person.id)) {
    // //     results.push(person);
    // //   }
    // // })
    // // // Let's store the items
    return setStorageItem(AS_PEOPLE, JSON.stringify(results));
  })
  .then(status => {
    console.log("saving status:" + status);
  })
  .catch(error => {
    console.log(error);
  })

}

/**
 * This method will push or replace values in object
 * @param {*} oldValue 
 * @param {*} newValue 
 */
const updateAndPush = (oldValue, newValue) => {
  newValue.map(value => {
    if (!oldValue.find(stored => stored.id === value.id)) {
      oldValue.push(value);
    } else {
      let index = oldValue.findIndex(properties => properties.id === value.id)
      oldValue[index] = value;  
    }
  });
  return oldValue;
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

// active_flag: true
// add_time: "2019-09-01 08:29:38"
// assigned_to_user_id: 10197983
// attendees: null
// busy_flag: true
// company_id: 6841362
// created_by_user_id: 10197983
// deal_dropbox_bcc: null
// deal_id: null
// deal_title: null
// done: false
// due_date: "2019-09-17"
// due_time: "08:30"
// duration: "01:00"
// file: null
// gcal_event_id: null
// google_calendar_etag: null
// google_calendar_id: null
// id: 2
// last_notification_time: null
// last_notification_user_id: null
// location: null
// location_admin_area_level_1: null
// location_admin_area_level_2: null
// location_country: null
// location_formatted_address: null
// location_locality: null
// location_postal_code: null
// location_route: null
// location_street_number: null
// location_sublocality: null
// location_subpremise: null
// marked_as_done_time: ""
// note: null
// note_clean: null
// notification_language_id: 1
// org_id: 2
// org_name: "Sheaverve"
// owner_name: "Habagat Reyes"
// participants: [{…}]
// person_dropbox_bcc: "testtask-10d9c6@pipedrivemail.com"
// person_id: 1002
// person_name: "Dorothy Locke"
// public_description: null
// rec_master_activity_id: null
// rec_rule: null
// rec_rule_extension: null
// reference_id: null
// reference_type: null
// series: null
// source_timezone: null
// subject: "Fun activity"
// type: "call"
// update_time: "2019-09-01 08:29:38"
// update_user_id: null
// user_id: 10197983
//=======================================
// active: true
// activities_count: 0
// add_time: "2019-09-01 08:28:01"
// cc_email: "testtask-10d9c6+deal3@pipedrivemail.com"
// close_time: null
// creator_user_id: {id: 10197983, name: "Habagat Reyes", email: "hdvreyes@gmail.com", has_pic: true, pic_hash: "98c8a40c4d6fe34cbe762f47874310d9", …}
// currency: "PHP"
// deleted: false
// done_activities_count: 0
// email_messages_count: 0
// expected_close_date: "2019-09-30"
// files_count: 0
// first_won_time: null
// followers_count: 1
// formatted_value: "PHP 100"
// formatted_weighted_value: "PHP 100"
// id: 3
// label: null
// last_activity_date: null
// last_activity_id: null
// last_incoming_mail_time: null
// last_outgoing_mail_time: null
// lost_reason: null
// lost_time: null
// next_activity_date: null
// next_activity_duration: null
// next_activity_id: null
// next_activity_note: null
// next_activity_subject: null
// next_activity_time: null
// next_activity_type: null
// notes_count: 0
// org_hidden: false
// org_id: {name: "Sheaverve", people_count: 1, owner_id: 10197983, address: "Eha 41", active_flag: true, …}
// org_name: "Sheaverve"
// owner_name: "Habagat Reyes"
// participants_count: 1
// person_hidden: false
// person_id: {active_flag: true, name: "Dorothy Locke", email: Array(1), phone: Array(1), value: 1002}
// person_name: "Dorothy Locke"
// pipeline_id: 1
// probability: null
// products_count: 0
// reference_activities_count: 0
// rotten_time: null
// stage_change_time: null
// stage_id: 1
// stage_order_nr: 1
// status: "open"
// title: "Sheaverve deal"
// undone_activities_count: 0
// update_time: "2019-09-01 08:28:01"
// user_id: {id: 10197983, name: "Habagat Reyes", email: "hdvreyes@gmail.com", has_pic: true, pic_hash: "98c8a40c4d6fe34cbe762f47874310d9", …}
// value: 100
// visible_to: "3"
// weighted_value: 100
// weighted_value_currency: "PHP"
// won_time: null