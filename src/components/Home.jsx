import { useEffect, useState } from "react";
import styles from "./List.module.css";

// 홈 컴포넌트
function Home() {
  // eslint-disable-next-line react/prop-types
  const SlideShow = ({ images }) => {
    const [index, setIndex] = useState(0);

    const nextSlide = () => {
      setIndex(
        (prevIndex) =>
          // eslint-disable-next-line react/prop-types
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        //0: 이 부분은 삼항 연산자
        //즉 현재 이미지가 마지막 이미지인 경우,
        //다음 인덱스를 0으로 설정하여 다시 첫 번째 이미지로 돌아가게 됨
      );
    };

    useEffect(() => {
      const interval = setInterval(nextSlide, 3000); // 3초간
      return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // slideshow 렌더링
    return (
      <div className={styles.slideshow}>
        <img
          src={images[index]}
          alt={`Slide ${index}`}
          className={styles.slideshow_image}
        />
      </div>
    );
  };
  const images = ["crime1.jpg", "eye1.jpg", "security1.jpg"];

  // 나머지 내용 렌더링
  return (
    <div>
      <SlideShow images={images} />
      {/* <Link to="/search?query=오늘 점심">오늘 점심 검색</Link> */}
    </div>
  );
}
export default Home;
