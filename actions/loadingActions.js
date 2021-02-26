import { 
   RESET_LOAD_STORE,
} from '../constants/index';

const resetLoadStore = () => {
   return {
      type: RESET_LOAD_STORE,
   }
}

export default {
   resetLoadStore,
}