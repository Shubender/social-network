// REDUCER
export function friendsReducer(currFriends = [], action) {
    if (action.type === "set-all-friends") {
        return action.payload;
    }
    if (action.type === "accept-friend") {
        const newFriends = currFriends.map((f) => {
            // change accepted property for matching action.payload (holds the id)
            return f;
        });
        return newFriends;
    }
    if (action.type === "remove-friend") {
        // return new array with removed friend
    }
    return currFriends;
}

// ACTIONS:
export function setFriends(friends) {
    return {
        type: "set-all-friends",
        payload: friends,
    };
}

export function addFriend(id) {
    return {
        type: "accept-friend",
        payload: id,
    };
}

export function removeFriend() {}
