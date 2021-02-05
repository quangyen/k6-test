
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';


const csvData = new SharedArray("another data name", function() {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('11_datatest.csv'), { header: true }).data;
});
export default function () {
    // In ra log tất cả data trong csvData
    for (var userPwdPair of csvData) {
        console.log(JSON.stringify(userPwdPair));
    }
    // Lấy ngẫu nhiên dữ liệu để test
    let randomUser = csvData[Math.floor(Math.random() * csvData.length)];
    console.log('Random user: ', JSON.stringify(randomUser));

    const params = {
        login: randomUser.username,
        password: randomUser.password,
    };

    console.log('Random user: ', JSON.stringify(params));
    let res = http.post('https://test.k6.io/login.php', params);
    check(res, {
        'login succeeded': (r) =>
            r.status === 200 && r.body.indexOf('successfully authorized') !== -1,
    });
    sleep(1);
}