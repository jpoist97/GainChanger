import settingsReducer from '../../reducers/settingsReducer';
import { UPDATE_USER_SETTINGS } from '../../constants/index';

const expectedInitialState = {
    enableRestNotifications: false,
    restNotificationTimer: 60,
    colorTheme: 'default',
 }

describe('settingsReducer tests', () => {
    it('should have proper initial state', () => {
    // Arrange

    // Act
    const initialState = settingsReducer(undefined, {});

    // Assert
    expect(initialState).toEqual(expectedInitialState);
});

describe('UPDATE_USER_SETTINGS tests', () => {
    it('should update setting fields in store to action fields', () => {
      // Arrange
      const action = {
          type: UPDATE_USER_SETTINGS,
          newUserSettings: {
            enableRestNotifications: true,
            restNotificationTimer: 20,
            colorTheme: 'aqua',
          },
      }

      // Act
      const updatedSettings = settingsReducer(expectedInitialState, action);

      // Assert
      expect(updatedSettings).toEqual(
          {
            enableRestNotifications: true,
            restNotificationTimer: 20,
            colorTheme: 'aqua',
      });
    });
    
  });

})