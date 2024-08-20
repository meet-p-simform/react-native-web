import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      return state.filter((item) => item?.id !== action.payload);
    }
  }
});

export const { addTodo, removeTodo } = todoSlice.actions;
export const TodoReducer = todoSlice.reducer;
