import React from 'react';
import {Link} from "react-router-dom";

function Home(){
    return (
        <>
            <h2>홈 화면</h2>
            <>
                <Link to={"/oss"}>오픈소스 추가하기</Link>
            </>
            <br/>
            <>
                <Link to={"/spdx"}>SPDX 문서 생성</Link>
            </>
            <br/>
            <>
                <Link to={"/cve"}>취약점 추가하기</Link>
            </>
            <br/>
            <>
                <Link to={"/spdx-all"}>SPDX 문서 조회</Link>
            </>
        </>
    );
}

export default Home;