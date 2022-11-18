import React from 'react'
import { Link } from "react-router-dom";
import Logo from "../../assets/png/logo_hnes.png";

import "./Error404.scss";


export default function Error404() {
  return (
    <div className="error404">
      <img src={Logo} alt="Twittor" />
      <h2>Error 404</h2>
      <h2>Page not found</h2>
      <Link to="/">Volver al inicio</Link>
    </div>
  )
}
