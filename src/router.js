// import React from 'react';
// import { Router } from 'dva/router';

// const cached = {};
// function registerModel(app, model) {
//   if (!cached[model.namespace]) {
//     app.model(model);
//     cached[model.namespace] = 1;
//   }
// }

// function RouterConfig({ history, app }) {
//   const routes = [
//     {
//       path: '/',
//       name: 'IndexPage',
//       getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//           cb(null, require('./routes/IndexPage'));
//         });
//       },
//     },
//     {
//       path: '/users',
//       name: 'UsersPage',
//       getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//           registerModel(app, require('./models/users'));
//           cb(null, require('./routes/Users'));
//         });
//       },
//     },
//     {
//       path: '/counter',
//       name: 'CounterTop',
//       getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//           registerModel(app, require('./models/CounterMod'));
//           cb(null, require('./routes/Counter'));
//         });
//       },
//     },
//     {
//       path: '/Calculator',
//       name: 'Calculator',
//       getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//           cb(null, require('./routes/Calculator'));
//         });
//       },
//     },
//     {
//       path: '/History',
//       name: 'History',
//       getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//           registerModel(app, require('./models/History'));
//           cb(null, require('./routes/History'));
//         });
//       },
//     }, {
//       path: '/Login',
//       name: 'Login',
//       getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//           cb(null, require('./routes/Login'));
//         });
//       },
//     },
//   ];

//   return <Router history={history} routes={routes} />;
// }

// export default RouterConfig;

import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import CounterTop from './routes/Counter';
import Users from './routes/Users';
import Calculator from './routes/Calculator';
import History from './routes/History';
import Login from './routes/Login';
import RegisterPage from './routes/Register';
import TubeGame from './routes/Tunel Game/TubeGame.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/counter" exact component={CounterTop} />
        <Route path="/users" exact component={Users} />
        <Route path="/Calculator" exact component={Calculator} />
        <Route path="/History" exact component={History} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Register" exact component={RegisterPage} />
        <Route path="/TunelGame" exact component={TubeGame} />

      </Switch>
    </Router>
  );
}

export default RouterConfig;
