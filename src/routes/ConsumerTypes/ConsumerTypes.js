
import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider ,Button,Modal } from 'antd';
import ConsumerTypesForm from './ConsumerTypesForm'

class ConsumerTypes extends React.Component {
constructor(props){
  super(props);

  this.state = {
    isModal:false
  }
}


componentWillMount() {
    this.getConsumerType();
  }

getConsumerType = () =>{
  this.props.dispatch({
      type:'consumertypes/getAllConsumertypes'
    });
}




  onOpenModal = () =>{
    this.props.dispatch({
      type:'consumertypes/updateFormInput',
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

  onEdit = (idx) =>{
    return (value)=>{
        this.setState({
          isModal:true
        },()=>{
          this.props.dispatch({
              type:'consumertypes/updateFormInput',
              payload:this.props.consumertypes.records[idx]
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
              type:'consumertypes/deleteConsumerTypes',
              id:this.props.consumertypes.records[idx].id,
              callback:this.getConsumerType
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
      title: 'Consumer Type',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record,idx) => (
        <span>
          <a onClick={this.onEdit(record.key)}>Edit</a>
          <Divider type="vertical" />
          <a onClick={this.onDelete(record.key)}>Delete</a>
        </span>
      ),
    }];


  let data = _.map(this.props.consumertypes.records,(item,i)=>{
    item.key = i
    return item
  })

    return (
      <div>

          <Button onClick={this.onOpenModal} style={{marginBottom:10}}>New Type</Button>
          <Table columns={columns} dataSource={data}  />


        {
          this.state.isModal ?(
            <ConsumerTypesForm isModal={this.state.isModal} onCloseModal={this.onCloseModal} getConsumerType={this.getConsumerType}  />
          ):null
        }



      </div>
    )
  }
}



function mapStateToProps(state){
  return {
    consumertypes:state.consumertypes
  }
}

export default connect(mapStateToProps)(ConsumerTypes)
