//定义容器组件:将数据模型model和组件进行绑定

import React from 'react'; 
import mirror, { connect } from 'mirrorx';  
// 组件引入 
import Hello from './components/Hello';  
// 数据模型引入 
import model from './model' 
mirror.model(model);  
// 数据和组件 UI 关联、绑定 
export const ConnectedHello = connect( state => state.HelloWorld, null )(Hello); 