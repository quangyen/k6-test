import {SharedArray} from "k6/data";

const data = new SharedArray("some data name", function () {
    return JSON.parse(open('10_datatest.json'));
});

export default function () {
    let user = data[0];
    console.log(data[0].username);
}