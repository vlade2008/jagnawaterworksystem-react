
import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider ,Button,Modal,Input,Avatar,Card ,message,Row,Col,Tag} from 'antd';
const { Meta } = Card;
import ConsumersForm from './ConsumersForm'
import moment from 'moment'
import {baseURL} from '../../rest/rest'

const confirm = Modal.confirm;

class Consumers extends React.Component {
constructor(props){
  super(props);

  this.state = {
    isModal:false,
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    filterDropdownVisibleID: false,
    searchTextOD: '',
    filteredID: false,
    userlevel: localStorage.getItem('userlevel'),
    smsLoading:false,
    allFilter:''
  }

}

componentDidMount() {
    this.getConsumers();
    this.getConsumerType();

  }

getConsumers = () =>{
  this.props.dispatch({
      type:'consumers/getAllConsumers'
    });

}

getConsumerType = () =>{
  this.props.dispatch({
      type:'consumertypes/getAllConsumertypes'
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

  onInputChangeID = (e) => {
    this.setState({ searchTextID: e.target.value });
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

  onSearchID = () => {
    const { searchTextID } = this.state;
    if (_.isEmpty(searchTextID)) {
      this.getConsumers();
    }else {
      const reg = new RegExp(searchTextID.toString(), 'gi');
      this.setState({
          filterDropdownVisibleID: false,
          filteredID: !!searchTextID,
        });

        let data = this.props.consumers.records.map((record) => {
          const match = record.account_no.toString().match(reg);
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

  printID = (key) =>{
    return ()=>{

      const printContents = document.getElementById("consumerID"+this.props.consumers.records[key].account_no).innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;

      window.print();
      document.body.innerHTML = originalContents;

    }
  }


  printORID = (key) =>{
    return ()=>{
      const printContents = document.getElementById("consumerIDOR"+this.props.consumers.records[key].account_no).innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;

      window.print();
      document.body.innerHTML = originalContents;
    }
  }


  onSumbitMonthlySms = () =>{

    message.loading('Sending Message..', 80000);
    this.props.dispatch({
      type:'consumers/sendSmsnsumers',
      callback:this.resultSms
    })
  }

  resultSms = (isSuccess,error) => {
    message.destroy()
    let modalDialog = null
    if(isSuccess){
      modalDialog = Modal.success({
        title: 'Success',
        content: 'SMS send!',
        onOk: () => {console.log('success')
        }
      });
    }else{
      modalDialog = Modal.error({
        title: 'Failed',
        content: `Record failed to save! ${error}`
      });
    }
  }

  onSearchAllFilter = (input) =>{
      if (_.isEmpty(input)) {
        this.getConsumers();
      }else {
        const reg = new RegExp(input, 'gi');


          let data = this.props.consumers.records.map((record) => {
            const match = record.allFilter.match(reg);
            // const match = _.includes(record.allFilter,input)
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

  isDisconnectConsumer  = (data) =>{
    return ()=>{

      if (this.state.userlevel === 'admin') {
        confirm({
          title: 'Do you Want to disconnect these consumer?',
          content: '',
          onOk:()=>{
            let payload = {status:false,account_no:data.account_no}
            this.props.dispatch({
              type:'consumers/updateConsumers',
              payload: payload,
              callback:this.getConsumers
            });
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    }

  }

  isConnectConsumer = (data) =>{
    return ()=>{

      if (this.state.userlevel === 'admin') {
        confirm({
          title: 'Do you Want to connect these consumer?',
          content: '',
          onOk:()=>{
            let payload = {status:true,account_no:data.account_no}
            this.props.dispatch({
              type:'consumers/updateConsumers',
              payload: payload,
              callback:this.getConsumers
            });
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    }
  }


  render() {
    const columns = [
            {
            title: 'Status',
            key: 'status',
            render: (text, record) => (
              <span>
                {!_.isEmpty(this.props.consumers.records[record.key].status) && this.props.consumers.records[record.key].status == 1 ? (
                   <Button type="primary" onClick={this.isDisconnectConsumer(this.props.consumers.records[record.key])}>Connected</Button>
                ) :(
                   <Button type="danger" onClick={this.isConnectConsumer(this.props.consumers.records[record.key])}>Not Connected</Button>
                )

              }

              </span>
            ),
          },
          {
          title: 'Picture',
          key: 'picture',
          render: (text, record) => (
            <span>
              {
                this.props.consumers.records[record.key].haspicture ? (
                  <Avatar size="large" src={baseURL+"/userApi/consumers/" + this.props.consumers.records[record.key].account_no+ "/picture"} style={{width:100,height:70}} />
                ):(
                  <Avatar size="large" icon="user" />
                )
              }

            </span>
          ),
        },
        {
          title:'ID',
          key:'account_no',
          dataIndex:'account_no',
          filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => this.searchInputID = ele}
              placeholder="Search id"
              value={this.state.searchTextID}
              onChange={this.onInputChangeID}
              onPressEnter={this.onSearchID}
            />
            <Button type="primary" onClick={this.onSearchID}>Search</Button>
          </div>
        ),
        filterIcon: <Icon type="filter" style={{ color: this.state.filteredID ? '#108ee9' : '#aaa' }} />,
        filterDropdownVisible: this.state.filterDropdownVisibleID,
        onFilterDropdownVisibleChange: (visible) => {
          this.setState({
            filterDropdownVisibleID: visible,
          }, () => this.searchInputID && this.searchInputID.focus());
          }
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
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
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
                <Divider type="vertical" />
                <a onClick={this.printID(record.key)}>Print ID</a>
                <Divider type="vertical" />
                <a onClick={this.printORID(record.key)}>Print App Fee</a>
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


    let consumersID = this.props.consumers.records

    return (
      <div>

        {
          this.state.userlevel === 'admin' ? (
            <Button onClick={this.onOpenModal} style={{marginBottom:10}}>New Consumers</Button>
          ) : null
        }

        {
          this.state.userlevel === 'admin' ? (
            <Button onClick={this.onSumbitMonthlySms} style={{marginBottom:10}}>Send Consumer Month Bill</Button>
          ) : null
        }

        {
          this.state.userlevel === 'admin' || this.state.userlevel === 'teller' ? (
            <div style={{display:'block'}}>
                <Input.Search onSearch={this.onSearchAllFilter} enterButton style={{width:'25%'}} placeholder="Search"/>
            </div>

          ): null
        }





        <Table columns={columns} dataSource={data} />


        {
          this.state.isModal ?(
            <ConsumersForm isModal={this.state.isModal} onCloseModal={this.onCloseModal} getConsumers={this.getConsumers} />
          ):null
        }

        {
          this.props.consumers.records.map((item,i)=>{
            let idxType = _.findIndex(this.props.consumertypes.records,{id:item.consumer_type})

            return(
                <div id={"consumerID"+item.account_no} key={i} style={{display:'none'}}>
                  <Card
                    hoverable
                    style={{ width: 200 }}
                    cover={
                      <img  src={baseURL+"/userApi/consumers/" + item.account_no+ "/picture"}  />
                    }
                  >
                    <img  src={baseURL+"/userApi/consumers/" + item.account_no+ "/signature"} width={150}  />
                    <p style={{textAlign:'center'}}>ID:{item.account_no}</p>
                    <Meta style={{textAlign:'center'}} title={item.lname + " " + item.fname + " " + item.mname}/>
                    <p style={{textAlign:'center'}}><b>{item.address}</b></p>
                    <p style={{textAlign:'center',fontWeight:'italic'}}>{

                      idxType == -1 ?  null : this.props.consumertypes.records[idxType].name

                    }</p>
                  </Card>
                </div>

            )
          })
        }


        {
          this.props.consumers.records.map((item,i)=>{
            return(
              <div id={"consumerIDOR"+item.account_no} key={i} style={{display:'none'}}>
                <Card title={item.lname + " " + item.fname + " " + item.mname}>
                <div>
                  <b>Application Date:  {moment(item.application_date).format('YYYY/MM/DD')}</b>
                  <br/>
                  <Row gutter={16} >
                    <Col className="gutter-row" span={8}>
                      <div className="gutter-box">
                        <b>Address</b>
                        <p>{item.address}</p>
                      </div>
                    </Col>
                     <Col className="gutter-row" span={8}>
                       <div className="gutter-box">
                         <b>OR No Fee</b>
                         <p>{item.orno_appfee}</p>
                       </div>
                     </Col>
                     <Col className="gutter-row" span={8}>
                       <div className="gutter-box">
                         <b>App Fee</b>
                         <p>{item.appfee}</p>
                       </div>
                     </Col>
                   </Row>
                 </div>
                 </Card>
              </div>
            )
          })
        }






      </div>
    )
  }
}



function mapStateToProps(state){
  return {
    consumers:state.consumers,
    consumertypes:state.consumertypes
  }
}

export default connect(mapStateToProps)(Consumers)
