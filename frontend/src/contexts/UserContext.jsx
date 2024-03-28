import { createContext, useState } from "react";

const UserContext = createContext();

const UserState = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [cookie, setCookie] = useState(false);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, cookie, setCookie }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserState };
