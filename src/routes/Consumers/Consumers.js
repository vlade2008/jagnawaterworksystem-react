
import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider ,Button,Modal,Input,Avatar } from 'antd';

import ConsumersForm from './ConsumersForm'

class Consumers extends React.Component {
constructor(props){
  super(props);

  this.state = {
    isModal:false,
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    userlevel: localStorage.getItem('userlevel')
  }

}

componentDidMount() {
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

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }

  onSearch = () => {
    const { searchText } = this.state;
    if (_.isEmpty(searchText)) {
      this.getConsumers();
    }else {
      const reg = new RegExp(searchText, 'gi');
      this.setState({
          filterDropdownVisible: false,
          filtered: !!searchText,
        });

        let data = this.props.consumers.records.map((record) => {
          const match = record.lname.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record
          };
        }).filter(record => !!record)

        this.props.dispatch({
          type:'consumers/updateRecord',
          payload:data
        })
    }

  }

  render() {



    const columns = [
        {
        title: 'Picture',
        key: 'picture',
        render: (text, record) => (
          <span>
            {
              this.props.consumers.records[record.key].haspicture ? (
                <img size="large" src={`/userApi/consumers/${this.props.consumers.records[record.key].account_no}/picture`} />
              ):(
                <Avatar size="large" icon="user" />
              )
            }

          </span>
        ),
      },
      {
        title: 'Last Name',
        dataIndex: 'lname',
        key: 'lname',
        filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="filter" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
      },
      {
        title: ' First Name',
        dataIndex: 'fname',
        key: 'fname',
      },
      {
        title: 'Middle Name',
        dataIndex: 'mname',
        key: 'mname',
      },
      {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={this.onChangeUrl(record.key)}>View</a>
          <Divider type="vertical" />
          {
            this.state.userlevel === 'admin' ? (
              <span>
                <a onClick={this.onEdit(record.key)}>Edit</a>
                <Divider type="vertical" />
                <a onClick={this.onDelete(record.key)}>Delete</a>
              </span>
            ): null
          }

        </span>
      ),
    }];

    let data = _.map(this.props.consumers.records,(item,i)=>{
      item.key = i
      return item
    })

    return (
      <div>
        {
          this.state.userlevel === 'admin' ? (
            <Button onClick={this.onOpenModal} style={{marginBottom:10}}>New Consumers</Button>
          ) : null
        }

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
