
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


  clearUpdateForm = () =>{
    this.props.dispatch({
        type:'consumers/updateFormInput',
        payload:'clear'
      });
  }

 onOpenModal = () =>{
   this.clearUpdateForm();
   this.setState({
     isModal:true
   })
 }

 onCloseModal = () =>{
   this.setState({
     isModal:false
   })
 }

onChangeUrl = key => {
    return () => {
      let id = this.props.consumers.records[key].account_no;
      this.props.dispatch({
          type:'consumers/updateFormInput',
          payload:this.props.consumers.records[key],
          callback:this.props.history.push(`/dashboard/consumers/${id}`)
        });

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
          <a onClick={this.onChangeUrl(record.key)}>View</a>
          <Divider type="vertical" />
          <a onClick={this.onEdit(record.key)}>Edit</a>
          <Divider type="vertical" />
          <a onClick={this.onDelete(record.key)}>Delete</a>
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
