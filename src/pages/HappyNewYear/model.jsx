//在model.js中调用请求并更新state状态
import { actions } from "mirrorx";
//引入 services，如不需要接口请求可不写
import * as api from "./service";
//接口返回数据公共处理方法，根据具体需要
import { processData } from "utils";
import moment from 'moment';

/**
* btnFlag 为按钮状态，新增、修改是可编辑，查看详情不可编辑，
* 新增表格为空
* 修改需要将行数据带上并显示在卡片页面
* 查看详情携带行数据但是表格不可编辑
* 0 表示新增、 1 表示编辑， 2 表示查看详情 3 提交
*  async loadList(param, getState) {
* rowData 为行数据
*/


export default {
    //确定Store中的数据模型作用域
    name: "HappyNewYear",
    //设置当前Model所需的初始化 state
    initialState: {
        yearmsg: '',
        rowData: {},
        showLoading: false,
        list: [],
        orderTypes: [],
        pageIndex: 1,
        pageSize: 10,
        totalPages: 1,
        total: 0,
        detail: {},
        searchParam: {},
    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新
         * @param {*} state
         * @param {*} data
        */
        updateState(state, data) {//更新state
            return {
                ...state, //操作符(...)执行不可变操作
                ...data
            };
        }
    },

    effects: {
        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
        */
        async loadData(param, getState) {
            //let res = processData(await api.getData(param),"成功啦");
            let res = processData(await api.getData(param));
            console.log("res".res);
            if (res) {
                actions.HappyNewYear.updateState({
                    //yearmsg: res.content[0].name
                    yearmsg: '111'
                });
            }
        },
        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async loadList(param, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.HappyNewYear.updateState({ showLoading: true })
            if (param) {
                param.pageIndex = param.pageIndex ? param.pageIndex - 1 : 0;
                param.pageSize = param.pageSize ? param.pageSize : 10;
            } else {
                param = {}
            }
            // 调用 getList 请求数据
            let res = processData(await api.getList(param));
            actions.HappyNewYear.updateState({ showLoading: false })
            if (res) {
                if (res.content && res.content.length) {
                    for (let i = 0; i < res.content.length; i++) {
                        let temp = Object.assign({}, res.content[i]);
                        res.content[i].key = i + 1;
                        res.content[i].code = temp.code + "";
                        res.content[i].currstatus = temp.currstatus + "";
                        res.content[i].name = temp.name + "";
                    }
                }
                // console.log('res content',res.content);
                actions.HappyNewYear.updateState({
                    list: res.content,
                    pageIndex: res.number + 1,
                    totalPages: res.totalPages,
                    total: res.totalElements
                });
            }
        },

        /**
        * getSelect：获取下拉列表数据
        * @param {*} param
        * @param {*} getState
        */
        getOrderTypes(param, getState) {
            actions.HappyNewYear.updateState({
                orderTypes: [{
                    "code": "0",
                    "name": "交货"
                }, {
                    "code": "1",
                    "name": "合同"
                }, {
                    "code": "2",
                    "name": "意向"
                }]
            })
        },
    }
};