import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input } from 'antd'
const FormItem = Form.Item;

import {testrest} from '../../rest/rest'

class Login extends React.Component {


  handleSubmit = (e) =>{
    e.preventDefault();
     this.props.form.validateFieldsAndScroll((err, values) => {
       if (!err) {

         localStorage.removeItem("api_key");
         localStorage.removeItem("userlevel")
         localStorage.removeItem("authID")
         localStorage.removeItem("accountlevel")

         this.props.dispatch({
           type:'auth/login',
           payload: values
         });



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
      <div className="loginForm">
        <div className="logo" key="1">

          <span>Jagna Waterwors System</span>
        </div>
      <form onSubmit={this.handleSubmit}>

          <FormItem hasFeedback key="1">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Username',
                },
              ],
            })(<Input size="large" placeholder="Username" />)}
          </FormItem>
          <FormItem hasFeedback key="2">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Passowrd',
                },
              ],
            })(<Input size="large" type="password" placeholder="Password" />)}
          </FormItem>
          <FormItem key="3">
            <Button type="primary" htmlType="submit" size="large">
              Login
            </Button>
          </FormItem>
      </form>
    </div>
    );
  }
}


function mapStateToProps(state){
  return {
    auth:state.auth
  }
}

export default connect(mapStateToProps)(Form.create()(Login))
