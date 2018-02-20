import React from 'react';
import {Layout} from 'antd'

import RouteWithSubRoutes from '../routes/RouteWithSubRoutes';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
function App({routes,auth,dispatch}) {



  return (
    <LocaleProvider locale={enUS}>
          <Layout style={{
            width:'100%',
            marginLeft:'auto',
            marginRight:'auto'
          }}>
            {
              routes.map((route,i)=>{
                return  <RouteWithSubRoutes key={i} {...route}/>
              })
            }
          </Layout>
    </LocaleProvider>

  );
}

function mapStateToProps(state) {
  return {

  };
}


export default connect(mapStateToProps)(App);
