// Library Code
function createStore (reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter( l => l !== listener)
    }
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  }
}


//App Code

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function todo(state = [], action) {
  switch (action.type) {
      case ADD_TODO :
          return state.concat([action.todo]);
      case REMOVE_TODO :
          return state.filter( todo => (todo.id !== action.id));
      case TOGGLE_TODO :
          return map.state(todo => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete}));
      default :
          return state;
  }
}

function goal(state = [], action){
    switch (action.type){
        case ADD_GOAL :
            return state.concat([action.goal]);
        case REMOVE_GOAL :
            return state.filter( goal => (goal.id !== action.id));
        default :
            return state;
    }
}

function app( state = {}, action) {
    return {
        todos: todo(state.todos, action),
        goals: goal(state.goals, action)
    }
}

/*
Passing the root reducer to our store since our createStore function can only take one reducer.
*/
const store = createStore(app);

let showState = () => {
    console.log("******Listen for changes : ", store.getState());
};
let showChange = () => {
    console.log("-----The store changed");
};
store.subscribe(showState);

const unsubscribe = store.subscribe(showChange);
unsubscribe();

store.dispatch({
    type: ADD_TODO,
    todo: {
        id : 0,
        name: "Learn Redux",
        complete: false
    }});

