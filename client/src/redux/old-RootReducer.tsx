import { combineReducers, createStore } from "redux";
import { friendsReducer } from "./old-FriendsSlice";

const rootReducer = combineReducers({
    friends: friendsReducer,
});

const store = createStore(rootReducer);

export default store;
