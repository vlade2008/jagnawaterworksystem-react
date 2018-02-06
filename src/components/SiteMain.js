import React from 'react';
import { connect } from 'dva';
import {withRouter,routerRedux} from 'dva/router'
import RouteWithSubRoutes from '../routes/RouteWithSubRoutes';
import SideMenu from './SideMenu';
import SiteMenu from "../routes/site/SiteMenu";
import { Layout, Affix } from 'antd';
const {Content } = Layout;



class SiteMain extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
      let islogin = localStorage.getItem('api_key')
      if (islogin) {
        this.props.history.push('/dashboard')
      }
  }



render(){


    let routes = this.props.routes;

       return(
       <Layout style={{backgroundColor:'white'}}>
         <Affix>
           <SiteMenu pathName={location.pathname}/>
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
       )
  }
}

function mapStateToProps(state) {
  return {auth:state.auth};
}



export default connect(mapStateToProps)(SiteMain);
