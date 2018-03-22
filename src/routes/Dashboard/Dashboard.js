
import React from 'react';
import { connect } from 'dva';
import { Row, Col,Card } from 'antd';
import _ from 'lodash'


class Dashboard extends React.Component {


  componentDidMount() {
      this.getConsumers();
    }


  getConsumers = () =>{
    this.props.dispatch({
        type:'consumers/getAllConsumers'
      });

  }

  render(){

    let notConnected = 0
    let connected = 0

    _.map(this.props.consumers.records,(item)=>{
      if (item.status === "0") {
        notConnected = notConnected + 1;
      }
      if (item.status === "1") {
        connected = connected + 1;
      }
    })


    return (
       <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16}>
        <Col span={6}>
          <Card title="Total Consumer" bordered={false}>
            <h1 style={{color:'#52c41a'}}>{this.props.consumers.records.length}</h1>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Consumer Connected" bordered={false}>
            <h1 style={{color:'#52c41a'}}>{connected}</h1>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Consumer Not Connected" bordered={false}>
            <h1 style={{color:'#52c41a'}}>{notConnected}</h1>
          </Card>
        </Col>
      </Row>

      </div>
    );
  }
}




function mapStateToProps(state){
  return {
    consumers:state.consumers
  }
}

export default connect(mapStateToProps)(Dashboard)
