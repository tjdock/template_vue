export const SET_SHOPS = 'shop/SET_SHOPS';
export const SET_IMGSITE = 'SET_IMGSITE';
export const SET_SHOP = 'shop/SET_SHOP';
export const SET_STOREID = 'shop/SET_STOREID';

export const SET_USER = 'user/SET_USER';
export const SET_TOKEN = 'user/SET_TOKEN';
export const LOGOUT = 'user/LOGOUT';

export const SET_BRANDS = 'cars/SET_BRANDS';
export const SET_KEY_BRANDS = 'cars/SET_KEY_BRANDS';
export const SET_CAR_VEHICLE = 'cars/SET_CAR_VEHICLE';
export const SET_KEY_VEHICLE = 'cars/SET_KEY_VEHICLE';
export const SET_CAR_DISPLACEMENT = 'cars/SET_CAR_DISPLACEMENT';
export const SET_KEY_DISPLACEMENT = 'cars/SET_KEY_DISPLACEMENT';
export const SET_CAR_YEAR = 'cars/SET_CAR_YEAR';
export const SET_KEY_YEAR = 'cars/SET_KEY_YEAR';
export const SET_CAR_STYLE = 'cars/SET_CAR_STYLE';
export const SET_KEY_STYLE = 'cars/SET_KEY_STYLE';

export const SET_MY_CARS = 'cars/SET_MY_CARS';

export const REGEX_MOBILE = /^(13|14|15|16|17|18)\d{9}$/;
export const REGEX_PASSWORD = /^(?![0-9]*$)[a-zA-Z0-9]{6,20}$/;


export function getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return arr[2];
    else
        return null;
}

export function delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);

    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
}