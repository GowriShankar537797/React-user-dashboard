import { Layout, Typography } from "antd";
const { Header } = Layout;
const HeaderComponent = () => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <Typography.Title style={{ color: "#fff", marginTop: "10px" }} level={2}>
        Dashboard
      </Typography.Title>
    </Header>
  );
};

export default HeaderComponent;
