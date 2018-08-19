import Parse from 'parse';
// import { toPlainObject } from 'lodash';

export default {
  namespace: 'historyDatas',
  state: {
    historyData: [],
    count: 0,
    frequenceData: [],
  },
  effects: {
    *count(_, { put }) {
      const returnPack = Parse.Object.extend('returnPack');
      const query = new Parse.Query(returnPack);
      const count = yield query.count();
      yield put({
        type: 'save',
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

    *fetchFrequence(_, { put }) {
      const returnPack = Parse.Object.extend('returnPack');

      let pipeline = {};
      // ----------------------------------------voltage pipelining-------------------------------
      pipeline = {
        group: {
          date: 'date',
          count: { sum: 1 },
        },
      };
      const dateQ = new Parse.Query(returnPack);
      let frequenceData = yield dateQ.aggregate(pipeline);
      

      frequenceData.push({count:3, date:"2018-July-9"});
      console.log(frequenceData);

      yield put({
        type: 'save',
        payload: { frequenceData },
      });
    }
  },

  reducers: {
    save(state, { payload }) {
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
        const date = v.get('date');
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
          createdAt: date,
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
