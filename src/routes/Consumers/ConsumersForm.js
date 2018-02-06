
import React from 'react';

import { connect } from 'dva';
import { Button, Form, Input,DatePicker,Select,InputNumber,Modal } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option


class ConsumersForm extends React.Component {
  constructor(props){
    super(props)
  }



  handleSubmit = (e) =>{
    e.preventDefault();
     this.props.form.validateFieldsAndScroll((err, values) => {
       if (!err) {
         if (this.props.consumers.activeRecord.id) {
           values.id = this.props.consumers.activeRecord.id
           this.props.dispatch({
             type:'consumers/updateConsumers',
             payload: values,
             callback: this.getResult
           });
         }else {
           this.props.dispatch({
             type:'consumers/upsertConsumers',
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
          this.props.getConsumers();
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
          style={{ width: '100%',top:20 }}
          title="New Form"
          visible={this.props.isModal}
          onCancel={this.props.onCloseModal}
        >

          <Form onSubmit={this.handleSubmit}>
              <FormItem hasFeedback >
                {getFieldDecorator('lname', {
                  rules: [
                    {
                      required: true,
                      message: 'Lastname',
                    },
                  ],
                })(<Input size="large" placeholder="Lastname" />)}
              </FormItem>

              <FormItem hasFeedback >
                {getFieldDecorator('fname', {
                  rules: [
                    {
                      required: true,
                      message: 'Firstname',
                    },
                  ],
                })(<Input size="large"placeholder="Firstname" />)}
              </FormItem>

              <FormItem hasFeedback >
                {getFieldDecorator('mname', {
                  rules: [
                    {
                      required: true,
                      message: 'Midllename',
                    },
                  ],
                })(<Input size="large"  placeholder="mname" />)}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('address', {
                  rules: [
                    {
                      required: true,
                      message: 'Address',
                    },
                  ],
                })(<Input size="large"  placeholder="address" />)}
              </FormItem>

              <FormItem hasFeedback >
                {getFieldDecorator('birth_date', {
                  rules: [
                    {
                      required: true,
                      message: 'Birth Date',
                    },
                  ],
                })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('municipality', {
                  rules: [
                    {
                      required: true,
                      message: 'Municipaliry',
                    },
                  ],
                })(<Input size="large" placeholder="Municipaliry" />)}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('barangay', {
                  rules: [
                    {
                      required: true,
                      message: 'Barangay',
                    },
                  ],
                })(<Input size="large" placeholder="Barangay" />)}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('citizenship', {
                  rules: [
                    {
                      required: true,
                      message: 'Citizenship',
                    },
                  ],
                })(<Input size="large" placeholder="Citizenship" />)}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('sex', {
                  rules: [
                    {
                      required: true,
                      message: 'Sex',
                    },
                  ],
                })(
                  <Select
                        style={{width:300}}
                        showSearch
                        placeholder="Select a gender"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                          <Option value="MALE">MALE</Option>
                          <Option value="FEMALE">FEMALE</Option>

                      </Select>
                )}
              </FormItem>


              <FormItem hasFeedback>
                {getFieldDecorator('orno_appfee', {
                  rules: [
                    {
                      required: true,
                      message: 'OR NO',
                    },
                  ],
                })(<Input size="large" placeholder="OR NO" />)}
              </FormItem>


              <FormItem hasFeedback >
                {getFieldDecorator('application_date', {
                  rules: [
                    {
                      required: true,
                      message: 'Application Date',
                    },
                  ],
                })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('appfee', {
                  rules: [
                    {
                      required: true,
                      message: 'App Fee'
                    },
                  ],
                })(
                  <Input size="large" type="number" placeholder="App Fee" />
                )}
              </FormItem>


              <FormItem hasFeedback>
                {getFieldDecorator('consumer_type', {
                  rules: [
                    {
                      required: true,
                      message: 'Consumer Type',
                    },
                  ],
                })(<Input size="large" placeholder="Consumer Type" />)}
              </FormItem>


              <FormItem hasFeedback >
                {getFieldDecorator('connection_date', {
                  rules: [
                    {
                      required: true,
                      message: 'Connection Date',
                    },
                  ],
                })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('meter_number', {
                  rules: [
                    {
                      required: true,
                      message: 'Meter Number'
                    },
                  ],
                })(
                  <Input size="large" type="number" placeholder="Meter Number" />
                )}
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
    consumers:state.consumers
  }
}

export default connect(mapStateToProps)(Form.create()(ConsumersForm))
