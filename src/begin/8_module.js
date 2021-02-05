
// Khai báo import module
import {someHelper} from './helpers.js';
// Ngoài việc sử dụng module tự viết trong project, thì mình cũng có thể khai báo module là một đường dẫn http tới 1 file js online.
//import { randomItem } from 'https://jslib.k6.io/k6-utils/1.0.0/index.js';

export default function () {
    // Sử dụng hàm trong module vừa import
    someHelper();
}