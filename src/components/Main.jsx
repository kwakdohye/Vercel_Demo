import { Link } from "react-router-dom";
import SlideShow from "./SlideShow"; // SlideShow 컴포넌트 파일 경로

function Main() {
  const images = ["crime1.jpg", "eye1.jpg", "security1"];
  return (
    <div>
      <SlideShow images={images} />
      <Link to="/search?query=오늘 점심">오늘 점심 검색</Link>
    </div>
  );
}

export default Main;
