import { createStore } from 'vuex';
import auth from './modules/auth';
import event from './modules/event';
import user from './modules/user';

export default createStore({
  modules: {
    auth,
    event,
    user,
  },
});
