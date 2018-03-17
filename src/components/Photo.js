import Webcam from 'react-webcam';
import React from 'react';
import {Modal,Card,Button} from 'antd';


class Photo extends React.Component{

    constructor(props){
        super(props);
    }



    close = ()=>{
        if(this.props.onClose)
            this.props.onClose(null);

    };

    takephoto = ()=>{

        var screenshot = this.refs.webcam.getScreenshot();

        if(this.props.onClose)
            this.props.onClose(screenshot);

    }

    render(){

        return (
            <Modal
              title="Take a Photo"
              visible={this.props.show}
              okText="Take Photo"
              onOk={this.takephoto}
              onCancel={this.close}
              >

                    <div style={{textAlign:'center'}}>
                        <Webcam ref="webcam" audio={false} screenshotFormat="image/jpeg"
                                width={400} height={300}/>
                    </div>
            </Modal>
        );
    }

}


export default Photo;
