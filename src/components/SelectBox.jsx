import React from "react";

function SelectBox (props) {
    const ossId = props.selectId;
    const licenseDataList = props.selectData; // ["Apache-2.0", "MIT"]
    const handleChange = async(e) => {
        const updatedRequestOssInsert = [...props.requestOssInsert]; // 이전 상태 복사
        const existingIndex = updatedRequestOssInsert.findIndex(item => item.ossId === ossId);
        if (existingIndex !== -1) {
            // 기존에 같은 ossId가 있으면 제거
            updatedRequestOssInsert.splice(existingIndex, 1);
        }
        // 새로운 요소 추가
        updatedRequestOssInsert.push({
            "ossId": ossId,
            "licenseData": e.target.value === "" || e.target.value === "noassertion" ? "NOASSERTION" : e.target.value,
            "licenseDataList": licenseDataList
        });
        props.setRequestOssInsert(updatedRequestOssInsert);
    }
    return(
        <>
            <select onChange={handleChange}>
                <option key="">선택</option>
                <option key="noassertion">NOASSERTION</option>
                {licenseDataList.map(v => {
                    return (<option key={v}>{v}</option>)
                })}
            </select>
        </>
    )
}

export default SelectBox;