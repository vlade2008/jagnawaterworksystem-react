
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
        {/* <table
          style={{
              width:'100%'
            }}
          >
            <thead>
              <tr>
                <th className="reportTH">Account No.</th>
                <th className="reportTH">Name</th>
                <th className="reportTH">Address</th>
                <th className="reportTH">Bill</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.report.records.map((item,i)=>{
                  return(
                    <tr key={i}>
                      <td style={{verticalAlign:'top'}}>{item.consumerInfo.account_no}</td>
                      <td style={{verticalAlign:'top'}}>{item.consumerInfo.lname + " " + item.consumerInfo.fname + " " + item.consumerInfo.mname}</td>
                      <td style={{verticalAlign:'top'}}>{item.consumerInfo.address}</td>
                      <td>
                        {

                          !_.isEmpty(item.monthlyBills) ? (
                            item.monthlyBills.map((mdata,key)=>{
                              return(
                                  <li key={key} style={{marginBottom:10}}>
                                    <span>Dude Date: {moment(mdata.due_date).format('YYYY/MM/DD')}</span>
                                    <br/>
                                    <span>Previous Reading: {mdata.previous_reading}</span>
                                    <br/>
                                    <span>Current Reading: {mdata.current_reading}</span>
                                    <br/>
                                    <span>Consumption: {mdata.consumption}</span>
                                    <br/>
                                    <span>Charges: {mdata.charges}</span>
                                    <br/>
                                    <span>Amount: {mdata.net_amount}</span>
                                    <br/>
                                    <span>Status: {mdata.unpaid <= 0 ? 'PAID' : 'NOT PAID'}</span>
                                  </li>
                              )
                            })
                          ): null
                        }
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table> */}


          {
            this.props.report.records.map((item,i)=>{
              return(
                <Card title={item.consumerInfo.lname + " " + item.consumerInfo.fname + " " + item.consumerInfo.mname} key={i}>
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
