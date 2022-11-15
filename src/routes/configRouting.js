import Home from "../page/Home";
import Comorbilidad from "../page/Comorbilidad";
import Error404 from "../page/Error404"
import AddComorbilidad from "../page/Comorbilidad/Add/AddComorbilidad";
import UpdateComorbilidad from "../page/Comorbilidad/Update/UpdateComorbilidad";
import DetailComorbilidad from "../page/Comorbilidad/Detail/DetailComorbilidad";

export default[
    {
        path: "/detail/:id",
        exact:true,
        page: DetailComorbilidad
        
    },
    {
        path: "/update/:id",
        exact:true,
        page: UpdateComorbilidad
        
    },
    {
        path: "/add",
        exact:true,
        page: AddComorbilidad
        
    },
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