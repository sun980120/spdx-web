import React, {useCallback, useEffect, useState} from 'react';
import {postAPI} from "../axiosToAPI";
import {Link} from "react-router-dom";

function CreateOss(callback, deps) {
    // 오픈소스 정보 추가 API
    const addOss = '/oss/add';
    // 라이선스 검색 API
    const searchLicense = '/license/search';
    // 취약점 검색 API
    const searchCve = '/cve/search';

    // 오픈소스 이름
    const [name, setName] = useState('');
    // 오픈소스 버전
    const [version, setVersion] = useState('');
    // 오픈소스 해당 버전 생성 일자
    const [createDate, setCreateDate] = useState('');
    // 오픈소스 생성 그룹
    const [ossGroup, setOssGroup] = useState('');


    // 라이선스 정보 검색 입력창
    const [licenseSearchInput, setLicenseSearchInput] = useState('');
    // 라이선스 정보 검색 내용 데이터
    const [licenseSearchData, setLicenseSearchData] = useState([]);
    // 라이선스 선택 정보
    const [lids, setLids] = useState([]);

    // 취약점 정보 검색 입력창
    const [cveSearchInput, setCveSearchInput] = useState('');
    // 취약점 정보 검색 내용 데이터
    const [cveSearchData, setCveSearchData] = useState([]);
    // 취약점 선택 정보
    const [cids, setCids] = useState([]);


    // 에러 메세지
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    // 테스트바의 입력값이 변경될 때 호출되는 함수
    const handleInputChange = (e) => {
        const inputName = e.target.name;
        const inputValues = {
            'name': setName,
            'version': setVersion,
            'ossGroup': setOssGroup,
            'createDate': setCreateDate,
            'license': setLicenseSearchInput,
            'cve': setCveSearchInput
        };
        if (inputValues[inputName]) {
            inputValues[inputName](e.target.value);
        }
    };
    const restAPI = async (targetUrl, searchInput) => {
        const idList = (targetUrl === '/license/search' ? lids : cids).map(v => v.id);
        const res = await postAPI(targetUrl, {'name': searchInput, 'ids': idList});

        const mapFunc = (key) => ({
            'id': key.id,
            ...(targetUrl === '/license/search'
            ? { 'licenseId': key.licenseId, 'licenseName': key.licenseName, 'licenseContent': key.licenseContent }
            : { 'cveId': key.cveId, 'cveUrl': key.cveUrl })
        })
        if (targetUrl === '/license/search') {
            setLicenseSearchData(prevState => [...prevState, ...res.map(mapFunc)]);
        } else {
            setCveSearchData(prevState => [...prevState, ...res.map(mapFunc)]);
        }
    }
    useEffect(() => {
        setLicenseSearchData([])
        if (licenseSearchInput !== '') {
            restAPI(searchLicense, licenseSearchInput)
        }
    }, [licenseSearchInput, lids]);
    useEffect(() => {
        setCveSearchData([])
        if (cveSearchInput !== '') {
            restAPI(searchCve, cveSearchInput)
        }
    }, [cveSearchInput, cids]);


    const handleDelete= (id, e) => {
        // 해당 id를 가진 항목을 제외한 새로운 배열을 생성하여 저장
        if(e.target.name === 'lids') setLids(lids.filter(item => item.id !== id));
        else setCids(cids.filter(item => item.id !== id));
    };

    const hadleClickItem = (item, e) => {
        // 클릭한 항목을 우측 테스트바로 이동
        if (e.target.id === 'lids') setLids([{id: item.id, licenseId : item.licenseId, licenseName: item.licenseName, licenseContent: item.licenseContent}, ...lids]);
        else setCids([{id: item.id, cveId: item.cveId, cveUrl: item.cveUrl}, ...cids]);
    }

    // OSS 추가 API 호출
    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        const formData = {
            'name': name ?? '',
            'version':version ?? '',
            'createDate':createDate ?? '',
            'ossGroup':ossGroup ?? '',
            'lids': lids && lids.length > 0 ? lids.map(v => v.id) : [],
            'cids': cids && cids.length > 0 ? cids.map(v => v.id) : []
        }
        if (formData.name !== '' && formData.version !== '' && formData.createDate !== '' && formData.ossGroup !== '' ) {
            const res = await postAPI(addOss, formData);
            if (res === "success") {
                setMessage('등록에 성공하였습니다.')
                setMessageColor('blue')
                setName('')
                setVersion('')
                setOssGroup('')
                setCreateDate('')
                setLids([])
                setLicenseSearchInput('')
                setLicenseSearchData([])
                setCveSearchData([])
                setCveSearchInput('')
                setCids([])
            }
            else if (res === "duplicate") {
                setMessage('이미 등록되 오픈소스입니다.')
                setMessageColor('red')
            } else if (res.status === 500) {
                setMessage('관리자에게 문의해 주세요.')
                setMessageColor('red')
            }
        } else {
            setMessage('항목을 전부 입력해주세요')
            setMessageColor('red')
        }
    })
    return (
        <>
            <h2>오픈소스 추가하기</h2>
            <>
                <Link to={"/"}>홈화면</Link><br/>
                <Link to={"/spdx"}>SPDX 문서 생성하기</Link><br/>
                <Link to={"/cve"}>취약점 추가하기</Link>
            </>
            <body>
            <div>
                <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="오픈소스를 입력하세요..."
                />
            </div>
            <br/>
            <div>
                <input
                    name="version"
                    type="text"
                    value={version}
                    onChange={handleInputChange}
                    placeholder="버전을 입력하세요..."
                />
            </div>
            <br/>
            <div>
                <input
                    name="ossGroup"
                    type="text"
                    value={ossGroup}
                    onChange={handleInputChange}
                    placeholder="생성그룹을 입력하세요..."
                />
            </div>
            <br/>
            <div>
                <input
                    name="createDate"
                    type="text"
                    value={createDate}
                    onChange={handleInputChange}
                    placeholder="업데이트날짜를 입력하세요..."
                />
            </div>
            <br/>
            <div>
                <input
                    name="license"
                    type="text"
                    value={licenseSearchInput}
                    onChange={handleInputChange}
                    placeholder="라이선스를 입력하세요..."
                />
                {/* 우측 테스트바 (저장된 내용 리스트) */}
                <ul>
                    {lids.map((input, index) => (
                        <li key={input.id}>
                            {input.licenseId}
                            <button name="lids" onClick={(e) => handleDelete(input.id, e)}>삭제</button>
                        </li>
                    ))}
                </ul>
                <div>
                    <h3>API 검색 결과:</h3>
                    <ul>
                        {licenseSearchData.map((input, index) => (
                            <li id="lids" key={input.id} onClick={(e) => hadleClickItem(input, e)}>
                                {input.licenseId}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <br/>
            <div>
                <input
                    name="cve"
                    type="text"
                    value={cveSearchInput}
                    onChange={handleInputChange}
                    placeholder="취약점을 입력하세요..."
                />
                {/* 우측 테스트바 (저장된 내용 리스트) */}
                <ul>
                    {cids.map((input, index) => (
                        <li key={input.id}>
                            {input.cveId}
                            <button name="cids" onClick={(e) => handleDelete(input.id, e)}>삭제</button>
                        </li>
                    ))}
                </ul>
                <div>
                    <h3>API 검색 결과:</h3>
                    <ul>
                        {cveSearchData.map((input, index) => (
                            <li id="cids" key={input.id} onClick={(e) => hadleClickItem(input, e)}>
                                {input.cveId}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <br/>
            <button name="submit" onClick={onSubmit}>추가</button>
            <div style={{color: messageColor}}>{message}</div>
            </body>
        </>
    )
}

export default CreateOss;