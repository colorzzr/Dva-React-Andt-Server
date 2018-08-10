import Parse from 'parse';
// import { toPlainObject } from 'lodash';

export default {
  namespace: 'historyDatas',
  state: {
    historyData: [],
    count: 0,
  },
  effects: {
    *count(_, { put }) {
      const returnPack = Parse.Object.extend('returnPack');
      const query = new Parse.Query(returnPack);
      const count = yield query.count();
      yield put({
        type: 'saveCount',
        payload: { count },
      });
    },
    *fetch({ payload }, { put }) {
      const returnPack = Parse.Object.extend('returnPack');
      const query = new Parse.Query(returnPack);
      const { skip, limit } = payload;

      query.descending('createdAt');
      query.limit(limit);
      query.skip(skip);

      const response = yield query.find();

      console.log(payload);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
  },

  reducers: {
    saveCount(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveData(state, { payload }) {
      const historyData = payload.map((v) => {
        const real = v.get('real');
        const imaginary = v.get('imaginary');
        const errorMsg = v.get('errorMsg');
        const createdAt = new Date(v.get('createdAt'));
        const operationModeIndex = v.get('operationMode');
        let operationMode;
        if (operationModeIndex === 0) {
          operationMode = 'Normal Mode';
        } else if (operationModeIndex === 1) {
          operationMode = 'Imaginery Mode';
        } else {
          operationMode = 'Absolute Mode';
        }
        // using create at to generate unique keys
        const key = createdAt.getTime();

        return {
          real,
          imaginary,
          errorMsg,
          createdAt: createdAt.toDateString(),
          operationMode,
          key,

        };
      });

      return {
        ...state,
        historyData,
      };
    },
  },
};
