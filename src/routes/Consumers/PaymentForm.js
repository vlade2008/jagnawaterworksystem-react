
import React from 'react';

import { connect } from 'dva';
import { Button, Form, Input,DatePicker,Select,InputNumber,Modal } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option
import moment from 'moment'


class PaymentForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      userID: localStorage.getItem('authID')
    }
  }





  handleSubmit = (e) =>{
    e.preventDefault();
     this.props.form.validateFieldsAndScroll((err, values) => {
       if (!err) {



         values.account_no = this.props.account_no
         values.bill_no = this.props.bill_no
         values.teller = this.state.userID.toString()
         values.payment_date = moment()
         values.or_date = moment()

         this.props.dispatch({
           type:'payments/upsertPayments',
           payload: values,
           callback: this.getResult
         });

       }
     });
  }

  getResult = (isSuccess,error) => {
    let modalDialog = null
    if(isSuccess){
      modalDialog = Modal.success({
        title: 'Success',
        content: 'Changes saved!',
        onOk: () => {
          this.props.onCloseAllModal('isPaymentModal');
          this.props.getConsumersMonthly()
          this.props.getPayments()
          this.props.getUnpaid()
        }
      });
    }else{
      modalDialog = Modal.error({
        title: 'Failed',
        content: `Record failed to save! ${error}`
      });
    }
  }



  render() {

    const dateFormat = 'YYYY/MM/DD';
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

      <Modal
          style={{ width: '100%',top:20 }}
          title="New Form"
          visible={this.props.isModal}
          onCancel={this.props.onCloseModal('isPaymentModal')}
          footer={null}
        >

          <Form onSubmit={this.handleSubmit}>


              <FormItem hasFeedback>
                {getFieldDecorator('transaction_no', {
                  rules: [
                    {
                      required: true,
                      message: 'Transaction No'
                    },
                  ],
                })(
                  <Input size="large"  placeholder="Transaction No" />
                )}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('or_no', {
                  rules: [
                    {
                      required: true,
                      message: 'Or No'
                    },
                  ],
                })(
                  <Input size="large"  placeholder="Or No" />
                )}
              </FormItem>


              <FormItem hasFeedback>
                {getFieldDecorator('penalty', {
                  rules: [
                    {
                      required: true,
                      message: 'Penaly'
                    },
                  ],
                })(
                  <Input size="large" type="number" placeholder="Penalty" />
                )}
              </FormItem>



              <FormItem hasFeedback >
                {getFieldDecorator('total_amount', {
                  rules: [
                    {
                      required: true,
                      message: 'Total Amount',
                    },
                  ],
                })(<Input size="large"  type="number" placeholder="Total Amount" />)}
              </FormItem>






              <FormItem key="3">
                <Button type="primary" htmlType="submit" size="large">
                  Save
                </Button>
              </FormItem>
          </Form>

        </Modal>
    )
  }
}



function mapStateToProps(state){
  return {
    auth:state.auth,
    consumers:state.consumers
  }
}

export default connect(mapStateToProps)(Form.create()(PaymentForm))
