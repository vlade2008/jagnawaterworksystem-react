
import React from 'react';

import { connect } from 'dva';
import { Button, Form, Input,DatePicker,Select,InputNumber,Modal } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option


class ConsumerTypesForm extends React.Component {

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

          if (this.props.consumertypes.activeRecord.id) {
            values.id = this.props.consumertypes.activeRecord.id
            this.props.dispatch({
              type:'consumertypes/updateConsumerTypes',
              payload: values,
              callback: this.getResult
            });
          }else {
            this.props.dispatch({
              type:'consumertypes/upsertConsumerTypes',
              payload: values,
              callback: this.getResult
            });
          }


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
          this.props.getConsumerType();
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
                {getFieldDecorator('name', {
                  initialValue:this.props.consumertypes.activeRecord.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input your name!',
                    },
                  ],
                })(<Input size="large" placeholder="Name"  />)}
              </FormItem>


              <FormItem hasFeedback >
                {getFieldDecorator('price', {
                  initialValue:this.props.consumertypes.activeRecord.price,
                  rules: [
                    {
                      required: true,
                      message: 'Please input your price!'
                    },
                  ],
                })(<Input size="large" type="number" placeholder="Price"  />)}
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
    consumertypes:state.consumertypes
  }
}

export default connect(mapStateToProps)(Form.create()(ConsumerTypesForm))
