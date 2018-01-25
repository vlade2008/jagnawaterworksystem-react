import React from 'react';
import { Router } from 'dva/router';
import RouteWithSubRoutes from './routes/RouteWithSubRoutes';
import App from './components/App';
import Main from './components/Main';

import Home from './routes/site/Home';
import AboutUs from './routes/site/AboutUs';
import ConsumerInquiry from './routes/site/ConsumerInquiry'



function RouterConfig({ history }) {

const routes = [
    {
      path: '/',
      component: App,
      routes:[
        {
          path:'/',
          component:Main,
          routes:[
            {
              path:'/',
              component:Home,
              exact:true
            },
            {
              path:'/aboutus',
              component:AboutUs,
              exact:true
            },
            {
              path:'/consumerinquiry',
              component:ConsumerInquiry,
              exact:true
            }
          ]
        }
      ]
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
