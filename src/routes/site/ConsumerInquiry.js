import React from 'react';
import { connect } from 'dva';
class ConsumerInquiry extends React.Component {
  render() {
    return (
      <div>
          ConsumerInquiry
      </div>
    );
  }
}


function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps)(ConsumerInquiry);
