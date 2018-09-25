export default {
  namespace: 'counterMod',
  state: {
    count:0,
  },
  effects:{
    *add(_, { put }){
      yield put({
        type: 'addCount',
      });
    },
    *minus(_, { put }){
      yield put({
        type: 'minusCount',
      });
    }
  },


  reducers: {
    addCount(state) {
    // state = state + 1;
      let {count} = state;
      count = count + 1
      return {
        count,
      };
    },
    minusCount(state) {
      let {count} = state;
      count = count - 1
      return {
        count,
      };
    },
  },
};
