//在service.js中定义如下请求
import request from "utils/request";

//定义接口地址
const URL={

    "GET_DATA": `${GROBAL_HTTP_CTX}/happy_newyear/list`,
    "GET_LIST":`${GROBAL_HTTP_CTX}/order_info/getListWithAttach`,
    //"GET_LIST":`https://mock.yonyoucloud.com/mock/67/order_info/getListWithAttach`,
}

export const getData = (params) => {
    return request(URL.GET_DATA, {
        method:"get",
        param:params
    });
}

export const getList = (params) => {
    console.log("get list",URL.GET_LIST);
    let url = URL.GET_LIST + '?1=1';
    for(let attr in params){
        if((attr!='pageIndex') &&(attr!='pageSize')){
            url+='&search_'+attr+'='+params[attr];
        }else{
            url+='&'+attr+'='+params[attr];
        }
    }
    return request(url,{
        method:"get",
        data:params
    })
}