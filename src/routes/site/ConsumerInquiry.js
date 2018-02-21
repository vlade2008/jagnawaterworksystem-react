import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input,InputNumber,Table,Card,Row,Col  } from 'antd'
import moment from 'moment'
const FormItem = Form.Item;

class ConsumerInquiry extends React.Component {


  handleSubmit = (e) =>{
    e.preventDefault();
     this.props.form.validateFieldsAndScroll((err, values) => {
       if (!err) {
         this.props.dispatch({
           type:'inquiry/getAllInquiry',
           payload:values
         })
       }
     });
  }



  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
     labelCol: {
       xs: { span: 24 },
       sm: { span: 8 },
     },
     wrapperCol: {
       xs: { span: 24 },
       sm: { span: 16 },
     },
   };


    return (
      <div>
        <Row>
           <Col span={12} offset={6}>
             <Form onSubmit={this.handleSubmit}>


                 <FormItem hasFeedback>
                   {getFieldDecorator('account_no', {
                     rules: [
                       {
                         required: true,
                         message: 'Account No'
                       },
                     ],
                   })(
                     <Input size="large" type="number" placeholder="Account No" />
                   )}
                 </FormItem>

                 <FormItem hasFeedback>
                   {getFieldDecorator('lname', {
                     rules: [
                       {
                         required: true,
                         message: 'Last Name'
                       },
                     ],
                   })(
                     <Input size="large"  placeholder="Last Name" />
                   )}
                 </FormItem>

                 <FormItem hasFeedback>
                   {getFieldDecorator('fname', {
                     rules: [
                       {
                         required: true,
                         message: 'First Name'
                       },
                     ],
                   })(
                     <Input size="large"  placeholder="First Name" />
                   )}
                 </FormItem>

                 <FormItem hasFeedback>
                   {getFieldDecorator('mname', {
                     rules: [
                       {
                         required: true,
                         message: 'Midle Name'
                       },
                     ],
                   })(
                     <Input size="large"  placeholder="Midle Name" />
                   )}
                 </FormItem>


                 <FormItem key="3">
                   <Button type="primary" htmlType="submit" size="large">
                     Search
                   </Button>
                 </FormItem>

                 {
                   !_.isEmpty(this.props.inquiry.activeRecord) ? (
                     <Card title={this.props.inquiry.activeRecord.fullname}>
                       {


                         !_.isEmpty(this.props.inquiry.activeRecord.unpaid) ?

                         this.props.inquiry.activeRecord.unpaid.map((mdata,key)=>{
                           return(
                             <Row gutter={16} key={key}>
                                <Col className="gutter-row" span={6}>
                                  <div className="gutter-box">
                                    <b>Bill Date</b>
                                    <p>{moment(mdata.billing_date).format('YYYY/MM/DD')}</p>
                                  </div>
                                </Col>
                                <Col className="gutter-row" span={6}>
                                  <div className="gutter-box">
                                    <b>Consumption</b>
                                    <p>{mdata.consumption}</p>
                                  </div>
                                </Col>
                                <Col className="gutter-row" span={6}>
                                  <div className="gutter-box">
                                    <b>Charge</b>
                                    <p>{mdata.charges}</p>
                                  </div>
                                </Col>
                                <Col className="gutter-row" span={6}>
                                  <div className="gutter-box">
                                    <b>Amount</b>
                                    <p>{mdata.net_amount}</p>
                                  </div>
                                </Col>

                              </Row>
                           )
                         }) : (
                           <Row gutter={16}>
                              <Col className="gutter-row" span={24}>
                                <div className="gutter-box">
                                  <b>PAID</b>
                                </div>
                              </Col>
                            </Row>
                         )
                       }
                     </Card>

                   ): null
                 }

             </Form>
           </Col>
         </Row>
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    inquiry:state.inquiry
  }
}

export default connect(mapStateToProps)(Form.create()(ConsumerInquiry))
