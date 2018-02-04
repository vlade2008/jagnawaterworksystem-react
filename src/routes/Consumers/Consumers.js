
import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider ,Button } from 'antd';

import ConsumersForm from './ConsumersForm'

class Consumers extends React.Component {
constructor(props){
  super(props);

  this.state = {
    isModal:false
  }

}

componentWillMount() {
    this.getConsumers();
  }

getConsumers = () =>{
  this.props.dispatch({
      type:'consumers/getAllConsumers'
    });
}



 onOpenModal = () =>{
   this.setState({
     isModal:true
   })
 }

 onCloseModal = () =>{
   this.setState({
     isModal:false
   })
 }

onChangeUrl = url => {
    return () => {
      this.props.history.push(url)
    }
  }

  render() {



    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={this.onChangeUrl('/dashboard/consumers/1232131')}>Action 一 {record.name}</a>
          <Divider type="vertical" />
          <a href="#">Delete</a>
          <Divider type="vertical" />
          <a href="#" className="ant-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }];

    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];

    return (
      <div>
        <Button onClick={this.onOpenModal} style={{marginBottom:10}}>New Consumers</Button>
        <Table columns={columns} dataSource={data} />


        {
          this.state.isModal ?(
            <ConsumersForm isModal={this.state.isModal} onCloseModal={this.onCloseModal} />
          ):null
        }

      </div>
    )
  }
}



function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps)(Consumers)
