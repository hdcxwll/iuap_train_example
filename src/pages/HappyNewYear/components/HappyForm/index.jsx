import React, { Component } from 'react'
import { actions } from "mirrorx";
import { Col, Row, FormControl, Label, Select } from "tinper-bee";
import Form from 'bee-form';
import SearchPanel from 'components/SearchPanel';
const FormItem = Form.FormItem;
import './index.less'
class HappyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderNo: '',
            orderState: ''
        }
    }
    componentWillMount() {
        // 获得订单状态列表数据
        actions.HappyNewYear.getOrderTypes();
    }
    /** 查询数据
    * @param {*} error 校验是否成功
    * @param {*} values 表单数据
    */
    search = (error, values) => {
        this.props.form.validateFields(async (err, values) => {
            values.pageIndex = this.props.pageIndex || 0;
            values.pageSize = this.props.pageSize || 10;
            let {
            } = this.state;
            await actions.HappyNewYear.loadList(values);
            this.setState({
            });
        });
    }
    /**
    * 重置
    */
    reset = () => {
        this.setState({
            orderNo: '',
            orderState: ''
        });
    }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let { orderTypes } = this.props;
        let self = this;
        let {
        } = this.state;
        return (
            <SearchPanel
                className='HappyForm'
                form={this.props.form}
                reset={this.reset}
                search={this.search}>
                <Row>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>订单号:</Label>
<FormControl
                                {
                                ...getFieldProps('orderNo', {
                                    initialValue: '',
                                })
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>订单状态:</Label>
                            <Select
                                {
                                ...getFieldProps('orderState', {
                                    initialValue: '',
                                })
                                }
                            >
                                <Option value="">请选择</Option>
                                {
                                    orderTypes.map((item, index)=>
                                    {
                                        return (
                                            <Option key={index}
                                                value={item.code}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </SearchPanel>
        )
    }
}
export default Form.createForm()(HappyForm)