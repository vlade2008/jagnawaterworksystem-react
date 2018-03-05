
import React from 'react';

import { connect } from 'dva';
import { Button, Form, Input,DatePicker,Select,InputNumber,Modal,Upload,Icon,message,Card } from 'antd'
import SignatureCanvas from 'react-signature-canvas'
const FormItem = Form.Item;
const Option = Select.Option
import moment from 'moment'


class ConsumersForm extends React.Component {
  constructor(props){
    super(props)
  }



  componentWillMount() {
      this.getConsumerType();
    }

  getConsumerType = () =>{
    this.props.dispatch({
        type:'consumertypes/getAllConsumertypes'
      });
  }

  removeBase64Prefix = (strVal) => {
      var newStr = _.replace(strVal, "data:image/png;base64,", "").replace("data:image/jpeg;base64,", "");
      return newStr;
  }


  handleSubmit = (e) =>{
    e.preventDefault();
     this.props.form.validateFieldsAndScroll((err, values) => {
       if (!err) {


         if (values.picture ) {
           if (values.picture[0].size <= 200827) {
              values.picture = this.removeBase64Prefix(values.picture[0].thumbUrl)
             if (!this.sigCanvas.isEmpty()) {
               let signature  = this.sigCanvas.getCanvas().toDataURL()
               values.signature_of_member = this.removeBase64Prefix(signature)
               this.onsuccess(values)
             }else {


               values.picture = this.removeBase64Prefix(values.picture[0].thumbUrl)
               this.onsuccess(values)
             }




           }else {
              message.error('Reduce large image sizes. (200kb allow)');
           }

         }else {

           if (!this.sigCanvas.isEmpty()) {
             delete values.picture
             let signature  = this.sigCanvas.getCanvas().toDataURL()
             values.signature_of_member = this.removeBase64Prefix(signature)
             this.onsuccess(values)
           }else {
             this.onsuccess(values)
           }
         }





       }
     });
  }

  onsuccess = (values) =>{
    if (this.props.consumers.activeRecord.account_no) {
      values.account_no = this.props.consumers.activeRecord.account_no
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


  normFile = (e) => {
    if (Array.isArray(e)) {
      console.log(e);
      return e;
    }
    return e && e.fileList;
  }


  onClearSignature = () =>{
    this.sigCanvas.clear()
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
          width={700}
          style={{backgroundColor:'gray'}}
          title="New Form"
          visible={this.props.isModal}
          onCancel={this.props.onCloseModal}
          footer={null}
        >

          <Form onSubmit={this.handleSubmit}>
              <FormItem hasFeedback >
                {getFieldDecorator('lname', {
                  initialValue:this.props.consumers.activeRecord.lname,
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
                  initialValue:this.props.consumers.activeRecord.fname,
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
                  initialValue:this.props.consumers.activeRecord.mname,
                  rules: [
                    {
                      required: true,
                      message: 'Midllename',
                    },
                  ],
                })(<Input size="large"  placeholder="Midllename" />)}
              </FormItem>


              <FormItem hasFeedback>
                {getFieldDecorator('sex', {
                  initialValue:this.props.consumers.activeRecord.sex,
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
                {getFieldDecorator('address', {
                  initialValue:this.props.consumers.activeRecord.address,
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
                  initialValue:this.props.consumers.activeRecord.birth_date? moment(this.props.consumers.activeRecord.birth_date,dateFormat) : null,
                  rules: [
                    {
                      required: true,
                      message: 'Birth Date',
                    },
                  ],
                })(<DatePicker format={dateFormat}  placeholder="Birth Date" />)}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('contact_no', {
                  initialValue:this.props.consumers.activeRecord.contact_no,
                  rules: [
                    {
                      required: true,
                      message: 'Contact No',
                    },
                  ],
                })(<Input size="large"  placeholder="Contact No" />)}
              </FormItem>




              <FormItem hasFeedback>
                {getFieldDecorator('consumer_type', {
                  initialValue:this.props.consumers.activeRecord.consumer_type,
                  rules: [
                    {
                      required: true,
                      message: 'Consumer Type',
                    },
                  ],
                })(
                  <Select
                        style={{width:300}}
                        showSearch
                        placeholder="Select a type"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>

                          {
                            this.props.consumertypes.records.map((item,i)=>{
                              return(
                                  <Option key={i} value={item.id}>{item.name}</Option>
                              )
                            })
                          }

                      </Select>
                )}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('orno_appfee', {
                  initialValue:this.props.consumers.activeRecord.orno_appfee,
                  rules: [
                    {
                      required: true,
                      message: 'OR No Fee'
                    },
                  ],
                })(
                  <Input size="large"  placeholder="OR No Fee" />
                )}
              </FormItem>

              <FormItem hasFeedback>
                {getFieldDecorator('appfee', {
                  initialValue:this.props.consumers.activeRecord.appfee,
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
                {getFieldDecorator('meter_number', {
                  initialValue:this.props.consumers.activeRecord.meter_number,
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


              <FormItem hasFeedback >
                  {getFieldDecorator('picture', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                    rules: [
                      {
                        required: this.props.consumers.activeRecord.account_no ? false : true,
                        message: 'Picture'
                      },
                    ],
                  })(
                    <Upload  listType="picture">
                      <Button>
                        <Icon type="upload" /> Click to upload
                      </Button>
                    </Upload>
                  )}
                </FormItem>


                <FormItem>
                  <h3>Signature</h3>
                  <Card>
                    <SignatureCanvas ref={(ref)=>{this.sigCanvas = ref}} canvasProps={{width: 500, height: 200}} />
                    <Button onClick={this.onClearSignature}>Clear</Button>
                  </Card>
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
    consumers:state.consumers,
    consumertypes:state.consumertypes
  }
}

export default connect(mapStateToProps)(Form.create()(ConsumersForm))
