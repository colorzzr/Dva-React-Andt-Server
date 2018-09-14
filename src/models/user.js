export default {
  namespace: 'user',

  state: {},

  effects: {

  },
  reducers: {
    saveUser(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
