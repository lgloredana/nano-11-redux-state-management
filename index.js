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

function todos(state = [], action) {
  if ( action.type === 'ADD_TODO' ){
    return state.concat([action.todo]);
  } else if ( action.type === 'REMOVE_TODO' ){
    return state.filter( todo => (todo.id !== action.id))
  } else if (action.type === 'TOGGLE_TODO' ){
    return map.state(todo => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete}))
  }else{
      return state;
  }
}

const store = createStore(todos);
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
    type: "ADD_TODO",
    todo: {
        id : 0,
        name: "Learn Redux",
        complete: false
    }});

