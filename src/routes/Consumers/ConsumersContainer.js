import React from 'react';
import {Layout} from 'antd'
import RouteWithSubRoutes from '../RouteWithSubRoutes';

function Clinics({routes}) {

  return (
    <Layout style={{backgroundColor:'white'}}>
      <Layout.Content style={{backgroundColor:'white', marginLeft:'10px'}}>
        {
          routes.map((route,i)=>{
            return  <RouteWithSubRoutes key={i} {...route}/>
          })
        }
      </Layout.Content>
    </Layout>
  );

}

export default Clinics;
