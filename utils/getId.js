export const getRoomId = (user1, user2) => {
    const sortedIds = [user1, user2].sort();
    const roomId = sortedIds.join('-');
    return roomId;
}