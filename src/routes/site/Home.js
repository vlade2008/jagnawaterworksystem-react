import React from 'react';
import {Row, Col, Button,Card} from 'antd';
import { connect } from 'dva';
class Home extends React.Component {


  render() {
    return (
      <div>
        Home
      </div>
    );
  }
}


function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps)(Home);
