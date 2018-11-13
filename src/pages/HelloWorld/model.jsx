import { actions } from "mirrorx"; 
// 引入 services，如不需要接口请求可不写 
import * as api from "./service"; 
// 接口返回数据公共处理方法，根据具体需要 
import { processData } from "utils"; 
import moment from 'moment';  
export default { 
    // 确定 Store 中的数据模型作用域 
    name: "HelloWorld", 
    // 设置当前 Model 所需的初始化 state 
    initialState: { 
        hellomsg:'', 
    }, 
    reducers: { 
        /** 
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。 
         * @param {*} state 
         * @param {*} data 
         */ 
        updateState(state, data) { //更新 state 
            return { 
                ...state, 
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
             
            let res = processData(await api.getData(param),"成功啦"); 
            //let res = await api.getData(param); 
            console.log("res",res);
            if (res) {
                actions.HelloWorld.updateState({ 
                    // hellomsg: res.content[0].name
                    hellomsg : res
                });
            }

            // actions.HelloWorld.updateState({ 
            //     hellomsg: "测试"
            // });

        },
    }
};