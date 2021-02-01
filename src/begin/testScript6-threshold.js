import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';
export let TrendRTT = new Trend('CUSTOM_RTT');
export let RateContentOK = new Rate('CUSTOM_Content OK');
export let GaugeContentSize = new Gauge('CUSTOM_ContentSize');
export let CounterErrors = new Counter('CUSTOM_Errors');
export let options = {
//Threshols là ngưỡng sử đụng để đánh giá các kết quả test trả về là pass hay fail.
// Như ví dự ở dưới thì: với p(90)<300 thì sẽ có dấu tích xanh bên cạnh (std), nếu là báo cái dưới dạng CSV thì sẽ có trường chứa dữ liệu kết quả pass, fail của tiêu chí đã cấu hình. Tương tự với các tiêu chí còn lại
    thresholds: {
        CUSTOM_RTT: ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
        'CUSTOM_Content OK': ['rate>0.95'],
        CUSTOM_ContentSize: ['value<4000'],
        CUSTOM_Errors: ['count<100'],
    },
};
export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
    let contentOK = res.json('name') === 'Bert';
    TrendRTT.add(res.timings.duration);
    RateContentOK.add(contentOK);
    GaugeContentSize.add(res.body.length);
    CounterErrors.add(!contentOK);
    sleep(1);
}