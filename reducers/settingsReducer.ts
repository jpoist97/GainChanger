import { UPDATE_USER_SETTINGS } from '../constants/index';

const initialState = {
   enableRestNotifications: false,
   restNotificationTimer: 60,
   colorTheme: 'default',
};

const settingsReducer = (state = initialState, action) => {
   switch (action.type) {
      case UPDATE_USER_SETTINGS:
         return {
            ...state,
            ...action.newUserSettings,
         };
      default:
         return state;
   }
};

export default settingsReducer;
