import { UseUsersDetailsContext, useUsersDetails } from "../Hooks";
import { Content } from "antd/es/layout/layout";
import { Breadcrumb, Card, Col, Descriptions, Empty, Row, Spin } from "antd";
import { Loader, PostsList } from "../Components";
import { useNavigate } from "react-router-dom";

const UserDetailsPage = () => {
  const { usersLoading, items, userId } = useUsersDetails();
  const navigate = useNavigate();
  return (
    <Content>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Breadcrumb
            style={{ margin: "20px 0" }}
            items={[
              {
                title: (
                  <span
                    style={{ cursor: "pointer", color: "#1890ff" }}
                    onClick={() => navigate("/")}
                  >
                    Users List
                  </span>
                ),
              },
              { title: userId || "User Details" },
            ]}
          />
        </Col>
        <Col span={24}>
          <Card style={{ width: "100%" }}>
            {usersLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 200,
                }}
              >
                <Loader />
              </div>
            ) : items.length > 0 ? (
              <Descriptions bordered title='User Details' items={items} />
            ) : (
              <Empty description='User details not found' />
            )}
          </Card>
        </Col>
        <Col span={24}>
          <PostsList />
        </Col>
      </Row>
    </Content>
  );
};

export default UseUsersDetailsContext(UserDetailsPage);
