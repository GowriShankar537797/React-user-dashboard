import { Spin } from "antd";

const Loader = ({ height = 200 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `${height}px`,
      }}
    >
      <Spin />
    </div>
  );
};

export default Loader;
