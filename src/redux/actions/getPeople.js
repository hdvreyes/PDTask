import { getStoredItem, setStorageItem } from "library/utils/asyncStorageManager";
import { GET_PEOPLE } from './types';
import { BASE_URL, PERSON_END_POINT, API_KEY, RANDOM_IMAGE_URL, AS_PEOPLE, AS_DETAILS } from "library/config/config";

/**
 * We placed the api request here, so we can dispatch the results and update the props
 * @param {*} page 
 * @param {*} limit 
 */
export const getPeople = (page, limit) => {
  return dispatch => {
    fetch(BASE_URL + PERSON_END_POINT + "?start=" + page + "&limit=" + limit + "&api_token=" + API_KEY)
    .then(result => result.json())
    .then(parsedResults => {
      /**
       * We'll recreate a new object, I don't think i'll be
       * needing the other fields.
       */
      let people = []
      parsedResults.data.map((person) => {
        /**
         * Let's go thru the fields and use only what we need to save
         */
        let newPersonFields = setNewPerson(person);
        people.push(newPersonFields);
      })

      /**
       * Constructing the people array, we'll feed it to
       * our asyncStorage for saving
       */
      updateStorage(people);

      dispatch({
        type: GET_PEOPLE,
        people: people,
        next_page_available: parsedResults.additional_data.pagination.more_items_in_collection,
        next_page_start: parsedResults.additional_data.pagination.next_start
      })
    })
    .catch(error => {
      // If network failure occured we'll fall back to local storage
      dispatch(getLocalStorage(page, limit));
    })
  }
}

/**
 * Update our local storage using asyncStorage
 * on larger projects we can use other storage library such Realm
 * but for the sake of this test i'll avoid further dependencies
 * 
 * This method accepts 1 parameter which is the people array
 * using AsyncStorage.getItem we will take the previous record and append on it.
 * We'll continue to append as long as we can fetch record from the API
 * @param {*} people 
 */
const updateStorage = (people) => {
  if(people.length > 0) {
    getStoredItem(AS_PEOPLE)
    .then(results => {
      people.map(person => {
        let newResults = [];
        // Let's check if the person ID is not already stored
        if (!results.find(stored => stored.id === person.id)) {
          results.push(person);
        }
      })
      // Let's store the items
      return setStorageItem(AS_PEOPLE, JSON.stringify(results));
    })
    .then(status => {
      console.log("saving status:" + status);
    })
    .catch(error => {
      console.log(error);
    })
  }
}
/**
 * If network requests fail, we'll fall back to local storage
 * To paginate we add the current page value and add the set limit
 * We can slice thru the stored array value paginate based on the array indeces
 * @param {*} page 
 * @param {*} limit 
 */
const getLocalStorage = (page, limit) => {
  let nextPage = page + limit
  return dispatch => {
    getStoredItem(AS_PEOPLE)
    .then(results => {
      let nextStatus = (results.length >= nextPage) ? true : false
      dispatch({
        type: GET_PEOPLE,
        people: nextStatus ? results.slice(page, nextPage) : [],
        next_page_available: nextStatus,
        next_page_start: nextPage
      });
    })
    .catch(error => {
      console.log(error);
    })  
  }
}

/**
 * We'll establish a new person based on the json response from API
 * @param {*} person 
 */
const setNewPerson = (person) => {
  var newPerson = {}
  newPerson.id = person.id;
  // This will generate random photos
  newPerson.image = RANDOM_IMAGE_URL + (Math.floor(Math.random() * 6) + 1) + ".jpg"
  newPerson.company_id = person.company_id;
  newPerson.name = person.name;
  newPerson.first_name = person.first_name;
  newPerson.last_name = person.last_name;
  newPerson.add_time = person.add_time;
  newPerson.first_char = person.first_char;
  newPerson.address = person.org_id.address;
  newPerson.company_name = person.org_id.name;
  newPerson.last_updated = person.update_time;
  person.phone.map((phone) => {
    if(phone.primary) {
      newPerson.phone = phone.value;
    }
  })
  person.email.map((email) => {
    if(email.primary) {
      newPerson.email = email.value;
    }
  }) 
  return newPerson;
}


  //   return AsyncStorage.getItem(PEOPLE)
  //   .then(request => {
  //     console.log("++++++++++++")
  //     /**
  //      * If we're unsuccessful in getting any record
  //      * We'll define a new storage value 
  //      * */ 
  //     if (request) {
  //       // Parse the value
  //       console.log("AM HERE 1")

  //       JSON.parse(request)
  //     } else {
  //       // Let's create the storage
  //       console.log("AM HERE")
  //       const setStorage = setInitialStorage(people);
  //       setStorage.then(value => {
  //         console.log("]]]]]]]]]]]]")
  //         console.log(value)
  //         console.log("]]]]]]]]]]]]")

  //       })
  //       console.log(store)

  //       console.log("AM HERE")

  //     }
  //     console.log(request);
  //     console.log("TEST");
  //   })
  //   .then(json => {
  //     console.log("-----------");
  //     console.log(json)
  //     console.log("TEST 1");

  //   })
  //   .catch(error => console.log('error!'))
  // }
// async _getStorageValue(){
//   var value = await AsyncStorage.getItem('ITEM_NAME')
//   return value
// }

// const setInitialStorage = (people) => {
//   return new Promise((resolve, reject) => {
//     AsyncStorage.setItem(PEOPLE, JSON.stringify(people))
//     .then(result => resolve(true))
//     .catch(error => reject(error))
//   });

//   // try {
//   //   const hh = await AsyncStorage.setItem("TEST", JSON.stringify({test:"test"}))
//   //   return true;
//   // } catch (error) {
//   //   console.log(error.message);
//   // }
//   // return
//   // return AsyncStorage.setItem("TEST", JSON.stringify({test:"test"}))
//   // .then(json => {
    
//   // })
//   // .catch(error => {
//   //   console.log('Failed to set storage!')
//   // });
// }
// parsedResults.data.map
// const people = []
// parsedResults.data.map((person) => {
//       people.push({

//       })
//   }
// })
// active_flag: true
// activities_count: 0
// add_time: "2019-08-28 13:40:42"
// cc_email: "testtask-10d9c6@pipedrivemail.com"
// closed_deals_count: 0
// company_id: 6841362
// done_activities_count: 0
// email: Array(1)
// 0:
// label: "work"
// primary: true
// value: "zacharyibirk@einrot.com"
// __proto__: Object
// length: 1
// __proto__: Array(0)
// email_messages_count: 0
// files_count: 0
// first_char: "z"
// first_name: "Zachary"
// followers_count: 1
// id: 501
// label: null
// last_activity_date: null
// last_activity_id: null
// last_incoming_mail_time: null
// last_name: "Birk"
// last_outgoing_mail_time: null
// lost_deals_count: 0
// name: "Zachary Birk"
// next_activity_date: null
// next_activity_id: null
// next_activity_time: null
// notes_count: 0
// open_deals_count: 0
// org_id: {name: "Test Task", people_count: 501, owner_id: 10197983, address: null, active_flag: true, …}
// org_name: "Test Task"
// owner_id: {id: 10197983, name: "Habagat Reyes", email: "hdvreyes@gmail.com", has_pic: true, pic_hash: "98c8a40c4d6fe34cbe762f47874310d9", …}
// owner_name: "Habagat Reyes"
// participant_closed_deals_count: 0
// participant_open_deals_count: 0
// phone: Array(1)
// 0: {label: "work", value: "320 8279", primary: true}
// length: 1
// __proto__: Array(0)
// picture_id: null
// reference_activities_count: 0
// related_closed_deals_count: 0
// related_lost_deals_count: 0
// related_open_deals_count: 0
// related_won_deals_count: 0
// undone_activities_count: 0
// update_time: "2019-08-28 13:48:34"
// visible_to: "3"
// won_deals_count: 0