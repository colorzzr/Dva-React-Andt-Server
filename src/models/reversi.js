export default {
  namespace: 'reversi',
  state: {
    map: [],
    playerPoint: 2,
    AIPoint: 2,
    winner: '',
  },

  effects: {
    *saveMatchInfo({ payload }, { put }) {
// console.log(payload);
// const {curMoveStr, map} = payload;
// const obj = {
//     Move: curMoveStr,
//     Map: map,
//   };

//   // let Board;
//   let Board, UserPoint, AIPoint, Winner;
//   // $.post('http://localhost:8007/Reversi', {
//   $.post('http://18.223.112.55:8007/Reversi', {
//     first: JSON.stringify(obj),
//   },
//   (data) => {
//   // change back to json
//     let sendBackData = JSON.parse(data);

//   // IDK why this is so magic that I need convert from []byte->string->json
//     sendBackData = JSON.parse(sendBackData);
//     // const { UserPoint, AIPoint, Winner } = sendBackData;

//     Board = sendBackData.Board;
//     UserPoint = sendBackData.UserPoint;
//     AIPoint = sendBackData.AIPoint;
//     Winner = sendBackData.Winner;
//     console.log(Board, UserPoint, AIPoint, Winner);

//   });

      yield put({
        type: 'save',
        payload: {
          ...payload,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      console.log(payload);
      const { map, playerPoint, AIPoint, winner } = payload;
      return ({
        ...state,
        map,
        playerPoint,
        AIPoint,
        winner,
      });
    },
  },

};
