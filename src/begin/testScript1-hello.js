
// Phần khai báo các thư viện mặc định
import http from 'k6/http';
import { sleep } from 'k6';

// Cú pháp khái báo hàm mặc định
export default function () {
    http.get('http://test.k6.io');
    sleep(1);
}