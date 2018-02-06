import React from 'react';
import {Layout,Menu,Icon} from 'antd'
import {withRouter,routerRedux} from 'dva/router'
import  { connect } from 'dva';
import  { Link } from 'dva/router';

const SideMenu = (props) => {

  let path = props.pathName;
  let keys = props.pathName.split('/').pop();
  let subs = props.pathName.split('/')[2];

  return (
    <Layout.Sider style={{backgroundColor:'white'}}>
      <Menu mode="inline"
        theme="light"
        selectedKeys={[keys]}
        style={{ width: 180 }}
        defaultOpenKeys={['bills']}
      >
        <Menu.Item key="1">
          <Link to={'/dashboard'}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={'/dashboard/consumers'}>Consumers</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={'/dashboard/payment'}>Payment</Link>
        </Menu.Item>


          <Menu.SubMenu key="sub1" title={<span><Icon type="appstore" /><span>Bills</span></span>}>
            <Menu.Item key="6">
              <Link to={'/dashboard/paidbills'}>Paid Bills</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to={'/dashboard/unpaid-biils'}>Unpaid Bills</Link>
            </Menu.Item>

          </Menu.SubMenu>

          <Menu.Item key="8">
            <Link to={'/dashboard/users'}>Users</Link>
          </Menu.Item>

          <Menu.Item key="9">
            <Link to={'/dashboard/consumertypes'}>Consumer Type</Link>
          </Menu.Item>



      </Menu>

    </Layout.Sider>
  );
};


export default connect()(withRouter(SideMenu));
