import { UPDATE_USER_SETTINGS } from '../constants/index';

const initializeSettings = (userSettings) => {
   return {
      type: UPDATE_USER_SETTINGS,
      ...userSettings,
   }
}

const updateSettings = (updatedSettings) => {
   return {
      type: UPDATE_USER_SETTINGS,
      ...updatedSettings,
   }
}

export default {
   initializeSettings,
   updateSettings,
}