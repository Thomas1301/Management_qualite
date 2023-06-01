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
    document.getElementById('userDetail').style.display = 'none';
   // Parcours de tous les éléments avec la classe 'userItem'
  Array.from(userList.children).forEach(userItem => {
    userItem.addEventListener('click', () => {
      // Récupération des informations de l'utilisateur correspondant à l'userItem cliqué
      const name = userItem.querySelector('.userInfos span:nth-child(1)').textContent;
      const firstName = userItem.querySelector('.userInfos span:nth-child(2)').textContent;
      const birthDate = userItem.querySelector('.userInfos span:nth-child(3)').textContent;
      const address = userItem.querySelector('.userInfos span:nth-child(4)').textContent;

      // Récupération de la ville et du code postal
      const addressParts = address.split(', ');
      const zipCode = addressParts[1];
      const city = addressParts[2];

      // Remplissage des informations dans la section 'userDetail'
      document.getElementById('detailName').textContent = name;
      document.getElementById('detailFirstName').textContent = firstName;
      document.getElementById('detailBirthDate').textContent = birthDate;
      document.getElementById('detailAdress').textContent = address;
      document.getElementById('detailZipCode').textContent = zipCode;
      document.getElementById('detailCity').textContent = city;

      // Affichage de la section 'userDetail'
      document.querySelector('.userDetail').style.display = 'block';
    });
  });
    changeResNumber();
    })
  .catch(error => {
    console.log('Une erreur s\'est produite lors de la récupération des données :', error);
  });
});

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', filterUserList);

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
  changeResNumber();
}

function changeResNumber() {
  let userItems = document.getElementsByClassName('userItem');
  let nbRes = 0;
  
  // Parcours de tous les éléments avec la classe 'userItem'
  for (let i = 0; i < userItems.length; i++) {
    // Vérification si l'élément n'est pas en display 'none'
    if (window.getComputedStyle(userItems[i]).display !== 'none') {
      nbRes++;
    }
  }
  
  let stringRes = document.getElementById('res');
  if (nbRes > 0) {
    stringRes.innerHTML = nbRes.toString() + " résultats";
  }
}
