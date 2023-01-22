export default function friendsReducer(friendships = null, action) {
    if (action.type == "friendships/get") {
        console.log("friends from slice: ", action.payload);
        return (friendships = action.payload);
    }

    if (action.type == "friend/delete") {
        return friendships.filter((friend) => {
            // TODO fix to .friend
            return friend.friendshipid != action.payload.friendshipId;
        });
    }

    if (action.type == "friend/accept") {
        return friendships.map((friend) => {
            if (friend.friendshipid == action.payload.friendshipId) {
                return { ...friend, accepted: true };
            }
            return friend;
        });
    }

    return friendships;
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
