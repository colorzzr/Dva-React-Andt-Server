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
        // const user = yield Parse.User.logIn(userName, password);
        const curUser = yield Parse.User.logIn(userName, password);
        yield put(routerRedux.push('/'));
        console.log(curUser);
        yield put({
          type: 'LoggedIn',
        });

        // save user
        yield put({
          type: 'user/saveUser',
          payload: {
            userName: curUser.get('username'),
          },
        });

        // Parse.User.become("session-token-here").then(function (user) {
        //   console.log(user);
        // }, function (error) {
        //   console.log(error);
        // });
      } catch (error) {
        console.log(error);
      }
    },
    *register({ payload }, { put }) {
      const user = new Parse.User();
      const { userName, password } = payload;
      user.set('username', userName);
      user.set('password', password);

      try {
        yield user.signUp();
        yield put(routerRedux.push('/Login'));
        // Hooray! Let them use the app now.
      } catch (error) {
        // Show the error message somewhere and let the user try again.
        console.log(`Error: ${error.code} ${error.message}`);
      }
    },
    *needLogin(_, { put }) {
      yield put(routerRedux.push('/Login'));
    },

  },

  reducers: {
    LoggedIn(state) {
      return {
        ...state,
        status: true,
      };
    },
  },
};
