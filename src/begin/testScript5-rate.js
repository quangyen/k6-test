import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';
//Rate
export let errorRate = new Rate('errors');
export default function () {
    const res = http.get('http://httpbin.org');
    const result = check(res, {
        'status is 200': (r) => r.status == 200,
    });
    errorRate.add(!result);
}