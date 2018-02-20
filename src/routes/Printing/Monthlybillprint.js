
import React from 'react';
import { connect } from 'dva';
import { Table,Button } from 'antd';
import moment from 'moment'

class Monthlybillprint extends React.Component {
constructor(props){
  super(props);
}


  componentDidMount() {
    this.getAllReport();

  }

  getAllReport = () =>{
    this.props.dispatch({
        type:'report/getAllReport'
      });

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
        <Button onClick={this.onPrint}>
           Print
         </Button>
      <div id="monthlyPrint">
        <table
          style={{
              width:'100%'
            }}
          >
            <thead>
              <tr>
                <th className="reportTH">Account No.</th>
                <th className="reportTH">Name</th>
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
                      <td>
                        {
                          item.monthlyBills.map((mdata,key)=>{
                            return(
                                <li key={key} style={{marginBottom:10}}>
                                  <span>Dude Date: {moment(mdata.due_date).format('YYYY/MM/DD')}</span>
                                  <br/>
                                  <span>Consumption: {mdata.consumption}</span>
                                  <br/>
                                  <span>Charges: {mdata.charges}</span>
                                  <br/>
                                  <span>Amount: {mdata.net_amount}</span>
                                  <br/>
                                  <span>Status: {mdata.unpaid == 0 ? 'PAID' : 'NOT PAID'}</span>
                                </li>
                            )
                          })
                        }
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>

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
