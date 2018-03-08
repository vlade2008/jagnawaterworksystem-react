
import React from 'react';

import { connect } from 'dva';
import { Button, Form, Input,DatePicker,Select,InputNumber,Modal } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option
import moment from 'moment'


class ReadingForm extends React.Component {
  constructor(props){
    super(props)


    this.state = {
      previous_reading: !_.isEmpty(this.props.consumers.monthlyRecord) ? this.props.consumers.monthlyRecord[0].current_reading : 0
    }
  }





  handleSubmit = (e) =>{
    e.preventDefault();
     this.props.form.validateFieldsAndScroll((err, values) => {
       if (!err) {
         let authID = localStorage.getItem('authID')
         values.account_no = this.props.account_no
         values.read_by = authID
         values.status = true;
         values.reading_date = moment(values.reading_date).format('YYYY/MM/DD')

         this.props.dispatch({
           type:'reading/upsertReading',
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
          this.props.onCloseAllModal('isReadingModal');
          this.props.getReading()
          this.props.getConsumersMonthly()
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

  checkReading = (rule,value,callback) =>{
      if (value >= this.state.previous_reading) {
        callback();
        return;
      }
      callback('The current reading must not lower of Previous reading')
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
          onCancel={this.props.onCloseModal('isReadingModal')}
          footer={null}
        >

          <Form onSubmit={this.handleSubmit}>


{/*
              <FormItem hasFeedback>
                {getFieldDecorator('service_period_end', {
                  rules: [
                    {
                      required: true,
                      message: 'Service Period End'
                    },
                  ],
                })(
                  <Input size="large"  placeholder="Service Period End" />
                )}
              </FormItem> */}


              <FormItem hasFeedback>
                {getFieldDecorator('meter_number', {
                  rules: [
                    {
                      required: false,
                      message: 'Meter Number'
                    },
                  ],
                })(
                  <Input size="large" type="number" placeholder="Meter Number" />
                )}
              </FormItem>

              <FormItem hasFeedback >
                {getFieldDecorator('current_reading', {
                  rules: [
                    {
                      required: true,
                      validator:this.checkReading
                    },
                  ],
                })(<Input size="large"  type="number" placeholder="Current Reading" />)}
              </FormItem>

              <FormItem hasFeedback >
                {getFieldDecorator('previous_reading', {
                  initialValue:this.state.previous_reading,
                  rules: [
                    {
                      required: true,
                      message: 'Previous Reading',
                    },
                  ],
                })(<Input size="large"  type="number" placeholder="Previous Reading" disabled />)}
              </FormItem>

              <FormItem hasFeedback >
                {getFieldDecorator('reading_date', {
                  rules: [
                    {
                      required: true,
                      message: 'Reading Date',
                    },
                  ],
                })(<DatePicker format={dateFormat}  placeholder="Reading Date" />)}
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

export default connect(mapStateToProps)(Form.create()(ReadingForm))
