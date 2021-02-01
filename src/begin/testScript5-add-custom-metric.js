import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';

// Như ở trong Readme đã mô tả, K6 có 4 loại thông số đo (metric) là Trend, Rate, Counter, Gauge. Do đó ta có thể tạo Custom Metric dựa trên 4 loại gốc này với các đặc tính của nó
// Các Object metric này sẽ được khởi tạo và dùng để lưu data của các lần chạy test, từ đó đẻ ra các thống kê tương ứng

// Trend: chứa dữ liệu dùng để do đạc ra p, max, min, average, phần trắm
// Rate: chưa dữ liệu để đo tỉ lê
// Counter dữ liệu chưa trong danh sách sẽ được tính đếm số lần
// Gauge: dữ liệu trong sẽ cho ra các thông số mmax, min

export let TrendRTT = new Trend('CUSTOM_RTT');
export let RateContentOK = new Rate('CUSTOM_Content OK');
export let GaugeContentSize = new Gauge('CUSTOM_ContentSize');
export let CounterErrors = new Counter('CUSTOM_Errors');

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
    let contentOK = res.json('name') === 'Bert';
    TrendRTT.add(res.timings.duration);
    RateContentOK.add(contentOK);
    GaugeContentSize.add(res.body.length);
    CounterErrors.add(!contentOK);
    sleep(1);
}