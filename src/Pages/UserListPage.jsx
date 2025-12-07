import { useEffect, useCallback } from "react";
import { Breadcrumb, Button, Card, Col, Descriptions, Empty, Row } from "antd";
import { useUsersDetailsApis } from "../Hooks";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Components";
const UserListPage = () => {
  const navigate = useNavigate();

  const { getUsersDetails, loading, data } = useUsersDetailsApis();

  useEffect(() => {
    getUsersDetails();
  }, [getUsersDetails]);

  const items = useCallback(
    (user) => {
      return [
        {
          label: "User ID",
          children: user.userId,
          span: 3,
        },
        {
          label: "Phone",

          children: user.phone,
          span: 3,
        },
        {
          label: "Company",

          children: user.company.name,
          span: 3,
        },
        {
          label: "Website",

          children: user.website,
          span: 3,
        },
      ];
    },
    [data]
  );

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Breadcrumb
          style={{ margin: "20px 0" }}
          items={[
            { title: <span style={{ color: "#1890ff" }}> Users List </span> },
          ]}
        />
      </Col>
      {data.length > 0 ? (
        data.map((user) => (
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={24}
            sm={24}
            lg={12}
            xl={8}
            key={user.userId}
          >
            <Card style={{ width: "100%" }}>
              <Descriptions
                bordered
                title={user.name}
                extra={
                  <Button
                    type='primary'
                    onClick={() => navigate(`/user/${user.userId}`)}
                  >
                    View User
                  </Button>
                }
                items={items(user)}
              />
            </Card>
          </Col>
        ))
      ) : (
        <Col span={24}>
          {loading ? (
            <Loader height={600} />
          ) : (
            <Empty description='No users found' />
          )}
        </Col>
      )}
    </Row>
  );
};

export default UserListPage;
