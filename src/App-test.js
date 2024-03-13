import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";

function AppTest() {
  // 좌측 테스트바의 상태를 관리하기 위한 state
  const [searchInput, setSearchInput] = useState('');
  // 우측 테스트바에 나열될 내용을 관리하기 위한 state
  const [savedInputs, setSavedInputs] = useState([]);

  // 좌측 테스트바의 입력값이 변경될 때 호출되는 함수
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  }

  // useEffect를 사용하여 좌측 테스트바의 변경 시에 API를 호춝
    useEffect(() => {
        if (searchInput !== '') {
            // API 호출 로직을 여기에 작성
            // 예를 들어, fetch 함수를 사용하여 API를 호출하고 결과를 처리하는 등의 작업을 수행할 수 있습니다.
            console.log('좌측 테스트바 변경 시 API 호출');
            console.log(searchInput)
        }
    }, [searchInput]);

  // 추가 버튼을 클릭했을 때 호출되는 함수
  const handleAdd =() => {
    // 새로운 내용을 저장
    setSavedInputs([...savedInputs, searchInput]);
    // 검색창 초기화
    setSearchInput('');
  }
  return(
      <>
        {/* 좌측 테스트바 (검색 창) */}
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="내용을 검색하세요..."
          />
        {/* 우측 테스트바 (저장된 내용 리스트) */}
        <ul>
          {savedInputs.map((input, index) => (
              <li key={index}>{input}</li>
          ))}
        </ul>
        {/* 추가 버튼 */}
          <button onClick={handleAdd}>추가</button>
      </>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
