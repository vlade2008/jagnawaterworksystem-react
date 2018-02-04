import React from 'react';
import { connect } from 'dva';
import {withRouter,routerRedux} from 'dva/router'
import RouteWithSubRoutes from '../routes/RouteWithSubRoutes';
import SideMenu from './SideMenu';
import SiteMenu from "../routes/site/SiteMenu";
import { Layout, Affix } from 'antd';
const {Content } = Layout;



class Main extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
      let islogin = !_.isEmpty(localStorage.getItem('api_key')) ? true : false
      if (!islogin) {
        this.props.history.push('/')
      }
  }



render(){


    let routes = this.props.routes;

       return(
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
       )
  }
}

function mapStateToProps(state) {
  return {auth:state.auth};
}



export default connect(mapStateToProps)(Main);
