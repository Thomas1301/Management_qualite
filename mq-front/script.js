function changeResNumber() {
    let nbrRes = document.getElementsByClassName('userItem').length;
    let stringRes = document.getElementById('res');
    if (nbrRes > 0) {
        stringRes.innerHTML = nbrRes.toString() + " résultats";
    }
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://192.168.20.47:8080/api/v1/users')
  .then(response => response.json())
  .then(data => {
    const userList = document.querySelector('.userList');

    data.forEach(user => {
        const userItem = document.createElement('li');
        userItem.classList.add('userItem');

        const userContainer = document.createElement('div');
        userContainer.classList.add('user');

        const picture = document.createElement('div');
        picture.classList.add('picture');

        const userInfos = document.createElement('div');
        userInfos.classList.add('userInfos');

        const name = document.createElement('span');
        name.textContent = user.lastName;

        const firstName = document.createElement('span');
        firstName.textContent = user.firstName;

        const birthDate = document.createElement('span');
        birthDate.textContent = user.birthDate;

        const address = document.createElement('span');
        address.textContent = `${user.address}, ${user.zipCode}, ${user.city}`;

        userInfos.appendChild(name);
        userInfos.appendChild(firstName);
        userInfos.appendChild(birthDate);
        userInfos.appendChild(address);

        userContainer.appendChild(picture);
        userContainer.appendChild(userInfos);

        userItem.appendChild(userContainer);
        userList.appendChild(userItem);
    });
      changeResNumber()
    })
  .catch(error => {
    console.log('Une erreur s\'est produite lors de la récupération des données :', error);
  });
});

const searchInput = document.getElementById('searchInput');

function filterUserList() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toUpperCase();
  const userList = document.getElementsByClassName('userItem');

  Array.from(userList).forEach(userItem => {
    const name = userItem.querySelector('.userInfos span:nth-child(1)').textContent.toUpperCase();
    const firstName = userItem.querySelector('.userInfos span:nth-child(2)').textContent.toUpperCase();

    if (name.includes(filter) || firstName.includes(filter)) {
        userItem.style.display = '';
    } else {
        userItem.style.display = 'none';
      }
  });
    
}
