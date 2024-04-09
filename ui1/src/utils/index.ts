import { useEffect, useRef, useState } from "react";
import { FilterState, OptionState } from "@typings/datatable";

import Telegram from "./Telegram";


export const getUrl = (key: string): string => {
  let pathInfo = key.split("_");
  pathInfo = pathInfo.filter((item) => {
    return item !== "item";
  });
  return pathInfo.join("/");
}
export const formatSize = (fileSize: number) => {
  if (fileSize === 0) {
    return "Unknown";
  } else {
    const i = Math.floor(Math.log(fileSize) / Math.log(1024));
    const size = ((fileSize / Math.pow(1024, i)) * 1).toFixed(2);
    return `${size} ${["B", "kB", "MB", "GB", "TB"][i]}`;
  }
}
export const convertFilter = (array: OptionState): FilterState => {
  return array.map((item) => {
    return {
      text: item.label,
      value: item.value
    }
  });
}
export const numberFormat = (num?: string | number, prefix?: string): string => {
  try {
    if (num) {
      num = (num + "").replace(/[^0-9+\-Ee.]/g, "");
      let n = !isFinite(+num) ? 0 : +num;
      let prec = 6;
      let sep = ",";
      let dec = ".";
      let s: any = "";
      let toFixedFix = (ns: any, precs: any) => {
        if (("" + ns).indexOf("e") === -1) {
          let vls: any = ns + "e+" + precs;
          return +(Math.round(vls) + "e-" + prec);
        } else {
          let arr = ("" + n).split("e");
          let sig = "";
          if (+arr[1] + precs > 0) {
            sig = "+";
          }
          let vlss: any = +arr[0] + "e" + sig + (+arr[1] + precs);
          let vlsss = (+(Math.round(vlss)) + "e-" + precs);
          return Number(vlsss).toFixed(precs);
        }
      }
      s = (prec ? toFixedFix(n, prec).toString() : "" + Math.round(n)).split(".");
      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      let result = s.join(dec);
      if (prefix) result = prefix + result;
      return result;
    } else {
      return "0";
    }
  } catch (ex) {
    return "0";
  }
}
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const removeHtml = (str: string) => {
  return str.replace(/<(?:.|\n)*?>/gm, "");
}
export const cutString = (str: string, length: number) => {
  str = str.replace(/\"/gm, "'").trim();
  str = removeHtml(str);
  if (str.length < length) return str;
  else {
    str = str.substring(0, length) + " ...";
    return str;
  }
}
export const getTimezoneOffset = (timeZone: string) => {
  const now = new Date();
  const tzString = now.toLocaleString("en-US", { timeZone });
  const localString = now.toLocaleString("en-US");
  const diff = (Date.parse(localString) - Date.parse(tzString)) / 3600000;
  let offset = diff + now.getTimezoneOffset() / 60;
  offset = -offset;

  const hours = Math.floor(offset);
  const minutes = Math.round((offset - hours) * 60);
  return `${offset < 0 ? "-" : "+"}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`.replace(/\-\-/gm, "-");
}
export const getUrlFlag = (country: string) => {
  return `/flags/${country}.svg`;
}
/**
 * Hàm viết hoa chữ cái đầu tiên
 * @param str Chữ cần viết hoa chữ cái đầu
 * @returns string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const calcSize = (percent: number): {
  width: number,
  height: number
} => {
  const width = (window.innerWidth / 100 * percent) > 1920 ? 1600 : (window.innerWidth / 100 * percent);
  const height = width * 1080 / 1920;
  return {
    width,
    height
  }
}
export const groupBy = (array: any[], key: string): {
  [key: string]: any[]
} => {
  return array.reduce((result: any, currentValue: any) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};
export const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debounceValue;
}
export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
export const convertHexToRGB = (hex: string, opacity: number) => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity / 100})`;
}
export const arrToObj = (arr: any[]) => {
  return arr.reduce((acc, cur, i) => {
    acc[i] = cur;
    return acc;
  }, {});
}
export const arrToAxios = (arr: {
  name: string,
  value: string
}[]) => {
  try {
    const data: {
      [key: string]: string
    } = {};
    arr.forEach((item) => {
      data[item.name] = item.value;
    });
    return data;
  } catch (ex) {
    return undefined;
  }
}

export { Telegram, }