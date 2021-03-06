import React from 'react';
import { Router } from 'dva/router';
import {adminOnly} from './utils/AuthComponent';
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
import ConsumersBills from './routes/Consumers/ConsumersBills'

//Print
import StatementAccounts from './routes/Printing/StatementAccounts'
import Monthlybillprint from './routes/Printing/Monthlybillprint'

//users
import Users from './routes/Users/Users'

//department
import ConsumerTypes from './routes/ConsumerTypes/ConsumerTypes'

//settings
import Settings from './routes/Settings/Settings';

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
                  exact:true,
                  component:Consumers,
                },
                {
                  path:'/dashboard/consumers/:id',
                  exact:true,
                  component:ConsumersBills,
                },
                {
                  path:'/dashboard/settings',
                  exact:true,
                  component:adminOnly(Settings)
                },
                {
                  path:'/dashboard/statementaccounts',
                  exact:true,
                  component:StatementAccounts
                },
                {
                  path:'/dashboard/monthlybill',
                  exact:true,
                  component:Monthlybillprint
                }
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
