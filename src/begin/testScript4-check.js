import { check } from 'k6';
import http from 'k6/http';
export default function () {
    let res = http.get('http://test.k6.io/');
    // Checks là các bộ điều kiện kiểm tra trong test case
    // Cấu trúc gồm có 1: Title của check : (Hàm lamda, hay còn gọi là hàm rút gon, hàm này xử lý điều kiện trả về true hoặc false)
    check(res, {
        'is status 200': (r) => r.status === 200,
        'body size is 1176 bytes': (r) => r.body.length == 1176,
    });
}