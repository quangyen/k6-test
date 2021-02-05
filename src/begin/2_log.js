// k6 run --log-output=stdout script.js
// https://18073:eyJrIjoiYWVmZWM4NjczZmY2Yjg2MWZmYmQzNGU2ZGNiYjA2ZjQzN2E1ZThjNSIsIm4iOiJsb2ciLCJpZCI6NDYwNjU3fQ==@logs-prod-us-central1.grafana.net/api/prom/push,label.something=else,label.foo=bar,limit=32,level=info,pushPeriod=5m32s,msgMaxSize=1231
// k6 run --logformat json
export let  options = {
    iterations: 20
}

export default function () {
    console.log("Hello")
}