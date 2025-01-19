export const getSender = (loggedUser, users) => {
  return users[1]._id === loggedUser._id
    ? users[0].name
    : users[1].name;
}