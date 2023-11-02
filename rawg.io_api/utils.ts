import { rawg } from './rawg';

function encodeQueryData(data: {[key: string]:any} | undefined) {
    if (!data) {
        return "";
    }
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
 }

export function urlBuilder(rawg: rawg, endpoint: string, params?: any) {
    const url = rawg.baseUrl + endpoint + "?" + encodeQueryData(params)+ "&key=" + rawg.key;
    console.log(url)
    return url;
}
