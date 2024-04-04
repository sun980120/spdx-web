import React, {useCallback, useEffect, useState} from "react";
import {postAPI} from "../axiosToAPI";
import SpdxSelectBox from "../components/SpdxSelectBox";

function SearchSpdx() {
    const searchSpdx = '/spdx';

    const [company, setCompany] = useState('');
    const [companyList, setCompanyList] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [projectNameList, setProjectNameList] = useState([]);
    const [projectPackage, setProjectPackage] = useState('');
    const [projectPackageList, setProjectPackageList] = useState([]);
    const [projectVersion, setProjectVersion] = useState('');
    const [projectVersionList, setProjectVersionList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPage, setTotalPage] = useState();
    const [totalElements, setTotalElements] = useState();


    const [spdxData, setSpdxData] = useState([]);

    // const handleInputChange = (e) => {
    //     const inputName = e.target.name;
    //     const inputValues = {
    //         'company': setCompany,
    //         'projectName': setProjectName,
    //         'projectPackage': setProjectPackage,
    //         'projectVersion': setProjectVersion,
    //     };
    //     if (inputValues[inputName]) {
    //         inputValues[inputName](e.target.value);
    //     }
    // }
    const searchSpdxFunc = useCallback(async () => {
        const formData = {
            'company': company,
            'projectName': projectName,
            'projectPackage': projectPackage,
            'projectVersion': projectVersion,
            'offset': offset,
            'size': size
        }
        console.log(formData)
        const res = await postAPI(searchSpdx, formData);
        console.log(res)
        setSpdxData([])
        setSpdxData(res.content.map(v => ({
            'id':v.id,
            'company':v.company,
            'projectName':v.projectName,
            'projectPackage':v.projectPackage,
            'projectVersion':v.projectVersion,
        })));
        console.log(spdxData)
        setCompanyList([])
        setCompanyList([...new Set(res.content.map(v => v.company))]);
        console.log(companyList)
        setProjectNameList([])
        setProjectNameList(res.content.map(v => v.projectName));
        console.log(projectNameList)
        setProjectPackageList([])
        setProjectPackageList(res.content.map(v => v.projectPackage));
        console.log(projectPackageList)
        setProjectVersionList([])
        setProjectVersionList(res.content.map(v => v.projectVersion));
        console.log(projectVersionList)
        setTotalElements(res.totalPages);
        setTotalElements(res.totalElements);
    })
    useEffect(async() => {
        await searchSpdxFunc()
    }, []);
    useEffect(async () => {
        console.log(company)
        if (company !== '') await searchSpdxFunc()
    }, [company]);
    useEffect(async() => {
        if (projectName !== '') await searchSpdxFunc()
    }, [projectName]);
    // useEffect(async() => {
    //     if (projectPackage !== '') await searchSpdxFunc()
    // }, [projectPackage]);
    //
    // useEffect(async() => {
    //     if (projectVersion !== '') await searchSpdxFunc()
    // }, [projectVersion]);

    console.log(spdxData)
    // console.log(company)
    console.log(projectName)
    // console.log(projectPackage)
    // console.log(projectVersion)

    return (
        <>
            <h2>SPDX 문서 조회</h2>
            <body>
            {/* 회사명 테스트바 */}
            <div>
                <SpdxSelectBox selectData={companyList} setState={setCompany}/>
            </div>

            <br/>
            {/* 프로젝트명 테스트바 */}
            <div>
                <SpdxSelectBox selectData={projectNameList} setState={setProjectName}/>
            </div>
            <br/>
            {/* 패키지명 테스트바 */}
            <div>
                <SpdxSelectBox selectData={projectPackageList} setState={setProjectPackage}/>
            </div>

            <br/>

            {/* 패키지버전 테스트바 */}
            <div>
                <SpdxSelectBox selectData={projectVersionList} setState={setProjectVersion}/>
            </div>

            <br/>
            </body>
        </>
    )
}

export default SearchSpdx;