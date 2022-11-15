import Home from "../page/Home";
import Comorbilidad from "../page/Comorbilidad";
import Error404 from "../page/Error404"

export default[
    {
        path: "/comorbilidad",
        exact:true,
        page: Comorbilidad
        
    },
    {
        path: "/",
        exact:true,
        page: Home
        
    },
    {
        path: "*",
        page: Error404
    }
];