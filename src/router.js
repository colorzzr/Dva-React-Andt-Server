import React from 'react';
import { Router } from 'dva/router';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      name: 'IndexPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/IndexPage'));
        });
      },
    },
    {
      path: '/users',
      name: 'UsersPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/users'));
          cb(null, require('./routes/Users'));
        });
      },
    },
    {
      path: '/counter',
      name: 'CounterTop',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/CounterMod'));
          cb(null, require('./routes/Counter'));
        });
      },
    },
    {
      path: '/Calculator',
      name: 'Calculator',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/Calculator'));
        });
      },
    },
    {
      path: '/History',
      name: 'History',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/History'));
          cb(null, require('./routes/History'));
        });
      },
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
