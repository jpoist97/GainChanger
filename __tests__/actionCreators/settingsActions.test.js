import settingsActions from '../../actions/settingsActions';
import { UPDATE_USER_SETTINGS } from '../../constants/index';

describe('settingsActions tests', () => {
    describe('initialize settings tests', () => {
       it('should initialize settings', () => {
          // Arrange 
          const userSettings = {enableRestNotifications: true, restNotificationTimer: 60, colorTheme: 'aqua'};
        
          // Act
          const action = settingsActions.initializeSettings(userSettings);
 
          // Assert
          expect(action).toEqual({
            type: UPDATE_USER_SETTINGS,
            newUserSettings: userSettings,
          })
       });
    });
    // describe('update settings tests', () => {
    //     it('should update settings', () => {
    //        // Arrange 
    //        const newUserSettings = {enableRestNotifications: true, restNotificationTimer: 60, colorTheme: 'aqua'};
         
    //        // Act
    //        const action = settingsActions.updateSettings(newUserSettings);
  
    //        // Assert
    //        expect(action).toEqual({
    //          type: UPDATE_USER_SETTINGS,
    //          newUserSettings,
    //        })
    //     });
    //  });
 });