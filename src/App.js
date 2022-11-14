import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import SingIn from "./page/SignIn";
import Routing from "./routes/Routing";

export default function App() {
  const [user, setUser] = useState({name: "Jose"});

  return (
    <div>
      {user ? (
        <div>
          <SingIn />
        </div>
      ) : (
        <h1>No estas logeado</h1>
      )}
    </div>
  );
}
