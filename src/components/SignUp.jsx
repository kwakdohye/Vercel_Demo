import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useState } from "react";
import axios from "axios"; // 서버와 통신하는 것

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  //   const [error, setError] = useState("");

  const navigate = useNavigate();
  //   const handleHome = () => {
  //     navigate("/home");
  //   };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    // 서버로 데이터 전송하고 응답을 기다리는 부분을
    e.preventDefault();
    if (password !== confirmPassword) {
      // return alert("비밀번호는 같아야 합니다.");
      setError("비밀번호가 다릅니다.");
      return;
    }
    try {
      //엔드포인트로 보내진다.
      //엔드포인트:클라이언트가 서버의 특정 리소스에 접근하기 위해 사용하는 URL
      //사용자가 회원가입 양식에 입력한 정보를 서버로 전송하여
      //새로운 사용자를 등록하는 요청을 수행
      const response = await axios.post("http://localhost:4000/signup", {
        name,
        email,
        password,
      });
      alert(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("회원가입 실패");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>
      <form onSubmit={handleSignUp} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            이름:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleName}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            이메일:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmail}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            비밀번호:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            비밀번호 확인:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            className={styles.input}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          가입하기
        </button>
      </form>
    </div>
  );
}

export default SignUp;
