import React from "react";
import { Modal, Form, Input,message} from "antd";
import axios from "axios";
const FormItem = Form.Item;
const ModalAddPost = Form.create()(
  class PostForm extends React.Component {
		handleOk = e => {
			const { visible } = this.props;
			this.props.form.validateFields((err, values) => {
				if (!err) {
					axios({
						method: "POST",
						url: "https://jsonplaceholder.typicode.com/posts",
						data: {
							title: values.title,
							body: values.body
						}
					}).then(res => {
						if (res.status === 200) {
              message.success("Add new post is success!");
            }
            message.warning("Server return with code: " + res.status)
            this.props.closeModal(!visible);

					});
				};
			});
		}
    handleCancel = e => {
      const { visible } = this.props;
      this.props.closeModal(!visible);
    };
    render() {
      const { visible } = this.props;
      const { getFieldDecorator } = this.props.form;
      return (
        <Modal
          visible={visible}
          title="Add New Post"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Add"
          cancelText="Cancel"
        >
          <Form layout="vertical">
            <FormItem label="UserId">
              {getFieldDecorator("UserId", {
                rules: [
                  {
                    required: true,
						message: "Please input UserId!"
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="Title">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
						message: "Please input title!"
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="Body">
              {getFieldDecorator("body", {
                rules: [
                  {
                    required: true,
                    message: "Please input body!"
                  }
                ]
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default ModalAddPost;
