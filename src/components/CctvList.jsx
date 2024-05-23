// 자식 components
import { useEffect, useState } from "react";
import { API_KEY } from "../secret.js";
// onDataLoaded가 props로 전달된 함수이기에 {}를 붙인다.
// eslint-disable-next-line react/prop-types
function CctvList({ onDataLoaded }) {
  //   const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://apis.data.go.kr/5690000/sjCCTV/sj_00000030?pageIndex=1&pageUnit=200&searchCondition=mngInst_Nm&serviceKey=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("데이터를 가져오는데 실패했습니다.");
        }
        const res = await response.json();

        // 위도와 경도 뽑아내기 위한 것
        const latLonList = res.body.items.map((item) => ({
          lat: item.la,
          lon: item.lo,
        }));
        console.log(latLonList);

        // setData(res.body.items);
        // 아래처럼 쓰는 이유 -> 상태변경 시 자동으로 컴포넌트가 재 렌더링 되기 위해
        //setData(latLonList);

        // 데이터를 부모 컴포넌트로 전달
        // onDataLoaded  -> 데이터 로드한 후 부모 컴포넌트에 데이터 전달하기 위해
        // 호출하는 콜백함수
        onDataLoaded(latLonList);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
    // 종속성 배열 , useEffect가 언제 실행될지를 결정한다.
    // 변경시마다 다시 실행해 데이터를 가져온다.
    //   }, [API_KEY, onDataLoaded]); 원래 이렇게 썼는데 외부에서 가져온 값이므로
    // 종속성 배열에서 제거해야함
  }, [onDataLoaded]);

  if (error) {
    return <div>{error}</div>;
  }

  return <div>등장</div>;
}

export default CctvList;

//   if (!data) {
//     return <div>로딩 중...</div>;
//   }

//   return (
//     <div>
//       {/* 데이터를 렌더링하는 로직을 여기에 추가 */}
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
