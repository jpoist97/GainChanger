import settingsActions from '../../actions/settingsActions';
import { UPDATE_USER_SETTINGS } from '../../constants/index';

const mockDispatch = jest.fn();

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
    describe('update settings tests', () => {
        it('should update settings', () => {
           // Arrange 
           const newUserSettings = {enableRestNotifications: true, restNotificationTimer: 60, colorTheme: 'aqua'};
         
           // Act
           const thunkFunction = settingsActions.updateSettings(newUserSettings);
           thunkFunction(mockDispatch);
  
           // Assert
           expect(mockDispatch).toHaveBeenCalledWith({
             type: UPDATE_USER_SETTINGS,
             newUserSettings,
           })
        });
     });
 });