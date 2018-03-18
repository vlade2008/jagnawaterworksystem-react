
import React from 'react';
import { connect } from 'dva';
import { Table,Button,DatePicker,Icon,Row,Card,Col } from 'antd';
import moment from 'moment'
const { RangePicker } = DatePicker;



class Monthlybillprint extends React.Component {
constructor(props){
  super(props);

  this.state = {
    value:[
           moment().startOf('month'),
           moment().endOf('month')
         ]
  }
}


  componentDidMount() {
    this.getAllReport();

  }

  getAllReport = () =>{
    let payload = {};
    payload.startDate = this.state.value[0].startOf('day').toISOString()
    payload.endDate = this.state.value[1].endOf('day').toISOString();

    this.props.dispatch({
        type:'report/getAllReport',
        payload:payload
      });

  }



  onRefresh = () =>{
    this.getAllReport();
  }

  onHandlePicker = (value,datestring) => {

       this.setState({
         value
       },()=>{
         this.getAllReport();
       })
     }




onPrint = () =>{
    const printContents = document.getElementById("monthlyPrint").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();
    document.body.innerHTML = originalContents;

  }



  render() {
    return (
      <div>
        <RangePicker
          format={"MM-DD-YYYY"}
          value={this.state.value}
          onChange={this.onHandlePicker}
        />
        <Button style={{marginLeft:5}} type="primary"   onClick={this.onRefresh}><Icon type="reload" /></Button>
        <br/>
        <br/>
        <Button type="primary" onClick={this.onPrint}>
           Print
         </Button>
         <br/>
         <br/>
      <div id="monthlyPrint">

        <h1 style={{textAlign:'center',marginBottom:5}}>Month Bill</h1>
        <h3 style={{textAlign:'center',marginBottom:20}}>{moment(this.state.value[0]).format('MMMM Do YYYY')} - {moment(this.state.value[1]).format('MMMM Do YYYY')}</h3>


          {
            this.props.report.records.map((item,i)=>{
              item.consumerInfo.lname = item.consumerInfo.lname.toUpperCase()
              item.consumerInfo.fname = item.consumerInfo.fname.toUpperCase()
              item.consumerInfo.mname = item.consumerInfo.mname.toUpperCase()
              item.consumerInfo.address = item.consumerInfo.address.toUpperCase()
              return(
                <Card style={{
                  display:item.monthlyBills.length == 0 ? 'none' : 'block'
                 }}
                 title={item.consumerInfo.lname + " " + item.consumerInfo.fname + " " + item.consumerInfo.mname} key={i}>
                 <b>Address {item.consumerInfo.address}</b>
                  {
                    item.monthlyBills.map((mdata,key)=>{
                      if (mdata.unpaid != 0) {
                        return(
                          <div key={key}>
                            <b>Due Date: {moment(mdata.due_date).format('YYYY/MM/DD')}</b>
                            <br/>
                            <Row gutter={16} key={key}>
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

                               <Col className="gutter-row" span={4}>
                                 <div className="gutter-box">
                                   <b>Status</b>
                                   <p>{mdata.unpaid <= 0 ? 'PAID' : 'NOT PAID'}</p>
                                 </div>
                               </Col>


                             </Row>
                           </div>
                        )
                      }

                    })
                  }
                </Card>
              )
            })
          }

        </div>
      </div>
    )
  }
}



function mapStateToProps(state){
  return {
    report:state.report
  }
}

export default connect(mapStateToProps)(Monthlybillprint)
