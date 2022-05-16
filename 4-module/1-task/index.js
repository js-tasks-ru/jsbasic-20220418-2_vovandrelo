function makeFriendsList(friends) {
  const list = document.createElement("ul");
  friends.forEach(friend => {
    const itemList = document.createElement("li");
    itemList.innerText = `${friend.firstName} ${friend.lastName}`;
    list.append(itemList);

    //<================== ИЛИ ==================>\\
    //list.innerHTML += `<li>${friend.firstName} ${friend.lastName}</li>`;
  });
  return list;
}
