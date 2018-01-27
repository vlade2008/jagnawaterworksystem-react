import React from 'react';
import RouteWithSubRoutes from '../routes/RouteWithSubRoutes';
import SiteMenu from "../routes/site/SiteMenu";
import { Layout, Affix } from 'antd';
const {Content } = Layout;


function SiteMain({routes}) {
  return (

    <Layout style={{backgroundColor:'white'}}>
      <Affix>
         {/* for test only  // if login justt TRUE=logintest FALSE=logintest */}
        <SiteMenu pathName={location.pathname} logintest={true}/>
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

export default SiteMain;