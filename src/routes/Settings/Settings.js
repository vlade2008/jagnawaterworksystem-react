
import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider ,Button,List,Avatar,Tabs } from 'antd';
const TabPane = Tabs.TabPane

import Users from '../Users/Users'
import ConsumerTypes from '../ConsumerTypes/ConsumerTypes'
import Due from '../Due/Due'
import ServicePeriod from '../ServicePeriod/ServicePeriod'


class Settings extends React.Component {
constructor(props){
  super(props);

  this.state = {
    isModal:false
  }
}

  render() {




    return (
      <div>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Users" key="1">
            <Users  {...this.props}/>
          </TabPane>
          <TabPane tab="Consumer Types" key="2">
            <ConsumerTypes {...this.props} />
          </TabPane>
          <TabPane tab="Due Date" key="3">
            <Due {...this.props} />
          </TabPane>
          <TabPane tab="Service Period" key="4">
            <ServicePeriod {...this.props} />
          </TabPane>
        </Tabs>



      </div>
    )
  }
}



function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(Settings)
