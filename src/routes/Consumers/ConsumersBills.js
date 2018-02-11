
import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider ,Button,List,Avatar,Tabs } from 'antd';
import ReadingForm from './ReadingForm'
import PaymentForm from './PaymentForm'
const TabPane = Tabs.TabPane


class ConsumersBills extends React.Component {
constructor(props){
  super(props);

  this.state = {
    isModal:false
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
    }
];


    let isBill = !_.isEmpty(this.props.consumers.monthlyRecord) ? true : false


    return (
      <div>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={`${this.props.consumers.activeRecord.lname} , ${this.props.consumers.activeRecord.fname} , ${this.props.consumers.activeRecord.mname} `}
            description={this.props.consumers.activeRecord.address}
          />
        </List.Item>
        <Button style={{marginBottom:10}} onClick={this.onOpenModal('isReadingModal')}>New Reading</Button>
        {
          isBill ? (
            <Button style={{marginBottom:10}} onClick={this.onOpenModal('isPaymentModal')} >Payment</Button>
          ): null
        }


        <Tabs defaultActiveKey="1" >
          <TabPane tab="Reading" key="1">
            <Table columns={columnsReading} dataSource={dataReading} />
          </TabPane>
          <TabPane tab="Monthly Bills" key="2">
            <Table columns={columnsMonthly} dataSource={dataMonthly} />
          </TabPane>
          <TabPane tab="Payment" key="3">
            <Table columns={columnsPayments} dataSource={dataPayments} />
          </TabPane>
        </Tabs>


        {
          this.state.isReadingModal ?(
            <ReadingForm isModal={this.state.isReadingModal} onCloseModal={this.onCloseModal} getReading={this.getReading} account_no={this.props.match.params.id} onCloseAllModal={this.onCloseAllModal} getConsumersMonthly={this.getConsumersMonthly}  />
          ):null
        }

        {
          this.state.isPaymentModal ?(
            <PaymentForm isModal={this.state.isPaymentModal} onCloseModal={this.onCloseModal} getConsumersMonthly={this.getConsumersMonthly} getPayments={this.getPayments} account_no={this.props.match.params.id} onCloseAllModal={this.onCloseAllModal}  />
          ):null
        }


      </div>
    )
  }
}



function mapStateToProps(state){
  return {
    consumers:state.consumers,
    reading:state.reading,
    payments:state.payments
  }
}

export default connect(mapStateToProps)(ConsumersBills)
