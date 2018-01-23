import React from 'react';
import { Router } from 'dva/router';
import IndexPage from './routes/IndexPage';
import RouteWithSubRoutes from './routes/RouteWithSubRoutes';

function RouterConfig({ history }) {

const routes = [
    {
      path: '/',
      exact: false,
      component: IndexPage,
    }
  ];	


  return (
    <Router history={history}>
      <div>
        <div>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route}/>
          ))}
        </div>
      </div>
    </Router>
  );
}

export default RouterConfig;
