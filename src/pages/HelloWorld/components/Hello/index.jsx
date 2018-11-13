import React, { Component } from 'react'; 
import { Button } from 'tinper-bee'; 
import { actions } from "mirrorx";  
import './index.less'  

// 测试
function add(...x){
    return x.reduce((m,n)=>m+n);
} 

function sayHello(people1,people2,people3){
    return `Hello ${people1},${people2},${people3}`; 
} 

class Hello extends Component { 
    constructor(props) { 
        super(props); 
        this.state = {  }; 
    }  
    handleClick = async()=>{ 
        
        await actions.HelloWorld.loadData();     // await 等待耗时的操作。
        alert(this.props.hellomsg); 

        // var a = add(1,2,3,4,5);
        // alert(`合计：${a}`);

        // var people=['zf','John','Sherlock','aa','bb']; 
        // var b = sayHello(...people);
        // alert(b);
    }

    render() { 
        return ( 
            <div> 
                <Button className="mt20 ml20" colors="primary" onClick={ this.handleClick }>点击
测试3</Button> 
            </div> 
        ); 
    } 
}  
export default Hello; 