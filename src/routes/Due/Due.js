
import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider ,Button,Modal } from 'antd';
import DueForm from './DueForm'

class Due extends React.Component {
constructor(props){
  super(props);

  this.state = {
    isModal:false
  }
}


componentWillMount() {
    this.getDue();
  }

getDue = () =>{
  this.props.dispatch({
      type:'due/getAllDue'
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
      title: 'Due Date Day',
      dataIndex: 'due_date_day',
      key: 'due_date_day'
    }, {
      title: 'Due Date Time',
      dataIndex: 'due_date_time',
      key: 'due_date_time',
    }];


  let data = _.map(this.props.due.records,(item,i)=>{
    item.key = i
    return item
  })


    return (
      <div>

          <Button onClick={this.onOpenModal} style={{marginBottom:10}}>New Due</Button>
          <Table columns={columns} dataSource={data}  />


        {
          this.state.isModal ?(
            <DueForm isModal={this.state.isModal} onCloseModal={this.onCloseModal} getDue={this.getDue}  />
          ):null
        }



      </div>
    )
  }
}



function mapStateToProps(state){
  return {
    due:state.due
  }
}

export default connect(mapStateToProps)(Due)
