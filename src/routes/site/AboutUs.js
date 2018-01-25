import React from 'react';
import { connect } from 'dva';
class AboutUs extends React.Component {
  render() {
    return (
      <div>
          About us
      </div>
    );
  }
}


function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps)(AboutUs);
