import React, { useState, useEffect, ReactNode } from "react";
import Login from "../pages/login";
import { useRouter } from "next/router";
// import Loading from "../components/loading/index";
import { auth } from "./firebaseApp";
import { usePathname } from "next/navigation";
import { User, UserCredential } from "firebase/auth";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  // Router
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);

  const handleAuthChange = (userCredential: User | null) => {
    userCredential ? setIsLoading(false) : setUser(userCredential);
  };

  // const { data: user } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const user = useContext(AuthContext);
  useEffect(() => {
    auth.onAuthStateChanged(handleAuthChange);
  }, [user]);

  if (user) {
    if (pathname === "/login") {
      return <Login />;
    }
    return children;
  } else if (!user && !isLoading) {
    return <Login />;
  }
  return <></>;
}
