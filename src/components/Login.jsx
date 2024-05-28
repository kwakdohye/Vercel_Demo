import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
// import SignUp from "./SignUp";
import axios from "axios";

// useState는 초기 상태 설정하는 부분
// eslint-disable-next-line react/prop-types
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //   const [loginCheck, setLoginCheck] = useState(false);
  // 초기에는 로그인 되어있지 않는 상태를 나타냄, 처음 렌더링 시 false고 로그인
  // 상태 변경 시 마다 setLoginCheck함수를 사용하여 해당 상태 변경

  //동기함수
  // const handleSubmit = (e) => {
  //   e.preventDefault(); //페이지 이동 취소
  //   if (email === "email" && password === "password") {
  //     onLogin(email);
  //     alert("로그인이 되었습니다.");
  //     console.log("로그인 성공");
  //   } else {
  //     // 로그인 실패
  //     setError("이메일 또는 비밀번호가 올바르지 않습니다.");
  //     // 에러 메세지 alert창으로 표시할 수 있음
  //     // alert("이메일 또는 비밀번호가 올바르지 않습니다. 회원가입 ㄱ");
  //   }
  // };

  //async함수;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("폼 제출", { email, password });

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      console.log("Response received:", response); // 디버깅용 로그
      if (response.data.success) {
        onLogin(email);
        // 로그인 요청이 성공하면 서버에서 받은 응답을 기반으로 로그인
        // 성공여부 확인,
        // 성공 시 onLogin함수를 호출하여 사용자를 로그인 상태로 변경
        // 실패할 경우 에러메세지 설정
        alert("로그인 성공");
        // console.log("로그인 성공");
      } else {
        console.error("Error during login request:", error); // 디버깅용 로그
        setError("이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      alert("로그인 실패");
    }
  };

  const navigate = useNavigate();
  // 로그인 성공시 로그인 후의 대시보드 페이지로 이동,
  // 버튼 클릭 시 특정 페이지로 이동하는 등에서 사용됨

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}> login</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="userEmail" className={styles.label}>
            {/* htmlFor 레이블과 입력 필드 간의 연결을 설정 */}
            Email:
          </label>
          <input
            type="text"
            id="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            autoComplete="email" //자동완성을 사용할 수 있는 것
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="userPassword" className={styles.label}>
            password:
          </label>
          <input
            type="password"
            id="userPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            autoComplete="current-password"
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div className={styles.buttons}>
          <button
            type="submit"
            // onClick={handleSubmit}
            className={styles.button}
          >
            로그인
          </button>
          <button
            type="button"
            onClick={handleSignUp}
            className={styles.button}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

// 로그인된 사용자 정보를 상태로 관리함, 만약 로그인 되어있지 않다면
// LoginForm 을 렌더링하고 로그인되어 있다면
// 사용자 환영하는 메세지와 로그아웃 버튼 표시
function Login() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (email) => {
    setLoggedInUser(email);
    navigate("/");
  };

  return (
    <div>
      {loggedInUser ? (
        <div>
          <h2>Welcome, {loggedInUser}!</h2>
          <button onClick={() => setLoggedInUser(null)}>Logout</button>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default Login;
