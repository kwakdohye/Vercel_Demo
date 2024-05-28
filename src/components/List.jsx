import { useState } from "react";
import {
  BrowserRouter as Router, //사용자의 현재 주소와 일치하는 컴포넌트를 렌더링하는 라우터
  Route, //특정 주소에 대한 라우팅 규칙을 정의
  Link, //Link: 다른 주소로 이동할 수 있는 링크를 생성
  Routes, //여러 개의 Route를 그룹화하고 관리하는 컴포넌트
  Outlet, //부모 Route에서 중첩된 하위 Route를 렌더링하는 데 사용되는 특수한 컴포넌트
  useNavigate, //라우터를 통해 프로그래밍적으로 페이지를 이동시키기 위한 훅
  useParams,
  useLocation, // 현재 브라우저의 위치 정보를 가져오는 훅
} from "react-router-dom";
import styles from "./List.module.css";
import Login from "./Login";
import CctvMap from "./CctvMap";
import Home from "./Home";
import SignUp from "./SignUp";

function SearchWithLogo() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?query=${searchTerm}`);
  };

  const image = "crime.png"; // 이미지 파일 경로를 문자열로 설정
  const image3 = "join.png";

  // 로그인 버튼
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={image} alt="Logo" className={styles.logo} />
        <div className={styles.searchInputs}>
          <legend>통합검색 </legend>
          <div className={styles.searchListBox}></div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력하세요"
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            검색
          </button>
        </div>
        {/* <ul className="userInfomation">
          <img src={image2}></img>
          로그인
        </ul> */}
        <ul className={styles.userInfomation}>
          <img
            src={image3}
            alt="User Image"
            className={styles.slideshow_image}
            onClick={handleLogin}
          />
        </ul>
      </div>
      {query && <p>검색어: {query}</p>}
    </div>
  );
}

// About 컴포넌트
function About() {
  const { name } = useParams();
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>About 페이지</h1>
      <p>이 페이지는 About 페이지입니다.</p>
      <p>전달받은 파라미터: {name}</p>
      <button onClick={goToMain}>메인으로 이동</button>
    </div>
  );
}

// Info 컴포넌트
function Info() {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Info 페이지</h1>
      <p>이 페이지는 Info 페이지입니다.</p>
      <button onClick={goToMain}>메인으로 이동</button>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <SearchWithLogo />
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/toggle" className={styles.navtoggle}>
              ☰
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              홈
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/search" className={styles.navLink}>
              검색
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/location" className={styles.navLink}>
              지도
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

// 라우터 컴포넌트

function List() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about/" element={<About />} />
          <Route path="/about/:name" element={<About />} />
          <Route path="/info" element={<Info />} />
          <Route path="/search" element={<SearchWithLogo />} />
          <Route path="/location" element={<CctvMap />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default List;
