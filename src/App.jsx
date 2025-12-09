import "./App.css";
import { HeaderComponent, ErrorBoundary } from "./Components";
import { NotFoundPage, UserDetailsPage, UserListPage } from "./Pages";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
const { Footer, Content } = Layout;

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <HeaderComponent />

        <Content style={{ padding: "0 48px" }}>
          <ErrorBoundary>
            <Routes>
              <Route path='/' element={<UserListPage />} />
              <Route path='/user/:id' element={<UserDetailsPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          User Dashboard ©{new Date().getFullYear()} Developed by ACME Inc.
        </Footer>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
