import { routerRedux } from 'dva/router';
import Parse from 'parse';

export default {
  namespace: 'login',

  state: {
    status: false,
  },
  effects: {
    *login({ payload }, { put }) {
      // yield put(routerRedux.push('/Login'));
      const { userName, password } = payload;
      try {
        const user = yield Parse.User.logIn(userName, password);
        console.log(user);
        yield put(routerRedux.push('/'));
      } catch (error) {
        console.log(error);
      }
    },
    *register() {
      console.log('Register');
      const user = new Parse.User();
      user.set('username', 'test');
      user.set('password', '123456');

      try {
        yield user.signUp();
        // Hooray! Let them use the app now.
      } catch (error) {
        // Show the error message somewhere and let the user try again.
        console.log(`Error: ${error.code} ${error.message}`);
      }
    },

  },

  reducers: {

  },
};
