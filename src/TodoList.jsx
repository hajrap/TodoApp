import React, {
  Component
} from 'react';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';
import TodoAPI from './todoAPI';
const API = 'http://localhost:9999/api/v1/';
let todoAPIObject = null;

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haserror: false,
      error: null,
      isLoaded: false,
      selectedItems:[],
      items: []
    };
    let text = this.props.text;
    this.insertNewItemHandler = this.insertNewItemHandler.bind(this);
    this.deleteItemHandler = this.deleteItemHandler.bind(this);
    this.editItemHandler=this.editItemHandler.bind(this);
    this.clearItemHandler=this.clearItemHandler.bind(this);
    this.selectItemHandler=this.selectItemHandler.bind(this);
  }
  setTodoError(resultState) {
    this.setState({
      haserror: resultState.haserror,
      error: resultState.error
    });
  }
  setItemonChange(resultItems) {
    if (todoAPIObject != null) {
      todoAPIObject.onChange(items => {
        if(items =='undefined')
        items=resultItems;
        this.setState({
          items
        });
      });
    }
  }
  async componentDidMount() {
    todoAPIObject = new TodoAPI();
    console.log('test5');
    await todoAPIObject.getItems();
    let resultState = todoAPIObject.state;
    this.setItemonChange(resultState.items);
    this.setState({
      isLoaded: resultState.isLoaded,
      items: resultState.items
    });
    this.setTodoError(resultState);
  }
  async insertNewItemHandler(e) {
    const {
      target
    } = e;
    if (e.key === 'Enter') {
      let text = target.value;
      e.target.value = "";
      let resultState = await todoAPIObject.createNewItem(text);
         this.setItemonChange(resultState);
      this.setTodoError(resultState);
    }
  }
  async deleteItemHandler(e) {
    let id = e.target.id;
    let result= await todoAPIObject.deleteItem(id);
    if (result) {
      this.setItemonChange();
      this.setTodoError(resultState);
    }
  }
  async editItemHandler(e) {
    let targetItem=e.target;
    console.log('targetItem.id',targetItem.id);
    let result= await todoAPIObject.updateItem(targetItem.id,targetItem.value);
    if (result) {
      this.setItemonChange();
    }
  }
  selectItemHandler(e) {
    let target=e.target;
    target.className="selectedItem";
        document.getElementById("divDelete").style.display='block';
   // if(e.target.checked)
    this.state.selectedItems.push(target.id);
  }
 async  clearItemHandler(e) {
  await this.state.selectedItems.forEach(id =>{
      console.log('delete items',id);
      let result=  todoAPIObject.deleteItem(id);
      console.log('delete result',id,result);
      if (result) {
        this.setItemonChange();
      }

    });
  }
  render() {
    return (<div id="todo">
      <TodoHeader itemstate={this.state} clear={this.clearItemHandler}></TodoHeader> 
      < TodoItem itemstate={this.state} select={this.selectItemHandler} delete={this.deleteItemHandler} edit={this.editItemHandler}>
      </TodoItem> 
      <textarea placeholder="Your next task...." value={this.props.text} onKeyPress={
        this.insertNewItemHandler}>
      </textarea> </div>)
  } 
}

export default TodoList;