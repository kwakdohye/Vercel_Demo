import { useState } from "react";
import CctvList from "./CctvList";
import GoogleMap from "./GoogleMap";

function CctvMap() {
  const [latLonList, setLatLonList] = useState([]);

  return (
    <>
      <GoogleMap latLonList={latLonList} />
      <CctvList onDataLoaded={setLatLonList} />
    </>
  );
}
export default CctvMap;

//React.Fragment 또는 빈 태그 (<>...</>)를 사용하여 모든 JSX 요소를 하나의 부모 요소로 래핑
