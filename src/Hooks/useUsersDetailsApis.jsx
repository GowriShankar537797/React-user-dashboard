import { useState, useCallback } from "react";
import users from "../data/users.json";
import posts from "../data/posts.json";
import { notification } from "antd";

const useUsersDetailsApis = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsersDetails = useCallback(async () => {
    setLoading(true);
    setTimeout(() => {
      setData(users);
      setLoading(false);
    }, 1000);
  }, []);

  const getUsersDetailsByUserId = useCallback(async (userId) => {
    setLoading(true);

    setTimeout(() => {
      const user = users.find((user) => user.userId === userId);
      if (user) {
        setData(user);
      } else {
        notification.error({
          message: "User not found",
        });
        setData(null);
      }
      setLoading(false);
    }, 1000);
  }, []);

  const getPostsByUserId = useCallback(async (userId) => {
    setLoading(true);

    setTimeout(() => {
      const filteredPosts = posts.filter((post) => post.userId === userId);
      if (filteredPosts.length > 0) {
        setData(filteredPosts);
      } else {
        notification.error({
          message: "Posts not found",
        });
        setData([]);
      }
      setLoading(false);
    }, 1000);
  }, []);

  return {
    data,
    loading,
    setData,
    getUsersDetails,
    getUsersDetailsByUserId,
    getPostsByUserId,
  };
};
export default useUsersDetailsApis;
