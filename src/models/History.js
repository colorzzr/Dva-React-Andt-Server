import Parse from 'parse';
// import { toPlainObject } from 'lodash';

export default {
  namespace: 'history',
  state: {
    historyData: [],
  },
  effects: {
    *fetch({ payload }, { put }) {
      const returnPack = Parse.Object.extend('returnPack');
      const query = new Parse.Query(returnPack);
      query.descending('createdAt');
      const response = yield query.find();

      yield put({
        type: 'saveData',
        payload: response,
      });
    },
  },

  reducers: {
    saveData(state) {
      // const historyData = payload.map((v) => {
        // return _.toPlainObject(v);
      // });

      return {
        ...state,
        // historyData,
      };
    },
  },
};
