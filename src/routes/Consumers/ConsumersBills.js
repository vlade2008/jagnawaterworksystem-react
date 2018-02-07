
import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider ,Button,List,Avatar } from 'antd';


class ConsumersBills extends React.Component {
constructor(props){
  super(props);
}


  render() {

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Action 一 {record.name}</a>
          <Divider type="vertical" />
          <a href="#">Delete</a>
          <Divider type="vertical" />
          <a href="#" className="ant-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }];

 const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];


    return (
      <div>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={`${this.props.consumers.activeRecord.lname} , ${this.props.consumers.activeRecord.fname} , ${this.props.consumers.activeRecord.mname} `}
            description={this.props.consumers.activeRecord.address}
          />
        </List.Item>
        <Button style={{marginBottom:10}}>New Reading</Button>
        <Table columns={columns} dataSource={data} />

      </div>
    )
  }
}



function mapStateToProps(state){
  return {
    consumers:state.consumers
  }
}

export default connect(mapStateToProps)(ConsumersBills)
