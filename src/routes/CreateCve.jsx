import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {postAPI} from "../axiosToAPI";

function CreateCve(){
    const addCve = '/cve/add';
    // 프로젝트 명칭을 관리하기 위한 state
    const [cveId, setCveId] = useState('');
    // // 오픈소스 검색을 위한 state
    // const [cveUrl, setCveUrl] = useState('');
    // 에러 메세지
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    // 프로젝트명, 검색의 입력값이 변경될 때 호출되는 함수
    const handleSearchInputChange = (e) => {
        console.log(e.target.name)
        if(e.target.name === 'cveId') {
            setCveId(e.target.value)
        } else {

        }
    }
    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (cveId !== '') {
            const res = await postAPI(addCve, {'cveId': cveId});
            if (res == "success") {
                setMessage('등록에 성공하였습니다.')
                setMessageColor('blue')
                setCveId('');
            }
            else if (res === "duplicate") {
                setMessage('이미 등록된 취약점 정보입니다.')
                setMessageColor('red')
            }
        } else {
            setMessage('항목을 전부 입력해주세요')
            setMessageColor('red')
        }
    })
    return (
        <>
            <h2>취약점 추가하기</h2>
            <>
                <Link to={"/"}>홈화면</Link><br/>
                <Link to={"/oss"}>오픈소스 추가하기</Link><br/>
                <Link to={"/spdx"}>SPDX문서 생성기</Link>
            </>

            <body>
            {/* 프로젝트명 테스트바 */}
            <div>
                <input
                    name="cveId"
                    type="text"
                    value={cveId}
                    onChange={handleSearchInputChange}
                    placeholder="CVE-ID 입력하세요..."
                />
            </div>
            <br/>
            <button name="submit" onClick={onSubmit}>추가</button>
            <div style={{color: messageColor}}>{message}</div>
            </body>
        </>
    )
}

export default CreateCve;