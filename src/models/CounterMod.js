export default {
  namespace: 'counterMod',
  state: 0,
  reducers: {
    add(state) {
    // state = state + 1;
      return state + 1;
    },
    minus(state) {
      return state - 1;
    },
  },
};
