import {
  Card,
  List,
  Empty,
  Typography,
  Flex,
  Button,
  Modal,
  Input,
  Form,
  message,
} from "antd";
import { useUsersDetails } from "../Hooks";
import Loader from "./loader";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Fragment, useState } from "react";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const PostsList = () => {
  const { postsData, postsLoading, setPostsData } = useUsersDetails();
  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form] = Form.useForm();

  const handleAddPost = () => {
    setEditingPost(null);
    form.resetFields();
    setOpen(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    form.setFieldsValue({
      title: post.title,
      body: post.body,
    });
    setOpen(true);
  };

  const handleDelete = (post) => {
    Modal.confirm({
      title: "Delete Post",
      content: "Are you sure you want to delete this post?",
      okText: "Delete",
      okType: "danger",
      onOk: () => {
        setPostsData(
          postsData.filter((p) => p.id !== post.id && p.userId === post.userId)
        );
        setOpen(false);
        form.resetFields();
        setEditingPost(null);
        message.success("Post deleted successfully");
      },
      onCancel: () => {
        setOpen(false);
        form.resetFields();
        setEditingPost(null);
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingPost) {
        setPostsData(
          postsData.map((p) =>
            p.id === editingPost.id ? { ...p, ...values } : p
          )
        );
        setOpen(false);
        form.resetFields();
        setEditingPost(null);
        message.success("Post updated successfully");
      } else {
        setPostsData([...postsData, { ...values, id: postsData.length + 1 }]);
        setOpen(false);
        form.resetFields();
        message.success("Post created successfully");
        setEditingPost(null);
      }
    } catch (error) {
      message.error("Validation failed");
    }
  };

  return (
    <Fragment>
      <Card
        style={{ width: "100%" }}
        title='User Posts'
        extra={
          <Button type='primary' onClick={handleAddPost}>
            Add Post
          </Button>
        }
      >
        {postsLoading ? (
          <Loader />
        ) : postsData && postsData.length > 0 ? (
          <List
            itemLayout='vertical'
            dataSource={postsData}
            renderItem={(post) => (
              <List.Item
                key={post.id}
                extra={
                  <Flex gap={10}>
                    <EditOutlined
                      title='Edit Post'
                      style={{
                        color: "#1890ff",
                        cursor: "pointer",
                        fontSize: 18,
                      }}
                      onClick={() => handleEdit(post)}
                    />
                    <DeleteOutlined
                      title='Delete Post'
                      style={{
                        color: "red",
                        cursor: "pointer",
                        fontSize: 18,
                      }}
                      onClick={() => handleDelete(post)}
                    />
                  </Flex>
                }
              >
                <List.Item.Meta
                  title={<Title level={5}>{post.title}</Title>}
                  description={<Paragraph>{post.body}</Paragraph>}
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty description='No posts found' />
        )}
      </Card>

      <Modal
        title={editingPost ? "Edit Post" : "Add Post"}
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
          setEditingPost(null);
        }}
        onOk={handleSubmit}
        okText={editingPost ? "Update" : "Create"}
        styles={{
          header: {
            borderBottom: "1px solid #f0f0f0",
            paddingBottom: 16,
            marginBottom: 0,
          },
          footer: {
            borderTop: "1px solid #f0f0f0",
            paddingTop: 16,
            marginTop: 0,
          },
        }}
      >
        <Form form={form} layout='vertical' style={{ marginTop: 20 }}>
          <Form.Item
            name='title'
            label='Title'
            rules={[{ required: true, message: "Please enter post title" }]}
          >
            <Input placeholder='Enter post title' />
          </Form.Item>
          <Form.Item
            name='body'
            label='Body'
            rules={[{ required: true, message: "Please enter post body" }]}
          >
            <TextArea
              placeholder='Enter post body'
              rows={4}
              showCount
              maxLength={200}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PostsList;
