import { Wrapper } from "@googlemaps/react-wrapper";
// import Navi from "./components/Navi";
import List from "./components/List";

// Wrapper 컴포넌트는 맵 초기화 할 수 있음
// wrapper은 내부가 아니라 외부에 있어야 하므로 부모 컴포넌트인 app에 있어야 한다.
import "./index.css";

function App() {
  // const [latLonList, setLatLonList] = useState([]);

  return (
    <div>
      <List />

      <Wrapper
        apiKey={"AIzaSyDG_AcAMbrh8wdJe1Icy1FPOcNCUv9lr4Y"}
        libraries={["places"]}
      ></Wrapper>
    </div>
  );
}

export default App;
