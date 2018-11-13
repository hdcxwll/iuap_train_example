import React, { Component } from 'react';
import {Button} from 'tinper-bee';
import { actions } from "mirrorx";
import Header from 'components/Header';
import PaginationTable from 'components/PaginationTable';
import HappyForm from '../HappyForm';
import './index.less'


class NewYearIndex extends Component{
    constructor(props){
        // super(props);
        // this.state = { };
        super(props);
        this.state = {
        // 表格中所选中的数据，拿到后可以去进行增删改查
        selectData: [],
        // 分页组件下拉每页显示多少条
        step: 10,
        showModal:false,
        delData:[],
        };
    }

    handleClick = async() =>{
        await actions.HappyNewYear.loadData();
        alert(this.props.yearmsg);
    }

    cellClick =(record,btnFlag)=>{
        alert("新增");
    }
    componentDidMount(){
        // this.setState({ step: this.props.pageSize })
        actions.HappyNewYear.loadList();//table 数据
    }
    tabelSelect = (data) => {//tabel 选中数据
        this.setState({
        selectData: data
        })
    }
    onTableSelectedData = data => {
        this.setState({
        selectData: data
        })
    }
    onPageSizeSelect = (index, value) => {
        actions.HappyNewYear.loadList({
        pageSize: value
        })
    }
    onPageIndexSelect = value => {
        actions.HappyNewYear.loadList({
        pageIndex: value
        })
    }

    render(){
        const self=this;
        let { list, showLoading, pageIndex, pageSize, totalPages , total }
        = this.props;
        let {selectData,showModal} = this.state;
        let column = [
            {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: 200,
            render(record, text, index) {
                return index + 1;
                }
            },
            {
                title: "订单号",
                dataIndex: "orderNo",
                key: "orderNo",
                width: 200,
                },
                {
                title: "订单状态",
                dataIndex: "orderState",
                key: "orderState",
                width: 200,
            },
            {
                title: "操作",
                dataIndex: "d",
                key: "d",
                width: 100,
                // fixed: "right",
                render(text, record, index) {
                    return (
                        <div className='operation-btn'>
                        <i size='sm' className='uf uf-search
                        edit-btn' onClick={() => { self.cellClick(record, 2) }}></i>
                        <i size='sm' className='uf uf-pencil
                        edit-btn' onClick={() => { self.cellClick(record, 1) }}></i>
                        <i size='sm' className='uf uf-del del-btn'
                        onClick={() => { self.delItem(record, index) }}></i>
                        </div>
                    )
                }
            }
        ]
        list.map((item, index)=>{
            list[index].orderState=item.orderState==0?'交货':item.orderState==1?'合同':'意向' });
        return(
            <div>
                <Header title='订单 Demo'/>
                
                <HappyForm { ...this.props }/>

                <Button colors="primary" style={{"marginLeft":15}} size='sm' 
                shape="border" onClick={() => { self.cellClick({},0) }}>新增</Button>
                {/* <Button className="mt20 ml20" colors="primary" onClick={ this.handleClick }>点击测试</Button> */}
                
                <PaginationTable
                data={list}
                showLoading={showLoading}
                pageIndex={pageIndex}
                pageSize={pageSize}
                totalPages={totalPages}
                total={total}
                columns={column}
                checkMinSize={6}
                getSelectedDataFunc={this.tabelSelect}
                // 返回已选中的所有数据
                onTableSelectedData={this.onTableSelectedData}
                // 单页显示多少条，点击联动
                onPageSizeSelect={this.onPageSizeSelect}
                // 页索引编号点击选中回调方法
                onPageIndexSelect={this.onPageIndexSelect}
                />
            </div>
        );
    }
    
}

export default NewYearIndex;