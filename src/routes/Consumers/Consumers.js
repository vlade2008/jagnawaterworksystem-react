
import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider ,Button,Modal } from 'antd';

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
      // this.props.history.push(url)
    }
  }


  onEdit = (idx) =>{
    return (value)=>{
        this.setState({
          isModal:true
        },()=>{
          this.props.dispatch({
              type:'consumers/updateFormInput',
              payload:this.props.consumers.records[idx],
              callback:this.getConsumers
            });
        })

    }
  }

  onDelete = (idx) =>{
    return (value)=>{
      let modalDialog = null
      modalDialog = Modal.confirm({
        title: 'Are you sure delete this task?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk:()=> {
          this.props.dispatch({
              type:'consumers/deleteConsumers',
              id:this.props.consumers.records[idx].account_no,
              callback:this.getConsumers
            });
        },
        onCancel:()=> {
          console.log('Cancel');
        },
      });
    }
  }


  render() {



    const columns = [{
      title: 'Last Name',
      dataIndex: 'lname',
      key: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>

          <a onClick={this.onEdit(record.key)}>Edit</a>
          <Divider type="vertical" />
          <a onClick={this.onDelete(record.key)}>Delete</a>
          {/* <a onClick={this.onChangeUrl('/dashboard/consumers/1232131')}>Action 一 {record.name}</a>
          <a onClick={this.onChangeUrl(record)}>Action 一 {record.name}</a>
          <Divider type="vertical" />
          <a href="#">Delete</a>
          <Divider type="vertical" />
          <a href="#" className="ant-dropdown-link">
            More actions <Icon type="down" />
          </a> */}
        </span>
      ),
    }];

    let data = _.map(this.props.consumers.records,(item,i)=>{
      item.key = i
      return item
    })

    return (
      <div>
        <Button onClick={this.onOpenModal} style={{marginBottom:10}}>New Consumers</Button>
        <Table columns={columns} dataSource={data} />


        {
          this.state.isModal ?(
            <ConsumersForm isModal={this.state.isModal} onCloseModal={this.onCloseModal} getConsumers={this.getConsumers} />
          ):null
        }

      </div>
    )
  }
}



function mapStateToProps(state){
  return {
    consumers:state.consumers
  }
}

export default connect(mapStateToProps)(Consumers)
