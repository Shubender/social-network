export default function friendsReducer(friends = [], action) {
    if (action.type == "friendships/get") {
        console.log("friends from slice: ", action.payload);
        return (friends = action.payload);
    }

    if (action.type == "friend/delete") {
        return friends.filter((friend) => {
            return friend.friendshipid != action.payload.friendshipId;
        });
    }

    if (action.type == "friend/accept") {
        return friends.map((friend) => {
            if (friend.friendshipid == action.payload.friendshipId) {
                return { ...friend, accepted: true };
            }
            return friend;
        });
    }

    return friends;
}

export function getFriendships(data) {
    return { type: "friendships/get", payload: data };
}

export function deleteFriend(friendshipId) {
    console.log("friendshipId: ", friendshipId);

    return { type: "friend/delete", payload: { friendshipId } };
}

export function acceptFriend(friendshipId) {
    return { type: "friend/accept", payload: { friendshipId } };
}
