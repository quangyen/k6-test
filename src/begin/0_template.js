// k6 run 0_template.js -e ENDPOINT_URL=https://httpbin.test.k6.io/post

import http from 'k6/http';
import { Counter,Rate,Trend } from "k6/metrics";

export let options = {
    vus: 1,
    //iterations:1,
    //httpDebug: 'full',
    duration: '5s',
    thresholds: {
        '1. Tỉ lệ thành công': ['rate>0.95'],
        '4. Thông số thời gian': ['p(95)<200', 'p(90)<200', 'avg<200', 'max<500']
    }
};

export let SuccessRate = new Rate('1. Tỉ lệ thành công');
export let TPS = new Counter('2. Chỉ số TPS');
export let RPS = new Counter('3. Số request/s');
export let Time = new Trend('4. Thông số thời gian',true)



export function setup() {
    console.log("Khởi tạo dữ liệu");
}

export default function () {
    let person = {
        name: 'test',
        age: '99'
    };

    let res = makeRequest(person);

    autoMetric(res);
}

export function teardown() {
    console.log("Xóa dữ liệu");
}

function makeRequest(data){
    let headers = {'Content-Type': 'application/json'};
    let res = http.post(`${__ENV.ENDPOINT_URL}`, JSON.stringify(data), {headers: headers});
    return res;

}

function autoMetric(res){
    RPS.add(1);
    if(res.status === 200){
        SuccessRate.add(true);
        TPS.add(1);
    }
    else {
        SuccessRate.add(false);
    }
    Time.add(res.timings.duration);
}