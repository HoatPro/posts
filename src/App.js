import React from "react";
import { Button, Table } from "antd";
import "./App.css";
import axios from "axios";
import  ModalAddPost  from "./components/PostForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: [],
      visibleAdd: false,
      loading:false
    };
  }
  componentDidMount() {
    this.setState({
      dataTable:[]
    })
  }

  handleAdd = () => {
    this.setState({
      visibleAdd: true
    });
  };
  closeModal = visible => {
    this.setState({ visibleAdd: visible });
  };
  handleShowPosts = () => {
    this.setState({ loading: true });
    axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts"
    }).then(res =>
      this.setState({
        dataTable: res.data
      })
    );
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 500);
  }
  render() {
    const { loading } = this.state;
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "UserId",
        dataIndex: "userId",
        key: "userId"
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "Body",
        dataIndex: "body",
        key: "body"
      }
    ];

    return (
      <div>
        <Button
          type="danger"
          style={{ margin: "10px" }}
          onClick={this.handleAdd}
        >
          Add New Post
        </Button>
        <Button
          type="primary"
          onClick={this.handleShowPosts}
          loading={loading}>
          Get Data Posts
        </Button>

        <ModalAddPost
          visible={this.state.visibleAdd}
          closeModal={this.closeModal}/>
        <Table
          columns={columns}
          dataSource={this.state.dataTable}
          bordered
          rowKey={record => record.id}
        />
      </div>
    );
  }
}

export default App;
