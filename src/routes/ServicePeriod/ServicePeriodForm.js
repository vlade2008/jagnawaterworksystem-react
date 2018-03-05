
import React from 'react';

import { connect } from 'dva';
import { Button, Form, Input,DatePicker,Select,InputNumber,Modal,TimePicker } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option

import moment from 'moment'


class ServicePeriodForm extends React.Component {

  constructor(props){
    super(props);


    this.state = {
      confirmDirty:false
    }

  }



  handleSubmit = (e) =>{
    e.preventDefault();
     this.props.form.validateFieldsAndScroll((err, values) => {
       if (!err) {

         this.props.dispatch({
           type:'service_period/upsertServicePeriod',
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
          this.props.getServicePeriod();
          this.props.onCloseModal();
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
          title="New Form"
          visible={this.props.isModal}
          onCancel={this.props.onCloseModal}
          footer={null}
        >

          <Form onSubmit={this.handleSubmit}>


              <FormItem hasFeedback >
                {getFieldDecorator('service_period', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Service Period!',
                    },
                  ],
                })(<Input size="large" type="number" placeholder="Service Period"  />)}
              </FormItem>







              <FormItem key="3">
                <Button onClick={this.props.onCloseModal}  size="large" style={{marginRight:5}}>
                  Cancel
                </Button>
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
    service_period:state.service_period
  }
}

export default connect(mapStateToProps)(Form.create()(ServicePeriodForm))
