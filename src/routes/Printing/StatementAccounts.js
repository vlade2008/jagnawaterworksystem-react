
import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';


class StatementAccounts extends React.Component {
constructor(props){
  super(props);
}



  render() {



    return (
      <div>

        StatementAccounts


      </div>
    )
  }
}



function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps)(StatementAccounts)
