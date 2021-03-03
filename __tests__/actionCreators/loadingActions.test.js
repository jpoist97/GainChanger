import loadingActions from '../../actions/loadingActions';
import { RESET_LOAD_STORE } from '../../constants/index';

describe('loadingActions tests', () => {
   describe('resetLoadingStore tests', () => {
      it('should dispatch RESET_LOAD_STORE', () => {
         // Arrange 

         // Act
         const action = loadingActions.resetLoadStore();

         // Assert
         expect(action).toEqual({
            type: RESET_LOAD_STORE,
         })
      });
   });
});