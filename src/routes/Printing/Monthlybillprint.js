
import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';

class Monthlybillprint extends React.Component {
constructor(props){
  super(props);
}



  render() {



    return (
      <div>

          Monthlybillprint
        

      </div>
    )
  }
}



function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps)(Monthlybillprint)
