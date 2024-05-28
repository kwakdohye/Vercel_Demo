//ES 모듈로 변경
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";

// const express = import('express');
// //require => import으로 변경
// const bodyParser = import('body-parser');
// const cors = import('cors');
// const mysql = import('mysql'); // mysql모듈 사용

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// 2.MySQL 데이터베이스 접속 확인
// const db = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '1234',
//     database: 'world',
//     port: 3306 // mysql 서버 포트번호
//   });

let db;
(async () => {
  try {
    db = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "1234",
      database: "map",
      port: 3306, // mysql 서버 포트번호
    });
    console.log("MySQL connected");
  } catch (err) {
    console.log("MySQL connection error:", err);
  }
})();

// db.connect((err) =>{
//     if(err) {
//         console.log('MySQL connection error:', err);
//         return;
//     }
//     console.log('MySQL connected');
// });

// 3.SQL쿼리 확인
// 회원가입 라우트
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users(name,email,password) VALUES(?,?,?)";
  //     db.query(sql,[name,email,password],(err,result)=>{
  //         if(err){
  //             console.error('MySQL query error:', err);
  //             return res.status(500).send('회원가입 실패');
  //         }
  //         res.send('회원가입 성공');
  //     });
  // });

  try {
    const [result] = await db.execute(sql, [name, email, password]);
    res.send("회원가입 성공");
  } catch (err) {
    console.log("MySQL query error:", err);
    res.status(500).send("회원가입 실패");
  }
});

// 로그인
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received:", { email, password });

  const sql = "SELECT * FROM users WHERE email = ?";
  //?를 사용하여 이메일을 변수에 바인딩
  //   db.query(sql, [email], (err, result) => {
  //     if (err) {
  //       console.log("MYSQL query error", err);
  //       return res.status(500).send("로그인 실패");
  //     }

  try {
    const [result] = await db.execute(sql, [email]);
    console.log("Query result:", result);
    // 사용자가 없을 경우
    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }
    // 비밀번호 일치 여부 확인
    const user = result[0];
    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }

    // 로그인 성공
    res.json({ success: true, message: "로그인 성공" });
  } catch (err) {
    console.log("MYSQL query error:", err);
    res.status(500).json({ success: false, message: "로그인 실패" });
  }
});

// 서버실행
// 1.서버에 대한 접근 권한 확인
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
