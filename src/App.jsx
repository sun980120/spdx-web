import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./routes/Home";
import CreateOss from "./routes/CreateOss";
import CreateSpdx from "./routes/CreateSpdx";
import CreateCve from "./routes/CreateCve";
import SearchSpdx from "./routes/SearchSpdx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/oss" element={<CreateOss/>}/>
                <Route path="/spdx" element={<CreateSpdx/>}/>
                <Route path="/cve" element={<CreateCve/>}/>
                <Route path="/spdx-all" element={<SearchSpdx/>}/>
            </Routes>
        </>
    );
}
export default App