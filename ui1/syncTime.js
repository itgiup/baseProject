const axios = require("axios");
const child_process = require("child_process");

const url = "https://api.binance.com/api/v3/time";

// Lấy giờ từ sàn Binance
axios.get(url).then((response) => {

    console.log(response.data.serverTime)


    // Chuyển đổi dữ liệu thành thời gian Unix
    const unix_time = new Date(response.data.serverTime).getTime();
    console.log(unix_time)


    // Đồng bộ thời gian với máy tính Windows
    child_process.exec("w32tm /resync /computer:localhost /d:\"" + unix_time + "\"", (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("Thời gian đã được đồng bộ!");
    });
});
