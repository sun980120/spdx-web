import React, {useCallback, useEffect, useState} from 'react';
import {postAPI} from "../axiosToAPI";
import {Link} from "react-router-dom";
import SelectBox from "../components/SelectBox";

function CreateSpdx(){
    const generateSpdx = '/spdx/generate';
    const searchOss = '/oss/search';
    // 오픈소스 검색을 위한 state
    const [ossSearch, setOssSearch] = useState('');
    // 검색한 오픈소스 데이터 관리하기 위한 state
    const [searchOssData, setSearchOssData] = useState([]);
    // 추가한 오픈소스 내용을 관리하기 위한 state
    const [ossData, setOssData] = useState([]);


    // 회사 명칭을 관리하기 위한 state
    const [company, setCompany] = useState('');
    // 프로젝트 명칭을 관리하기 위한 state
    const [projectName, setProjectName] = useState('');
    // 프로젝트 명칭을 관리하기 위한 state
    const [projectPackage, setProjectPackage] = useState('');
    // 프로젝트 명칭을 관리하기 위한 state
    const [projectVersion, setProjectVersion] = useState('');
    // 오픈소스 라이선스 정보를 관리하기 위한 state
    const [requestOssInsert, setRequestOssInsert] = useState([]);

    // 에러 메세지
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    // 프로젝트명, 검색의 입력값이 변경될 때 호출되는 함수
    const handleSearchInputChange = (e) => {
        const inputName = e.target.name;
        const inputValues = {
            'company': setCompany,
            'projectName': setProjectName,
            'projectPackage': setProjectPackage,
            'projectVersion': setProjectVersion,
            'oss': setOssSearch,
        };
        if (inputValues[inputName]) {
            inputValues[inputName](e.target.value);
        }
    }
    // 오픈소스 검색 API 호출
    const searchOSSAPI = async() => {
        const formData = {
            'name': ossSearch,
            'ids':ossData.map(value => value.id)
        }
        const res = await postAPI(searchOss, formData);
        setSearchOssData(prevState => [
            ...prevState,
            ...res.map(resKey => ({
                'id':resKey.id,
                'licenseId':resKey.licenseId,
                'name':resKey.name,
                'version':resKey.version,
                'ossGroup':resKey.ossGroup,
            }))
        ])
    }

    // useEffect를 사용하여 검색 테스트바의 변경 시에 API를 호출
    useEffect(() => {
        setSearchOssData([])
        if (ossSearch !== '') {
            searchOSSAPI();
            // API 호출 로직을 여기에 작성
            // const res = await postAPI(searchOss, formData);
            // console.log(res)
            // 예를 들어, fetch 함수를 사용하여 API를 호출하고 결과를 처리하는 등의 작업을 수행할 수 있습니다.
            // console.log('좌측 테스트바 변경 시 API 호출');
            // console.log(ossSearch)
        }
    }, [ossSearch, ossData]);
    // 삭제 버튼을 클릭했을 때 호출되는 함수
    const handleDelete = (id) => {
        // 해당 id를 가진 항목을 제외한 새로운 배열을 생성하여 저장
        setOssData(ossData.filter(item => item.id !== id));
    }
    // 검색한 오픈소스 정보를 클릭했을 때 호출되는 함수
    const hadleClickItem = (item) => {
        // 클릭한 항목을 우측 테스트바로 이동
        setOssData([{ id: item.id, licenseId: item.licenseId, ossGroup: item.ossGroup, name:item.name,version:item.version }, ...ossData]);
        // 클릭한 항목을 좌측 테스트바에서 삭제
        // setSearchOssData(searchOssData.filter(data => data !== item));
    }
    const onSubmit = useCallback(async(e) => {
        e.preventDefault();
        const formData = {
            "company":company ?? '',
            "projectName":projectName ?? '',
            "projectPackage":projectPackage ?? '',
            "projectVersion":projectVersion ?? '',
            "requestOssInsert": requestOssInsert
        }
        if (formData.company !== '' && formData.projectName !== '' && formData.projectPackage !== '' && formData.projectVersion !== '' && requestOssInsert.length !== 0 && ossData.length !==0 && ossData.length === requestOssInsert.length) {
            const res = await postAPI(generateSpdx, formData);
            if (res === "success") {
                setMessage("SPDX 문서 생성이 완료되었습니다.");
                setMessageColor('blue');
                setCompany('')
                setProjectName('')
                setProjectPackage('')
                setProjectVersion('')
                setRequestOssInsert([])
                setOssData([])
                setOssSearch('')
                setSearchOssData([])
            } else {
                setMessage('관리자에게 문의해 주세요.')
                setMessageColor('red')
            }
        } else {
            if(requestOssInsert.length !== ossData.length) {
                setMessage('라이선스 정보를 선택해주세요');
            } else {
                setMessage('항목을 전부 입력해주세요');
            }
            setMessageColor('red');
        }
    })
    return (
        <>
            <h2>SPDX 문서 생성</h2>
            <>
                <Link to={"/"}>홈화면</Link><br/>
                <Link to={"/oss"}>오픈소스 추가하기</Link><br/>
                <Link to={"/cve"}>취약점 추가하기</Link>
            </>

            <body>
            {/* 회사명 테스트바 */}
            <div>
                <input
                    name="company"
                    type="text"
                    value={company}
                    onChange={handleSearchInputChange}
                    placeholder="회사명을 입력하세요..."
                />
            </div>

            <br/>
            {/* 프로젝트명 테스트바 */}
            <div>
                <input
                    name="projectName"
                    type="text"
                    value={projectName}
                    onChange={handleSearchInputChange}
                    placeholder="프로젝트명을 입력하세요..."
                />
            </div>
            <br/>
            {/* 패키지명 테스트바 */}
            <div>
                <input
                    name="projectPackage"
                    type="text"
                    value={projectPackage}
                    onChange={handleSearchInputChange}
                    placeholder="패키지명을 입력하세요..."
                />
            </div>

            <br/>

            {/* 패키지버전 테스트바 */}
            <div>
                <input
                    name="projectVersion"
                    type="text"
                    value={projectVersion}
                    onChange={handleSearchInputChange}
                    placeholder="패키지 버전을 입력하세요..."
                />
            </div>

            <br/>

            {/* 좌측 테스트바 (검색 창) */}
            <div>
                <input
                    name="oss"
                    type="text"
                    value={ossSearch}
                    onChange={handleSearchInputChange}
                    placeholder="오픈소스를 검색하세요..."
                />

                {/* 추가 버튼 */}
                {/*<button onClick={handleAdd}>추가</button>*/}
            </div>

            </body>
            {/* 우측 테스트바 (저장된 내용 리스트) */}
            <ul>
                {ossData.map((input, index) => (
                    <li key={input.id}>
                        {input.ossGroup}:{input.name}:{input.version} -> <SelectBox selectData={input.licenseId}
                                                                                    selectId={input.id}
                                                                                    setRequestOssInsert={setRequestOssInsert}
                                                                                    requestOssInsert={requestOssInsert}/>
                        <button onClick={() => handleDelete(input.id)}>삭제</button>
                    </li>
                ))}
            </ul>
            <div>
                <h3>API 검색 결과:</h3>
                <ul>
                    {searchOssData.map((input, index) => (
                        <li key={input.id} onClick={() => hadleClickItem(input)}>
                            {input.ossGroup}:{input.name}:{input.version}
                        </li>
                    ))}
                </ul>
            </div>
            <button name="submit" onClick={onSubmit}>추가</button>
            <div style={{color: messageColor}}>{message}</div>
        </>
    )
}

export default CreateSpdx