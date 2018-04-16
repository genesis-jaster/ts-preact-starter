import { Component, h } from "preact";
import TodoItem from "./todo-item";

interface TodoListState {
  todos: { text: string }[];
  text: string;
}

export default class TodoList extends Component<{}, TodoListState> {
  // Shouldn't have to add the type here as it should be infered by
  // Component<{}, TodoListState>
  state: TodoListState = { todos: [], text: "" };

  setText = (e: Event) => {
    this.setState({
      text: (e.target as HTMLInputElement).value
    });
  };

  addTodo = (e: Event) => {
    e.preventDefault();
    const { todos, text } = this.state;

    this.setState({
      todos: [...todos, { text }],
      text: ""
    });
  };

  // Can pass in props, state and context, but for now the typings don't register in the parameters
  // so going with this.state.
  render() {
    const { todos, text } = this.state;
    return (
      <form onSubmit={this.addTodo}>
        <input value={text} onInput={this.setText} />
        <button type="submit">Add</button>
        <ul>{todos.map(todo => <TodoItem text={todo.text} />)}</ul>
      </form>
    );
  }
}
