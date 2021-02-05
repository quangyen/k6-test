import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
    stages: [
        // Trong vòng 30 tăng số VU lên 20
        { duration: '30s', target: 20 },
        // Trong vòng 90s giảm số VU xuống 10
        { duration: '1m30s', target: 10 },
        // Trong 20s cuối giảm số VU về 0
        { duration: '20s', target: 0 },
    ],
};
export default function () {
    let res = http.get('https://httpbin.org/');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}