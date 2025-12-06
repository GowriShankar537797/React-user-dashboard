import { useState } from "react";
import users from "../data/users.json";
import posts from "../data/posts.json";

const useUsersDetailsApis = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUsersDetails = async () => {
    setLoading(true);
    setTimeout(() => {
      setData(users);
      setLoading(false);
    }, 1000);
  };

  const getUsersDetailsByUserId = async (userId) => {
    setLoading(true);
    setTimeout(() => {
      const user = users.find((user) => user.userId === userId);
      if (user) {
        setData(user);
      } else {
        setError("User not found");
      }
      setLoading(false);
    }, 1000);
  };

  const getPostsByUserId = async (userId) => {
    setLoading(true);
    setTimeout(() => {
      const filteredPosts = posts.filter((post) => post.userId === userId);
      if (filteredPosts.length > 0) {
        setData(filteredPosts);
      } else {
        setError("Posts not found");
      }
      setLoading(false);
    }, 1000);
  };

  return {
    data,
    loading,
    error,
    getUsersDetails,
    getUsersDetailsByUserId,
    getPostsByUserId,
  };
};
export default useUsersDetailsApis;
