// import Web3 from 'web3';
import { notification } from 'antd';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import ethers, { formatEther } from 'ethers';
import { createElement } from 'react';

declare global {
    interface Window {
        ethereum: any
        [name: string]: any
    }
}

const CryptoJS = require('crypto-js');

const log = console.log
const warn = console.warn
const error = console.error
const tab = "	";
const enter = "\n";

export function numberToHex(number: Number) {
    return "0x" + number.toString(16)
}

function encryptString(content = "", password = "Secret Passphrase") {
    return CryptoJS.AES.encrypt(content, password).toString();
}

function decryptString(ciphertext = "", password = "Secret Passphrase") {
    return CryptoJS.AES.decrypt(ciphertext, password).toString(CryptoJS.enc.Utf8);
}

function copyText(text: string, callback: () => {}) {
    try {
        const input = document.createElement('input');
        input.setAttribute('readonly', 'readonly');
        input.setAttribute('value', text);
        document.body.appendChild(input);
        input.setSelectionRange(0, 9999);
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            if (callback) {
                callback();
            }
        }
        document.body.removeChild(input);
    } catch (err: any) {
        notification.error({ message: err.message });
    }
}

/**
 * tính số % thay đổi của a so với b
 * @param {Number} a 
 * @param {Number} b 
 * @returns {Number}
 */
export function percentChange(a: number, b: number): number {
    return ((b - a) / a) * 100
};

function randomString(e: number) {
    e = e || 32;
    var t = "ABCDEFGHIZKLMNOPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function randomNum(Min: number, Max: number) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

/**
 * 
 * @param time timestamp in seconds
 * @returns 
 */
function getTimeString(time: number) {
    //var date = new Date(time);
    var date = new Date(time * 1000);
    var year = date.getFullYear() + '-';
    var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var dates = date.getDate() + ' ';
    var hour = date.getHours() + ':';
    var min = date.getMinutes() + ':';
    var second = date.getSeconds();
    return year + month + dates + hour + min + second;
}

function getDomainName(hostName: string) {
    return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
}

function getShortAddress(address = "0x", start = 2, end = 3) {
    return address.slice(0, start) + "..." + address.slice(address.length - end)
}

function cropLongString(string = "") {
    return string.substring(0, 4) + " ... " + string.substring(string.length - 3)
}

// function getOS() {
//     log(window.navigator)
//     var userAgent = window.navigator.userAgent,
//         platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
//         macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
//         windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
//         iosPlatforms = ['iPhone', 'iPad', 'iPod'],
//         os = null;

//     if (macosPlatforms.indexOf(platform) !== -1) {
//         os = 'Mac OS';
//     } else if (iosPlatforms.indexOf(platform) !== -1) {
//         os = 'iOS';
//     } else if (windowsPlatforms.indexOf(platform) !== -1) {
//         os = 'Windows';
//     } else if (/Android/.test(userAgent)) {
//         os = 'Android';
//     } else if (/Linux/.test(platform)) {
//         os = 'Linux';
//     }

//     return os;
// }

function hash(input: string) {
    return CryptoJS.SHA256('sha256').update(input).digest('hex');
}

function isUrl(url: string) {
    try {
        new URL(url)
        return true
    } catch (err: any) {
        return false;
    }
}

/**
 * tạo ngẫu nhiên 1 số trong khoảng min - max
 * @param {float} min 
 * @param {float} max 
 * @param {int} decimals số thập phân sau dấu chấm
 * @returns {float}
 */
function getRandomFloat(min: String | Number, max: Number | String, decimals = 0) {
    if (typeof min === "string") min = Number(min)
    if (typeof max === "string") max = Number(max)

    if (min > max) {
        let m = max
        max = min
        min = m
    }
    if (!decimals) {
        let min_d = 0, max_d = 0;

        try { min_d = min.toString().split(".")[1].length } catch (err: any) { }
        try { max_d = max.toString().split(".")[1].length } catch (err: any) { }

        decimals = min_d > max_d ? min_d : max_d;
    }
    const str = ""// (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}

/**
 * nhập vào 1 số hoặc chuỗi, 
 * trả về độ dài số thập phân
 * và số thập phân tối thiểu.
 * Ví dụ 89.46230000
 *  trả về {
 *      precision: 4,
 *      minMove: 0.0001
 *  }
 */
export function getPrecision(n: number | string): {
    precision: number,
    minMove: number
} {
    // let str = n.toString()
    // let parts = str.split(".")
    // if (parts[1]) {
    //     let minMove = Math.pow(10, -(Number("0." + parts[1]).toString()).length)
    //     log(n, minMove, parts[1], Number(parts[1]).toString(),)
    //     return {
    //         precision: parts[1].length,
    //         minMove: minMove
    //     }
    // }

    // let integerPart = parseInt(n);
    // let decimalPart = n - integerPart;
    // let minMove = "0.", precision = 0;

    // if (decimalPart) {
    //     precision = decimalPart.toString().length - 2
    //     if (precision > 6) {
    //         precision = 6;
    //         minMove += "000001"

    //     } else {
    //         for (let i = 1; i < precision; i++) {
    //             minMove += "0"
    //         }
    //         minMove += "1"
    //     }
    // }

    if (isNaN(n))
        return;

    let sn = n.toString().split('.')

    if (sn.length === 1) {
        return {
            precision: 0,
            minMove: 1
        }
    }

    let minMove = "0.", precision = Number("0." + sn[1]).toString().length - 2;
    if (precision <= 1)
        return {
            precision: 1,
            minMove: 0.1
        }

    for (let i = 1; i < precision; i++) {
        minMove += "0"
    }
    minMove += "1";

    return {
        precision,
        minMove: Number(minMove)
    }
}

/**
 * chuyển số BigNumber thành số đơn vị thập phân, rút gọn số thập phân 4, xóa các số 0 ở cuối
 * @param {string | number} number số đầu vào
 * @param {string | number} decimals số thập phân
 * @returns {number} 
 */
function BNToNumber(number: string | number, decimals = 18) {
    let _number = new BigNumber(number)
    let _decimals = (new BigNumber(10)).pow(decimals)
    return _number.div(_decimals)
}

/**
 * tạo số BigNumber: 10^18
 * @param {int} decimals số thập phân
 * @returns {BigNumber}
 */
function TenPower(decimals = 18) {
    return new BigNumber(10).pow(decimals)
}

/**
 * thêm dấu ngăn cách phần nghìn giữa các số
 * formatNumberWithCommas(52564560.111111) => '52,564,560'
 * formatNumberWithCommas(1.111111) => '1'
 */
function formatNumberWithCommas(n: number): string {
    const reversedNumber = parseInt(Math.abs(n).toString()).toString().split('').reverse().join('');
    let formattedNumber = '';
    for (let i = 0; i < reversedNumber.length; i++) {
        formattedNumber += reversedNumber[i];
        if ((i + 1) % 3 === 0 && i + 1 !== reversedNumber.length) {
            formattedNumber += ',';
        }
    }
    return (n < 0 ? "-" : "") + formattedNumber.split('').reverse().join('');
}

/**
 * '0.0000000001900000' => 0.0<sub>8</sub>19
 * '1514546320.0000000001900000' => 1,514,546,320.0<sub>8</sub>19
 * @param {BigNumber} bigNumber 
 * @returns {string}
 */
function BNFormat(_number: bigint | number, decimals = 3) {
    if (isNaN(Number(_number)))
        return "";

    let n = _number.toString();
    let integerPart = parseInt(n);
    let decimalPart = Number(n) - integerPart;

    let int = formatNumberWithCommas(integerPart);  // integerPart.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    if (decimals === 0) {
        return int
    }

    if (decimalPart) {
        let decimalPart_string = decimalPart.toString().slice(2)
        let d = parseInt(decimalPart_string).toString();
        let sub = decimalPart_string.length - d.length - 1;

        // let d_length = decimals
        // if (integerPart.length > 4)
        //     d_length = 2
        // if (integerPart.length == 4)
        //     d_length = 3
        // if (integerPart.length == 3)
        //     d_length = 4
        // if (integerPart.length == 2)
        //     d_length = 5
        let d_slice = Number(d.slice(0, decimals) + '.' + d.slice(decimals))
        d = parseFloat('0.' + Math.floor(d_slice)).toString().slice(2)

        if (sub > 0) {
            return createElement("label", null,
                int,
                ".0",
                createElement("sub", null, sub),
                d,
            )
            // return `${int}.0<sub>${sub}</sub>${d}`;

        } else if (sub == 0)
            return `${int}.0${d}`;
        else
            return `${int}.${d}`;
    } else
        return int;
}

function BNFormat_(_number: bigint | number, decimals = 6) {
    if (isNaN(Number(_number)))
        return "0";
    // let n = Math.round(Number(_number) * 10 ** decimals) / 100 ** decimals

    let bn = new BigNumber(_number.toString())
    return bn.toFormat()
}

/**
 * tìm trong khoảng thời gian, những mốc h8 bắt đầu
 * @param {int} start 
 * @param {int} end 
 * @return {int[]} list timestamp 0h 8h 16h
 */
export function getH8Times(start = Date.now() - 24 * 60 * 60 * 1000, end = Date.now()) {
    let start_date = new Date(start)
    let hour = start_date.getUTCHours();

    if (hour > 0 && hour <= 8)
        hour = 8;
    if (hour > 8 && hour <= 16)
        hour = 16;
    if (hour > 16 && hour <= 24)
        hour = 0;

    start_date.setUTCHours(hour);

    start_date.setUTCMinutes(0);
    start_date.setUTCSeconds(0);
    start_date.setUTCMilliseconds(0);

    let list = []
    let current = start_date.getTime();
    while (current <= end) {
        list.push(current);
        current += 8 * 60 * 60 * 1000;
    }
    list.push(current);
    return list;
}


export function toggleFullscreen(elem: HTMLElement) {
    if (!document.fullscreenElement) {
        return elem.requestFullscreen().catch((err) => {
            alert(
                `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
            );
        });
    } else {
        return document.exitFullscreen();
    }
}

export function downloadFile(content = "", fileName = "f" + dayjs(Date.now()).format("YYYY-MM-DD HH:mm") + ".txt", fileType = "csv") {
    let data = "data:text/" + fileType + ";charset=utf-8," + encodeURIComponent(content);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", data);
    downloadAnchorNode.setAttribute("download", fileName + "." + fileType);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}


export {
    getShortAddress,
    tab, enter,
    BNToNumber, TenPower,
    log, warn, error,
    encryptString, decryptString,
    copyText, randomNum,
    getTimeString, getDomainName,
    // getOS, 
    cropLongString,
    hash, isUrl,
    getRandomFloat,
    BNFormat,
}


