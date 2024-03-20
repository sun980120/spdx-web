import React from "react";

function SpdxSelectBox (props) {
    const selectData = props.selectData; // ["Apache-2.0", "MIT"]
    const handleChange = async(e) => {
        props.setState(e.target.value);
    }
    return(
        <>
            <select onChange={handleChange}>
                <option key="">선택</option>
                {
                    selectData.length === 1 ? (
                        <option key={selectData}>{selectData}</option>
                    ) : (
                        selectData.map(v => <option key={v}>{v}</option>)
                    )
                }
            </select>
        </>
    )
}

export default SpdxSelectBox;