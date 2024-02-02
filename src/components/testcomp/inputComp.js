import { Component, createRef } from "react";

export default class InputComp extends Component
{
    constructor(props){
        super(props);
        this.inputRef=createRef();

    }

    focusHandler=()=>{
        this.inputRef.current.focus()
    }

    render(){
        return(
            <div>
                <input ref={this.inputRef} 
                />
            </div>
        )
    }
}