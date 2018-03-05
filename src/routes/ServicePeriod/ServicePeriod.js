
import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider ,Button,Modal } from 'antd';
import ServicePeriodForm from './ServicePeriodForm'

class ServicePeriod extends React.Component {
constructor(props){
  super(props);

  this.state = {
    isModal:false
  }
}


  componentWillMount() {
      this.getServicePeriod();
    }

  getServicePeriod = () =>{
    this.props.dispatch({
        type:'service_period/getAllServicePeriod'
      });
  }




  onOpenModal = () =>{
    this.props.dispatch({
      type:'due/updateFormInput',
      payload: 'clear',
    });
    this.setState({
      isModal:true
    })
  }


  onCloseModal = () =>{
    this.setState({
      isModal:false
    })
  }

  render() {

    const columns = [{
      title: 'Service Period',
      dataIndex: 'service_period',
      key: 'service_period'
    }];


  let data = _.map(this.props.service_period.records,(item,i)=>{
    item.key = i
    return item
  })



    return (
      <div>

          <Button onClick={this.onOpenModal} style={{marginBottom:10}}>New Service Period</Button>
          <Table columns={columns} dataSource={data}  />


        {
          this.state.isModal ?(
            <ServicePeriodForm isModal={this.state.isModal} onCloseModal={this.onCloseModal} getServicePeriod={this.getServicePeriod}  />
          ):null
        }



      </div>
    )
  }
}



function mapStateToProps(state){
  return {
    service_period:state.service_period
  }
}

export default connect(mapStateToProps)(ServicePeriod)
