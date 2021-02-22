import { UPDATE_USER_SETTINGS } from '../constants/index';
import { updateUserSettings } from '../api';

const initializeSettings = (userSettings) => {
   return {
      type: UPDATE_USER_SETTINGS,
      newUserSettings: userSettings,
   }
}

const updateSettings = (newUserSettings) => {
   return (dispatch) => {
      updateUserSettings(newUserSettings)
   
      dispatch({
         type: UPDATE_USER_SETTINGS,
         newUserSettings,
      });
   }
}

export default {
   initializeSettings,
   updateSettings,
}