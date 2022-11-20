import Home from "../page/Home";
import Comorbilidad from "../page/Comorbilidad";
import Error404 from "../page/Error404"
import AddComorbilidad from "../page/Comorbilidad/Add/AddComorbilidad";
import UpdateComorbilidad from "../page/Comorbilidad/Update/UpdateComorbilidad";
import DetailComorbilidad from "../page/Comorbilidad/Detail/DetailComorbilidad";
import Sintomas from "../page/Sintomas";
import AddSintomas from "../page/Sintomas/Add/AddSintomas";
import DetailSintomas from "../page/Sintomas/Detail/DetailSintomas";
import UpdateSintomas from "../page/Sintomas/Update/UpdateSintomas";
import Pacientes from "../page/Pacientes";
import DetailPacientes from "../page/Pacientes/Detail/DetailPacientes";
import AddPacientes from "../page/Pacientes/Add/AddPacientes";
import UpdatePaciente from "../page/Pacientes/Update/UpdatePaciente";

export default[
    {
        path: "/updatepaciente/:id",
        exact:true,
        page: UpdatePaciente
    },
    {
        path: "/addpaciente",
        exact:true,
        page: AddPacientes
    },
    {
        path: "/detailpaciente/:id",
        exact:true,
        page: DetailPacientes

    },
    {
        path: "/pacientes",
        exact:true,
        page: Pacientes
        
        
    },
    {
        path: "/updatesintoma/:id",
        exact:true,
        page: UpdateSintomas
        
        
    },
    {
        path: "/detailsintoma/:id",
        exact:true,
        page: DetailSintomas
        
    },
    {
        path: "/addsintoma",
        exact:true,
        page: AddSintomas
        
    },
    {
        path: "/sintomas",
        exact:true,
        page: Sintomas
        
    },
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