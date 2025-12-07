import "./App.css";
import { HeaderComponent } from "./Components";
import { NotFoundPage, UserDetailsPage, UserListPage } from "./Pages";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
const { Footer, Content } = Layout;

function App() {
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
