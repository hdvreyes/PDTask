import { AsyncStorage } from 'react-native';
/**
 * Initialize the storay key items
 * @param {*} key 
 * @param {*} value 
 */
export const initializeStorageItems = (key, value) => {
  return AsyncStorage.getItem(key)
    .then((item) => {
      if (!item) {
        setStorageItem(key, value)
      }
    });
}

/**
 * Save values to AsyncStorage
 * @param {*} key 
 * @param {*} value 
 */
export const setStorageItem = (key, value) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, value)
    .then(result => {
      resolve(true)
    })
    .catch(error => reject(error))
  });
}

/**
 * Save values to AsyncStorage
 * @param {*} key 
 * @param {*} value 
 */
export const getStoredItem = (key) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
    .then(result => {
      resolve(JSON.parse(result))
    })
    .catch(error => reject(error))
  });
}
