import Root from "../pages/Root.jsx";
import Home from "../pages/Home.jsx";
import Book from "../pages/Book.jsx";
import Add from "../pages/Add.jsx";

const routes=[
    {
        path:'/',
        element:<Root/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'book',
                children:[
                    {
                        index:true,
                        element:<Book/>
                    },
                    {
                        path:'edit/:id',
                        element:<Add functionName='edit'/>
                    }
                    ]
            }
        ]
    },
    {
        path:'/add',
        element:<Add functionName='add'/>
    }

]

export default routes;