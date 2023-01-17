import { client } from "../../api/client";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";

import { statusFilters } from "../filters/filtersSlice";

const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState({
  status: "idle"
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await client.get("/fakeApi/todos");
  return response.todos;
});

export const saveNewTodo = createAsyncThunk(
  "todos/saveNewTodo",
  async (text) => {
    const userInput = { text };
    const response = await client.post("/fakeApi/todos", { todo: userInput });
    return response.todo;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded(state, action) {
      const todo = action.payload;
      state.entities[todo.id] = todo;
    },
    todoToggled(state, action) {
      const todo = state.entities[action.payload];
      todo.completed = !todo.completed;
    },
    colorSelected: {
      reducer(state, action) {
        const { todoId, color } = action.payload;
        state.entities[todoId].color = color;
      },
      prepare(todoId, color) {
        return {
          payload: { todoId, color }
        };
      }
    },
    todoDeleted: todosAdapter.removeOne,
    allCompleted(state) {
      for (let i in state.entities) {
        state.entities[i].completed = true;
      }
    },
    completedCleared(state) {
      const completedIds = Object.values(state.entities)
        .filter((todo) => todo.completed)
        .map((todo) => todo.id);
      todosAdapter.removeMany(state, completedIds);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload);
        state.status = "idle";
      })
      .addCase(saveNewTodo.fulfilled, todosAdapter.addOne);
  }
});

export const {
  todoAdded,
  todoToggled,
  colorSelected,
  todoDeleted,
  allCompleted,
  completedCleared
} = todosSlice.actions;

export default todosSlice.reducer;

export const {
  selectAll: selectTodos,
  selectById: selectTodoById
} = todosAdapter.getSelectors((state) => state.todos);

export const selectTodoIds = createSelector(selectTodos, (todos) =>
  todos.map((todo) => todo.id)
);

export const selectFilteredTodos = createSelector(
  selectTodos,
  (state) => state.filters.status,
  (state) => state.filters.colors,

  (todos, status, colors) => {
    const showAll = status === statusFilters.All;
    if (showAll && colors.length === 0) {
      return todos;
    }

    const completedStatus = status === statusFilters.Completed;

    return todos.filter((todo) => {
      const statusMatches = showAll || todo.completed === completedStatus;
      const colorMatches = colors.length === 0 || colors.includes(todo.color);
      return statusMatches && colorMatches;
    });
  }
);

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
);
