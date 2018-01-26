import React from 'react';
import RouteWithSubRoutes from '../routes/RouteWithSubRoutes';
import SideMenu from './SideMenu';
import SiteMenu from "../routes/site/SiteMenu";
import { Layout, Affix } from 'antd';
const {Content } = Layout;


function Main({routes}) {
  return (

    <Layout style={{backgroundColor:'white'}}>
      <Affix>
        <SideMenu pathName={location.pathname}/>
      </Affix>

      <Layout>
        <Content style={{backgroundColor:'white'}}>
          {
            routes.map((route,i)=>{
              return  <RouteWithSubRoutes key={i} {...route} />
            })
          }
        </Content>
      </Layout>
      {/* <Footer>
        <Col span={5}></Col>
        <Col span={14}>
          Footer Here
        </Col>
        <Col span={5}></Col>
      </Footer> */}
    </Layout>
  );

}

export default Main;
