const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const app = express();
const path = require('path');
const PORT = process.env.POST || 5000;
const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, 'public')));
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/', () => {
  resizeBy.send('welcome');
});

app.post('/api/forma', (req, res) => {
  let data = req.body;

  const smtpTransprot = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: 'godkor200@gmail.com', // gmail 계정 아이디를 입력
      pass: 'Dbqudrnr1!', // gmail 계정의 비밀번호를 입력
    },
  });

  const mailOptions = {
    from: 'godkor200@gmail.com', // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
    to: data.email, // 수신 메일 주소
    subject: `안녕하십니까 ${data.name}님 유병국입니다`, // 제목
    // html:
    //   '<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcdXkhG%2FbtqLop8aO10%2FQEYSmGyTT4ssEa2X54yIrk%2Fimg.png"></img>',
    text:
      '이렇게 관심을 가져 주셔서 감사드립니다. 하기 url로 이력서를 보내드리오니 검토부탁드립니다. https://bit.ly/3rTZbKr',
    // attachments: [
    //   {
    //     filename: '유병국_백엔드이력서.pdf',
    //     path:
    //       'https://drive.google.com/file/d/11EeOkKDfNdyMEvLQ-MIfPCFFIzV1P7OH/view?usp=sharing',
    //   },
    // ],
  };
  smtpTransprot.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  smtpTransprot.close();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
module.exports = app;
