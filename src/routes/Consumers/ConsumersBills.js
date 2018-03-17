
import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider ,Button,List,Avatar,Tabs,Card,Row,Col } from 'antd';
import ReadingForm from './ReadingForm'
import PaymentForm from './PaymentForm'
const TabPane = Tabs.TabPane
import moment from 'moment'
import {baseURL} from '../../rest/rest'
import _ from 'lodash'

class ConsumersBills extends React.Component {
constructor(props){
  super(props);

  this.state = {
    isModal:false,
    bill_no:'',
    userlevel: localStorage.getItem('userlevel')
  }
}

onOpenModal = (name) =>{
  return ()=>{
    this.setState({
      [name]:true
    })
  }
}

onCloseModal = (name) =>{
  return ()=>{
    this.setState({
      [name]:false
    })
  }
}

 onCloseAllModal = (name) =>{
   this.setState({
     [name]:false
   })
 }


  componentWillMount(){
      this.getConsumersMonthly();
      this.getReading();
      this.getPayments()
      this.getUnpaid()
  }

  getReading = () =>{
    this.props.dispatch({
        type:'reading/getAllReading',
        id:this.props.match.params.id
      });
  }

  getConsumersMonthly = () =>{
    this.props.dispatch({
        type:'consumers/getAllConsumersMonthly',
        id:this.props.match.params.id
      });
  }

  getPayments = () =>{
    this.props.dispatch({
        type:'payments/getAllPayments',
        id:this.props.match.params.id
      });
  }

  getUnpaid = () =>{
    this.props.dispatch({
        type:'unpaid/getAllUnpaid',
        id:this.props.match.params.id
      });
  }

  onPay = key => {
      return () => {
        let bill_no = this.props.unpaid.records[key].bill_no;
        this.setState({
          bill_no:bill_no,
          isPaymentModal:true
        })
      }
    }


    printBill = () =>{
        const printContents = document.getElementById("consumerUnPaid").innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();
        document.body.innerHTML = originalContents;
    }


    printReceipt = (key) =>{
      return ()=>{
        const printContents = document.getElementById(`consumerPay${this.props.payments.records[key].id}`).innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();
        document.body.innerHTML = originalContents;
      }
    }

  render() {



    let dataMonthly = _.map(this.props.consumers.monthlyRecord,(item,i)=>{
      item.key = i
      return item
    })


    const columnsMonthly = [{
      title: 'Bill No',
      dataIndex: 'bill_no',
      key: 'bill_no',
    }, {
      title: 'Previous Reading',
      dataIndex: 'previous_reading',
      key: 'previous_reading',
    }, {
      title: 'Current Reading',
      dataIndex: 'current_reading',
      key: 'current_reading',
    },
    {
      title:'Due Date',
      dataIndex:'due_date',
      key:'due_date'
    },
    {
     title: 'Amount',
     dataIndex: 'net_amount',
     key: 'net_amount',
   }];

    let dataReading = _.map(this.props.reading.records,(item,i)=>{
      item.key = i
      return item
    })


    const columnsReading = [
      {
        title: 'Service Period End',
        dataIndex: 'service_period_end',
        key: 'service_period_end',
      },
      {
        title: 'Reading Date',
        dataIndex: 'reading_date',
        key: 'reading_date',
      },
      {
         title: 'Previous Reading',
         dataIndex: 'previous_reading',
         key: 'previous_reading',
      },
      {
        title: 'Current Reading',
        dataIndex: 'current_reading',
        key: 'current_reading',
      },
      {
        title: 'Meter Number',
        dataIndex: 'meter_number',
        key: 'meter_number',
      }
  ];


  let dataPayments = _.map(this.props.payments.records,(item,i)=>{
    item.key = i
    return item
  })


  const columnsPayments = [
    {
      title: 'Transaction No',
      dataIndex: 'transaction_no',
      key: 'transaction_no',
    },
    {
      title: 'Payment Date',
      dataIndex: 'payment_date',
      key: 'payment_date',
    },
    {
       title: 'Penalty',
       dataIndex: 'penalty',
       key: 'penalty',
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
     title: 'Action',
     key: 'action',
     render: (text, record) => (
       <span>
         <a onClick={this.printReceipt(record.key)}>Print Receipt</a>
       </span>
     ),
   }
];


  let dataUnpaid = _.map(this.props.unpaid.records,(item,i)=>{
    item.key = i
    return item
  })


  const columnsUnpaid = [{
        title: 'Bill No',
        dataIndex: 'bill_no',
        key: 'bill_no',
      }, {
        title: 'Previous Reading',
        dataIndex: 'previous_reading',
        key: 'previous_reading',
      }, {
        title: 'Current Reading',
        dataIndex: 'current_reading',
        key: 'current_reading',
      },
      {
        title:'Due Date',
        dataIndex:'due_date',
        key:'due_date'
      },
      {
       title: 'Amount',
       dataIndex: 'net_amount',
       key: 'net_amount',
     },
      {
       title: 'Action',
       key: 'action',
       render: (text, record) => (
         <span>
           {
             _.includes(this.state.userlevel,'teller') || _.includes(this.state.userlevel,'admin') ? (
                 <span>
                   <a onClick={this.onPay(record.key)}>pay</a>
                   <Divider type="vertical" />
                 </span>

             ) : null
           }

           <a onClick={this.printBill}>Print Bill</a>
         </span>
       ),
     }
    ];

    let isBill = !_.isEmpty(this.props.consumers.monthlyRecord) ? true : false


    return (
      <div>

        <List.Item>
          <List.Item.Meta
            avatar={
              this.props.consumers.activeRecord.haspicture ? (
                  <Avatar size="large" src={baseURL+"/userApi/consumers/" + this.props.consumers.activeRecord.account_no+ "/picture"} />
              ): (
                <Avatar size="large" icon="user" />
              )

            }
            title={`${this.props.consumers.activeRecord.lname} , ${this.props.consumers.activeRecord.fname} , ${this.props.consumers.activeRecord.mname} `}
            description={'Meter Number:'+this.props.consumers.activeRecord.meter_number + ' Address: ' + this.props.consumers.activeRecord.address}
          />
        </List.Item>


        {
          _.includes(this.state.userlevel,'reader') ||  _.includes(this.state.userlevel,'admin') ? (
            <Button style={{marginBottom:10}} onClick={this.onOpenModal('isReadingModal')}>New Reading</Button>
          ): null
        }




        <Tabs defaultActiveKey="1" >
          <TabPane tab="Reading" key="1">
            <Table columns={columnsReading} dataSource={dataReading} />
          </TabPane>
          <TabPane tab="Monthly Bills" key="2">
            <Table columns={columnsMonthly} dataSource={dataMonthly} />
          </TabPane>
          <TabPane tab="Unpaid" key="3">
            <Table columns={columnsUnpaid} dataSource={dataUnpaid} />
          </TabPane>
          <TabPane tab="Payment" key="4">
            <Table columns={columnsPayments} dataSource={dataPayments} />
          </TabPane>

        </Tabs>


        {
          this.state.isReadingModal ?(
            <ReadingForm isModal={this.state.isReadingModal} onCloseModal={this.onCloseModal} getReading={this.getReading} account_no={this.props.match.params.id} onCloseAllModal={this.onCloseAllModal} getConsumersMonthly={this.getConsumersMonthly} getUnpaid={this.getUnpaid}  />
          ):null
        }

        {
          this.state.isPaymentModal ?(
            <PaymentForm bill_no={this.state.bill_no}  isModal={this.state.isPaymentModal} onCloseModal={this.onCloseModal} getConsumersMonthly={this.getConsumersMonthly} getPayments={this.getPayments} account_no={this.props.match.params.id} onCloseAllModal={this.onCloseAllModal} getUnpaid={this.getUnpaid}  />
          ):null
        }


        <div style={{display:'none'}} id={'consumerUnPaid'}>
          <Card title={this.props.consumers.activeRecord.lname + " " + this.props.consumers.activeRecord.fname + " " + this.props.consumers.activeRecord.mname}>

            {
              this.props.unpaid.records.map((mdata,i)=>{
                return(
                  <div key={i}>
                    <div>
                      <b>Bill Date: {moment(mdata.billing_date).format('YYYY/MM/DD')}</b>
                      <br/>
                      <Row gutter={16}>
                         <Col className="gutter-row" span={4}>
                           <div className="gutter-box">
                             <b>Due Date</b>
                             <p>{mdata.due_date}</p>
                           </div>
                         </Col>
                         <Col className="gutter-row" span={4}>
                           <div className="gutter-box">
                             <b>Previous Reading</b>
                             <p>{mdata.previous_reading}</p>
                           </div>
                         </Col>
                         <Col className="gutter-row" span={4}>
                           <div className="gutter-box">
                             <b>Current Reading</b>
                             <p>{mdata.current_reading}</p>
                           </div>
                         </Col>
                         <Col className="gutter-row" span={4}>
                           <div className="gutter-box">
                             <b>Consumption</b>
                             <p>{mdata.consumption}</p>
                           </div>
                         </Col>
                         <Col className="gutter-row" span={4}>
                           <div className="gutter-box">
                             <b>Charge</b>
                             <p>{mdata.charges}</p>
                           </div>
                         </Col>
                         <Col className="gutter-row" span={4}>
                           <div className="gutter-box">
                             <b>Amount</b>
                             <p>{mdata.net_amount}</p>
                           </div>
                         </Col>



                       </Row>
                     </div>
                  </div>
                )
              })
            }


           </Card>
        </div>




        {
          this.props.payments.records.map((item,i)=>{
            return(
              <div id={"consumerPay"+item.id} key={i} style={{display:'none'}}>
                <Card title={this.props.consumers.activeRecord.lname + " " + this.props.consumers.activeRecord.fname + " " + this.props.consumers.activeRecord.mname}>
                  <div>
                    <b>Payment Date: {moment(item.payment_date).format('YYYY/MM/DD')}</b>
                    <br/>
                    <Row gutter={16}>
                      <Col className="gutter-row" span={4}>
                        <div className="gutter-box">
                          <b>Transaction No</b>
                          <p>{item.transaction_no}</p>
                        </div>
                      </Col>
                       <Col className="gutter-row" span={4}>
                         <div className="gutter-box">
                           <b>OR No</b>
                           <p>{item.or_no}</p>
                         </div>
                       </Col>
                       <Col className="gutter-row" span={5}>
                         <div className="gutter-box">
                           <b>Penalty</b>
                           <p>{item.penalty}</p>
                         </div>
                       </Col>

                       <Col className="gutter-row" span={5}>
                         <div className="gutter-box">
                           <b>Total Amount</b>
                           <p>{item.total_amount}</p>
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
    reading:state.reading,
    payments:state.payments,
    unpaid:state.unpaid
  }
}

export default connect(mapStateToProps)(ConsumersBills)
