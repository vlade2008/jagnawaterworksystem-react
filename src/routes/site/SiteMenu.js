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


render(){

  let path = this.props.pathName;
  const content = (
    <Menu>
      <Menu.Item>
      <span type={"dashed"} icon={"appstore-o"}
              onClick={()=> {
                this.props.dispatch({
                  type: 'auth/loginSuccess'
                });
              }}>Dashboard</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
      <span type={"dashed"} onClick={()=>{

        this.props.dispatch({
          type:'auth/logout'
        });


      }}>Logout</span>
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
            !this.props.logintest ? (
              <Menu.Item key="/">
                <Link to={"/"}><Icon type="home" />Home</Link>
              </Menu.Item>
            ): null
          }

          {!_.get(this.props.auth,'account.login','')  && !this.props.logintest ?
            (<Menu.Item key="/register">
              <Link to={"/aboutus"}><Icon type="schedule" />About us</Link>
            </Menu.Item>)
            :null
          }
          {!_.get(this.props.auth,'account.login','') && !this.props.logintest ?
            (<Menu.Item key="/cart">
            <Link to={"/consumerinquiry"}><Icon type="shopping-cart" />Consumer Inquiry</Link>
          </Menu.Item>)
            :null
          }


          <Menu.Item key="/login">
                         {_.get(this.props.auth,'account.login','') || this.props.logintest ?
                           <Dropdown overlay={content}>
                             <a className="ant-dropdown-link" href="">
                               <Avatar style={{lineHeight: '64px',verticalAlign: 'middle',marginRight:'10px'}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                               {_.get(this.props.auth,'account.login','')}<Icon type="down" />
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
