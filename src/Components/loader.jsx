import { Spin } from "antd";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 200,
      }}
    >
      <Spin />
    </div>
  );
};

export default Loader;
