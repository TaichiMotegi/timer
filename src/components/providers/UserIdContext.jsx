import { createContext } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export const UserIdContext = createContext({});

export const UserIdProvider = (props) => {
  const { children } = props;

  let sampleObj = {};
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    const uid = user.uid;
    sampleObj.userId = uid;
  });

  return (
    <UserIdContext.Provider value={sampleObj}>
      {children}
    </UserIdContext.Provider>
  );
};
