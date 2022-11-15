import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import SingIn from "./page/SignIn";
import Routing from "./routes/Routing";
import {AuthContext} from "./utils/contexts"
import {isUserLogedApi} from "./api/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setloadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false)

  useEffect(() => {
    setRefreshCheckLogin(false);
    setUser(isUserLogedApi());
    setloadUser(true);
  }, [refreshCheckLogin]);

  if(!loadUser) return null;
  

  return (
    <AuthContext.Provider value={user}>
      {user ? (
        <Routing setRefreshCheckLogin={setRefreshCheckLogin}/>
      ):(<SingIn  setRefreshCheckLogin={setRefreshCheckLogin}/>)}

    </AuthContext.Provider>
  );
}
