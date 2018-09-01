import dva from 'dva';
import Parse from 'parse';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';
import './index.html';
import './index.css';


const ERROR_MSG_DURATION = 3; // 3 秒

Parse.initialize('Calculator', 'UpdKbelU7zvtsCCW', 'jQAr0Xqhbkw45mSW');
// change URL to server ip not localhost
Parse.serverURL = 'http://18.222.148.18:8080/v1';
// Parse.serverURL = 'http://127.0.0.1:8080/v1';

Parse.masterKey = 'jQAr0Xqhbkw45mSW';

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// Moved to router.js
app.model(require('./models/CounterMod.js'));
app.model(require('./models/History.js'));
app.model(require('./models/users.js'));
app.model(require('./models/login.js'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
