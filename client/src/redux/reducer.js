import { combineReducers } from "redux";
import friendsReducer from "./friends/slice";
// import chatMessagesReducer from "./messages/slice";
// import postsReducer from "./posts/slice";

const rootReducer = combineReducers({
    friends: friendsReducer,
    // chatMessagesReducer,
    // postsReducer,
});

export default rootReducer;
