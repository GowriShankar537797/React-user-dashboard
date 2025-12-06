import { useEffect, useCallback } from "react";
import { Button, Card, Col, Descriptions, Row, theme } from "antd";
import { useUsersDetailsApis } from "../Hooks";
import { useNavigate } from "react-router-dom";
const UserListPage = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { getUsersDetails, loading, error, data } = useUsersDetailsApis();

  useEffect(() => {
    getUsersDetails();
  }, []);

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
    <div
      style={{
        background: colorBgContainer,
        minHeight: 280,
        padding: 24,
        borderRadius: borderRadiusLG,
      }}
    >
      <Row gutter={[16, 16]}>
        {data.length > 0 ? (
          data.map((user) => (
            <Col xs={24} sm={12} lg={7} xl={7} key={user.userId}>
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
            {loading ? <div>Loading...</div> : <div>No users found</div>}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default UserListPage;
