import React from 'react';
import { connect } from 'dva';
import {Layout, Menu, Icon,Avatar,Dropdown} from 'antd';
import  { Link } from 'dva/router';
import _ from 'lodash'
const { Header } = Layout;



class SiteMenu extends React.Component{
  constructor(props){
    super(props);

    this.state={
      current:'/'
    }
  }

  handleClick = (e) => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  onlogout = () =>{
    localStorage.removeItem("api_key");
    localStorage.removeItem("userlevel")
    localStorage.removeItem("authID")
    this.props.dispatch({
      type:'auth/logout'
    });


  }


render(){


  let islogin = !_.isEmpty(localStorage.getItem('api_key')) ? true : false


  let path = this.props.pathName;
  const content = (
    <Menu>
      <Menu.Item>
      <span type={"dashed"} onClick={this.onlogout}>Logout</span>
      </Menu.Item>

    </Menu>
  );

       return(
      <Header style={{width: '100%', zIndex: '9',backgroundColor:'white'}}>
        <div className="logo" style={{float:'left'}}>
          <h2 style={{color:'#108ee9'}}>JAGNA WATERWORKS SYSTEM (JWS)</h2>
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[path]}
          style={{lineHeight: '64px',float:'right'}}
          mode="horizontal"
        >
          <Menu.Item style={{color:'#108ee9'}}></Menu.Item>

          {
            !islogin ? (
              <Menu.Item key="/">
                <Link to={"/"}><Icon type="home" />Home</Link>
              </Menu.Item>
            ): null
          }

          {!islogin ?
            (<Menu.Item key="/register">
              <Link to={"/aboutus"}><Icon type="schedule" />About us</Link>
            </Menu.Item>)
            :null
          }
          {!islogin ?
            (<Menu.Item key="/cart">
            <Link to={"/consumerinquiry"}><Icon type="shopping-cart" />Consumer Inquiry</Link>
          </Menu.Item>)
            :null
          }


          <Menu.Item key="/login">
                         {islogin?
                           <Dropdown overlay={content}>
                             <a className="ant-dropdown-link" href="">
                               <Avatar style={{verticalAlign: 'middle'}} icon="user" />
                               <Icon type="down" />
                             </a>
                           </Dropdown>
                           :
                           <Link to={"/login"}><Icon type="user" />Login</Link>}
          </Menu.Item>
        </Menu>
      </Header>
    )
  }
}

function mapStateToProps(state) {
  return {auth:state.auth};
}

export default connect(mapStateToProps)(SiteMenu);
