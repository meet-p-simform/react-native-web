export interface TodoStateType {
  todoList: Array<{ title: string; description: string }>;
}

const INITIAL_STATE: TodoStateType = {
  todoList: []
};

export default INITIAL_STATE;
