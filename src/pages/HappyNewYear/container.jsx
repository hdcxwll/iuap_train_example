//用于加载model.js 连接组件
import React from 'react';
import mirror, { connect } from 'mirrorx';
//组件引入
import NewYearIndex from './components/NewYear';
import HappyForm from './components/HappyForm';
//数据模型引入
import model from './model'
mirror.model(model);

//数据和组件UI关联、绑定
export const ConnectedNewYear = connect(state => state.HappyNewYear,null)(NewYearIndex);
export const ConnectedHappyForm = connect(state => state.HappyNewYear,null)(HappyForm);