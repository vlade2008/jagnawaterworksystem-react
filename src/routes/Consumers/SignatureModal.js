
import React from 'react';

import { connect } from 'dva';
import { Button, Form, Input,DatePicker,Select,InputNumber,Modal,Upload,Icon,message } from 'antd'

import SignaturePad from 'react-signature-pad';


class ConsumersForm extends React.Component {
  constructor(props){
    super(props)
  }




  render() {




    return (

    <div style={{width:200,height:200}}>
      <SignaturePad ref="Signature"/>
    </div>
    )
  }
}



function mapStateToProps(state){
  return {
    consumers:state.consumers,
    consumertypes:state.consumertypes
  }
}

export default connect(mapStateToProps)(SignatureModal))
