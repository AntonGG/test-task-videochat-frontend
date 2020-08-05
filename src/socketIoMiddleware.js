import createSocketIoMiddleware from "redux-socket.io";
import socket from "./services/socket";

const socketIoMiddleware = createSocketIoMiddleware(
  socket,
  (type, action) => action.io
);
export default socketIoMiddleware;
// function reducer(state = {}, action){
//   switch(action.type){
//     case 'message':
//       return Object.assign({}, {message:action.data});
//     default:
//       return state;
//   }
// }

// let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
// store.subscribe(()=>{
//   console.log('new client state', store.getState());
// });
// store.dispatch({type:'server/hello', data:'Hello!'});
