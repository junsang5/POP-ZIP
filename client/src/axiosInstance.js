import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const instance = axios.create();  // axios 인스턴스 생성
const mock = new MockAdapter(instance);  // 생성한 인스턴스에 대해 mock 설정

// /login 경로에 대한 post 요청을 가로채고, {data: true}를 응답으로 반환하도록 설정
mock.onPost('http://localhost:8080/login').reply(200, true);

export default axiosInstance = instance;
