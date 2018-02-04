
import React from 'react';

import { connect } from 'dva';
import { Button, Form, Input,DatePicker,Select,InputNumber,Modal } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option


class UserForm extends React.Component {

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
              type:'users/upsertUser',
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
        content: 'Changes saved!'
      });
    }else{
      modalDialog = Modal.error({
        title: 'Failed',
        content: `Record failed to save! ${error}`
      });
    }

    // this.timeoutHandle = setTimeout(() => {
    //   if(modalDialog) modalDialog.destroy();
    // }, 3000);
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }


  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
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
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ],
                })(<Input size="large" placeholder="Username"  />)}
              </FormItem>

              <FormItem hasFeedback >
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },{validator: this.checkConfirm}
                  ],
                })(<Input size="large" type="password" placeholder="Password" />)}
              </FormItem>

              <FormItem hasFeedback >
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },{validator: this.checkPassword}
                  ],
                })(<Input size="large" placeholder='Please confirm your password!' type="password" onBlur={this.handleConfirmBlur} />)}
              </FormItem>

              <FormItem hasFeedback >
                {getFieldDecorator('userlevel', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select user level!',
                    },
                  ],
                })(
                  <Select
                    style={{width:300}}
                    showSearch
                    placeholder="Select a user level"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    <Option value="admin">Admin</Option>
                    <Option value="teller">Teller</Option>
                    <Option value="reader">Reader</Option>
                  </Select>
                )}
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

  }
}

export default connect(mapStateToProps)(Form.create()(UserForm))
