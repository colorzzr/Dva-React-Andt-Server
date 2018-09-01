import { routerRedux } from 'dva/router';

export default {
  namespace: 'login',

  state: {
    status: false,
  },
  effects: {
    *login(_, { put }) {
      yield put(routerRedux.push('/Login'));
    },

  },

  reducers: {

  },
};
