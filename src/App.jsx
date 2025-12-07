import "./App.css";
import { HeaderComponent } from "./Components";
import { NotFoundPage, UserDetailsPage, UserListPage } from "./Pages";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Layout, Breadcrumb, Typography } from "antd";
import { useMemo } from "react";
const { Footer, Content } = Layout;
const { Title, Text } = Typography;

function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const breadcrumbItems = useMemo(() => {
    if (pathname === "/") {
      return [{ title: "Users List" }];
    }

    const pathParts = pathname.split("/").filter(Boolean);
    const userId = pathParts[1];

    return [
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
    ];
  }, [pathname, navigate]);

  return (
    <Layout>
      <HeaderComponent />

      <Content style={{ padding: "0 48px" }}>
        <Routes>
          <Route path='/' element={<UserListPage />} />
          <Route path='/user/:id' element={<UserDetailsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        User Dashboard ©{new Date().getFullYear()} Developed by ACME Inc.
      </Footer>
    </Layout>
  );
}

export default App;
