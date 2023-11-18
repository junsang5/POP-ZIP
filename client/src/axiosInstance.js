import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const instance = axios.create();  // axios 인스턴스 생성
const mock = new MockAdapter(instance);  // 생성한 인스턴스에 대해 mock 설정

// /login 경로에 대한 post 요청을 가로채고, {data: true}를 응답으로 반환하도록 설정
mock.onGet('http://localhost:8080/api/users/by-userid/yjw').reply(200, {
    "id": null,
    "userId": "yjw",
    "email": "loveyjw78@gmail.com",
    "userName": "yoonjinwon",
    "role": "ROLE_USER"
});
mock.onPost('http://localhost:8080/api/auth/authenticate').reply(200, 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvbnNvZ29uZyIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MDAzMjk2MzB9.xdP9E5P9hBDsikiJWadVKQqFnALiuEi-LTeEPqyM6N9eXkc8JxAqiBSp0Ibnfm5qM77_bK2RnRLa5aijqhYK8Q');
mock.onPost('http://localhost:8080/api/signup').reply(200, {
    "id": 1,
    "userId": "yjw",
    "userName": "yoonjinwon",
    "status": null,
    "email": "loveyjw78@gmail.com",
    "token": null,
    "crateDate": "2023-11-18T19:30:06.034+00:00",
    "updateDate": "2023-11-18T19:30:06.035+00:00",
    "role": "ROLE_USER",
    "upassword": "$2a$10$Nsl54jleloAL5hwm8l4OT.rbxGk8JaaVN9Oh/CucLfamtRLR4fDLa"
})

export default axiosInstance = instance;
