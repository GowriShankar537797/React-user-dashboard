import { notification } from "antd";
import { createContext, useContext, useEffect, useMemo } from "react";
import useUsersDetailsApis from "./useUsersDetailsApis";
import { useParams } from "react-router-dom";

const Context = createContext();

export const UsersDetailsProvider = ({ children }) => {
  const { id: userId } = useParams();
  const {
    getUsersDetailsByUserId,
    loading: usersLoading,
    data: userDetails,
  } = useUsersDetailsApis();
  const {
    getPostsByUserId,
    loading: postsLoading,
    data: postsData,
    setData: setPostsData,
  } = useUsersDetailsApis();
  useEffect(() => {
    getUsersDetailsByUserId(userId);
    getPostsByUserId(userId);
  }, [userId, getUsersDetailsByUserId, getPostsByUserId]);

  const items = useMemo(() => {
    if (!userDetails || Object.keys(userDetails).length < 1) {
      return [];
    }

    return [
      {
        label: "Name",
        children: userDetails.name,
        span: 3,
      },
      {
        label: "User ID",
        children: userDetails.userId,
        span: 3,
      },
      {
        label: "Email",
        children: userDetails.email,
        span: 3,
      },
      {
        label: "Phone",
        children: userDetails.phone,
        span: 3,
      },
      {
        label: "Company",
        children: userDetails.company.name,
        span: 3,
      },
      {
        label: "Website",
        children: userDetails.website,
        span: 3,
      },
    ];
  }, [userDetails]);

  return (
    <Context.Provider
      value={{
        userDetails,
        usersLoading,
        postsData,
        postsLoading,
        items,
        userId,
        setPostsData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUsersDetails = () => {
  const context = useContext(Context);
  if (!context) {
    notification.error({
      message: "Context not found",
      description: "Please wrap your component in a UseUsersDetailsContext",
    });
    return {};
  }
  return context;
};

export const UseUsersDetailsContext = (Component) => {
  return (props) => (
    <UsersDetailsProvider>
      <Component {...props} />
    </UsersDetailsProvider>
  );
};

export default UseUsersDetailsContext;
