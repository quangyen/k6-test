// File này là một module
// Trong module có các function
// Các module này sẽ được sử dụng dưới dạng thư viện, và cần import trước khi dùng


// Để script khác dùng được các hàm trong module (thư viện) thì ngoài việc import module vào thì còn cần:
// -- đặt export trong đoạn khai báo hàm
export function someHelper() {
    console.log("run someHelper!");
}