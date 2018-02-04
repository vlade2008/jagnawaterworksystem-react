
import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider ,Button } from 'antd';
import UserForm from './UserForm'

class Users extends React.Component {
constructor(props){
  super(props);

  this.state = {
    isModal:false
  }
}


componentWillMount() {
    this.getUsers();
  }

getUsers = () =>{
  this.props.dispatch({
      type:'users/getAllUsers'
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

  onEdit = (idx) =>{
    return (value)=>{
        console.log(idx,'index');
    }
  }

  onDelete = (idx) =>{
    return (value)=>{
        console.log(idx,'index');
    }
  }


  render() {

    const columns = [{
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: 'Userlevel',
      dataIndex: 'userlevel',
      key: 'userlevel',
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


  let data = _.map(this.props.users.records,(item,i)=>{
    item.key = i
    return item
  })

    return (
      <div>
          <Button onClick={this.onOpenModal} style={{marginBottom:10}}>New Users</Button>

          <Table columns={columns} dataSource={data} />


        {
          this.state.isModal ?(
            <UserForm isModal={this.state.isModal} onCloseModal={this.onCloseModal} />
          ):null
        }



      </div>
    )
  }
}



function mapStateToProps(state){
  return {
    users:state.users
  }
}

export default connect(mapStateToProps)(Users)
