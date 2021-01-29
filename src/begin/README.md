# Docs links
https://k6.io/docs/

# Setup
https://k6.io/docs/getting-started/installation

# Demo 1 - Hello
https://k6.io/docs/getting-started/running-k6

### Chạy ứng dụng cơ bản:
```
k6 run testScript1-hello.js
```

Nâng số lượng virtual user và chạy trong 30s:
````
k6 run --vus 10 --duration 30s testScript1-hello.js
````

### Sử dụng cấu hình được set trong script test
https://k6.io/docs/using-k6/options
````
k6 run testScript2-option.js
````
### Các đọc dữ liệu:

![](docs/test_result.png)

execution: Có 2 mode là local (Chạy trên máy hoặc server) và cloud (Chạy trên dịch vụ cloud của K6).

output: Nơi xuất kết quả dữ liệu test, mặc định là `stdout`.

script: Tên file test.

duration: Thời gian chạy test.

iterations: - Tổng số lần lặp .

vus: Số lượng VU được khởi tạo khi bắt đầu chạy.

max: Số lượng VU tối đa trong giai đoạn chạy test.

### Thông tin metric và các loại dữ liệu:

#### Phân loại metric:
Counter	Được tính tổng từ các giá trị kết quả.

Gauge	Được lấy từ max, min, giá trị đầu tiên, cuối cùng của kết quả.

Rate	Là giá trị phần trăm.

Trend	Giá trị được sử dụng để tính toán ra các dữ liệu thống kê bên trên.

| Metric Name | Type | Description |
|---|---|---|
| **HTTP-specific built-in metrics**  |   |   |
| http_reqs | Counter | Số http request của một test case |
| http_req_blocked | Trend | Thời gian chờ để có được kết nối đến server (TCP connection slot) |
| http_req_connecting | Trend | Thời gian mở kết nối tới server |
| http_req_tls_handshaking | Trend | Thời gian khởi tạo kết nối bảo mật tới server |
| http_req_sending | Trend | Thời gian gửi khối dữ liệu đến server (liên quan đến đường truyền mạng) |
| http_req_waiting | Trend | Thời gian chờ server xử lý và trả lại kết quả |
| http_req_receiving | Trend | Thời gian cần để lấy được đủ khối dữ liệu trả về của 1 response kể từ lúc server bắt đầu trả kết quả |
| http_req_duration | Trend | = http_req_sending + http_req_waiting + http_req_receiving |
| **Built-in metrics** |  |  |
| vus | Gauge | số lượng active VU |
| vus_max | Gauge | Số lương active VU tối da trong đợt test |
| iterations | Counter | Số test script được chạy lặp lại (Chắc để lấy trung bình) |
| iteration_duration | Trend | Tổng thời gian thực thi bộ test với x lần lặp |
| dropped_iterations | Counter | Số bộ test thực thi không đảm bảo do lỗi hoặc quá thời gian thực thi |
| data_received | Counter | Khối lượng data đã nhận |
| data_sent | Counter | Khối lượng data đã được gửi |
| checks | Rate | Tỉ lệ bộ kiểm tra (checks) thành công |

**Accessing HTTP timings from a script**

| PROPERTY | DESCRIPTION |
|---|---|
| res.body | body của dữ liệu trả về |
| res.headers | Object chứa bộ key/value của header |
| res.status | http status |
| res.timings | object containing HTTP timing information for the request in ms |
| res.timings.blocked | = http_req_blocked |
| res.timings.connecting | = http_req_connecting |
| res.timings.tls_handshaking | = http_req_tls_handshaking |
| res.timings.sending | = http_req_sending |
| res.timings.waiting | = http_req_waiting |
| res.timings.receiving | = http_req_receiving |
| res.timings.duration | = http_req_duration |