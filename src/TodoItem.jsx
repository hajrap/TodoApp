import React,{Component} from 'react';
//import "./index.css";
const API= 'http://localhost:9999/api/v1/';
class TodoItem extends Component{
    constructor(props)
    {
        super(props)  
    }

    render(){
        const {error,isLoaded,items} = this.props.itemstate;
        if(error){
            return(
                <div>{error.message}</div>
            )
        }
        else if(!isLoaded){
            return(
                <div>Loading...</div>  
            )
        }else{
        return(
            <div className="todoItem">
            {
                items.map(item =>
                    <li key={item.id} >
                    <input type="checkbox" id={item.id}  name="todo-item" onClick={this.props.select}></input>
                    <textarea placeholder="Add Task.." id={item.id} value={item.text} onChange={this.props.edit}></textarea>
                    <a href="javascript:;" id={item.id} onClick={this.props.delete} >x</a>
                 </li>
                    )
            }
            </div>
        )
        }
    }
}
export default TodoItem;
