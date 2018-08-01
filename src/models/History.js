import Parse from 'parse';
// import { toPlainObject } from 'lodash';

export default {
  namespace: 'historyDatas',
  state: {
    historyData: [],
  },
  effects: {
    *fetch({ payload }, { put }) {
      const returnPack = Parse.Object.extend('returnPack');
      const query = new Parse.Query(returnPack);
      query.descending('createdAt');
      const response = yield query.find();

      console.log(response);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
  },

  reducers: {
    saveData(state, { payload }) {
      const historyData = payload.map((v) => {
        const real = v.get('real');
        const imaginary = v.get('imaginary');
        const errorMsg = v.get('errorMsg');
        const createdAt = new Date(v.get('createdAt'));


        return {
          real,
          imaginary,
          errorMsg,
          createdAt: createdAt.toDateString(),
        };
      });

      return {
        ...state,
        historyData,
      };
    },
  },
};
