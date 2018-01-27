import React from 'react';
import { Router } from 'dva/router';
import RouteWithSubRoutes from './routes/RouteWithSubRoutes';
import App from './components/App';
import Main from './components/Main';
import SiteMain from './components/SiteMain'

import Home from './routes/site/Home';
import AboutUs from './routes/site/AboutUs';
import ConsumerInquiry from './routes/site/ConsumerInquiry'
import Login from './routes/Login/Login'


/// Admin file
import Dashboard from './routes/Dashboard/Dashboard'
import Consumers from './routes/Consumers/Consumers'
import ConsumersContainer from './routes/Consumers/ConsumersContainer'


function RouterConfig({ history }) {

const routes = [
    {
      path: '/',
      component: App,
      routes:[
        {
          path:'/',
          component:SiteMain,
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
            },
            {
              path:'/login',
              component:Login,
              exact:true
            },
            {
              path:'/dashboard',
              exact:false,
              component:Main,
              routes:[
                {
                  path:'/dashboard',
                  exact:true,
                  component:Dashboard
                },
                {
                  path:'/dashboard/consumers',
                  exact:false,
                  component:ConsumersContainer,
                  routes:[{
                    path:'/dashboard/consumers',
                    exact:true,
                    component:Consumers
                  }]
                },
              ]
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
