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
            style={{ width: 256 }}
            defaultOpenKeys={['admin','clinic','subscriptions']}
      >
         <Menu.Item key="1">Option 1</Menu.Item>
         <Menu.Item key="2">Option 2</Menu.Item>


        {/* <Menu.Item key="dashboard"> <Link to={"/my-account"}><Icon type="pie-chart" /> Dashboard</Link></Menu.Item>,
        <Menu.SubMenu key="clinic" title={<div><Icon type="home" /> Clinics</div>}>
          <Menu.Item key="list">
            <Link to={"/my-account/clinic/list"}><Icon type="environment" />Clinic List</Link></Menu.Item>
          <Menu.Item key="users">
            <Link to={"/my-account/clinic/users"}><Icon type="user" />Clinic Users</Link></Menu.Item>
          <Menu.Item key="services">
            <Link to={"/my-account/clinic/services"}><Icon type="profile" />Clinic Services</Link></Menu.Item>
          <Menu.Item key="items">
            <Link to={"/my-account/clinic/items"}><Icon type="schedule" />Clinic Items</Link></Menu.Item>
          <Menu.Item key="suppliers">
            <Link to={"/my-account/clinic/suppliers"}><Icon type="schedule" />Suppliers</Link></Menu.Item>
        </Menu.SubMenu>,
        <Menu.SubMenu key="subscriptions" title={<div><Icon type="shop" /> Subscriptions</div>}>
          <Menu.Item key="active-subsciption">
            <Link to={"/my-account/subscriptions/active-subsciption"}><Icon type="calendar" />Active Subscriptions</Link></Menu.Item>
          <Menu.Item key="cart">
            <Link to={"/my-account/subscriptions/cart"}><Icon type="shopping-cart" /> Cart</Link></Menu.Item>
        </Menu.SubMenu> */}

      </Menu>

    </Layout.Sider>
  );
};


export default connect()(withRouter(SideMenu));
