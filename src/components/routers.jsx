import {createBrowserRouter} from "react-router-dom";
import Home from "../routes/Home";
import CreateOss from "../routes/CreateOss";
import CreateSpdx from "../routes/CreateSpdx";
import CreateCve from "../routes/CreateCve";
import SearchSpdx from "../routes/SearchSpdx";

function routerComponent() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home/>,
            children: [
                {
                    path: "/oss",
                    element: <CreateOss/>
                },
                {
                    path: "/spdx",
                    element: <CreateSpdx/>
                },
                {
                    path: "/cve",
                    element: <CreateCve/>
                },
                {
                    path: "/spdx-all",
                    element: <SearchSpdx/>
                }
            ]
        }
    ])
    return router;
}

export default routerComponent