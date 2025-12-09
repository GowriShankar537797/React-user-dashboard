import React from "react";
import { Result, Button } from "antd";
import { HomeOutlined, ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
          navigate={this.props.navigate}
        />
      );
    }

    return this.props.children;
  }
}

function ErrorFallback({ error, errorInfo, onReset, navigate }) {
  return (
    <Result
      status='500'
      title='500'
      subTitle='Sorry, something went wrong. An error occurred while rendering this page.'
      extra={[
        <Button
          type='primary'
          key='home'
          icon={<HomeOutlined />}
          onClick={() => {
            onReset();
            if (navigate) {
              navigate("/");
            } else {
              window.location.href = "/";
            }
          }}
        >
          Go Home
        </Button>,
        <Button
          key='reload'
          icon={<ReloadOutlined />}
          onClick={() => {
            onReset();
            window.location.reload();
          }}
        >
          Reload Page
        </Button>,
      ]}
    >
      {error && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            background: "#f5f5f5",
            borderRadius: "4px",
            textAlign: "left",
            maxHeight: "25vh",
            overflow: "auto",
          }}
        >
          <details>
            <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
              Error Details (Development Only)
            </summary>
            <pre
              style={{
                marginTop: "10px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontSize: "12px",
              }}
            >
              {error.toString()}
              {errorInfo && errorInfo.componentStack}
            </pre>
          </details>
        </div>
      )}
    </Result>
  );
}

function ErrorBoundary({ children }) {
  const navigate = useNavigate();
  return (
    <ErrorBoundaryClass navigate={navigate}>{children}</ErrorBoundaryClass>
  );
}

export default ErrorBoundary;
