let inputSearch = null;
let buttonSearch = null;
let panelUsers = null;
let panelStatistics = null,
  divSpinner = null,
  divInteration = null,
  users = [];

const formatter = Intl.NumberFormat('pt-BR');

window.addEventListener('load', async () => {

  mapElements();
  await fetchUsers();

  addEvents();
});

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );

  const json = await res.json();
  users = json.results.map(({ login, name, dob, gender, picture }) => {
    const fullName = `${name.first} ${name.last}`;
    return {
      id: login.uuid,
      name: fullName,
      nameLowerCase: fullName.toLowerCase(),
      age: dob.age,
      gender: gender,
      picture: picture.large,
    };
  }).sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  console.log(users);
  showInteraction();
}

function  showInteraction(){
   setInterval(() => {
    divSpinner.classList.add('hidden');
    divInteration.classList.remove('hidden');
   }, 2000);
}

function mapElements() {
  inputSearch = document.querySelector('#inputSearch');
  buttonSearch = document.querySelector('#buttonSearch');
  panelUsers = document.querySelector('#panelUsers');
  panelStatistics = document.querySelector('#panelStatistics');
  divSpinner = document.querySelector('#divSpinner');
  divInteration = document.querySelector('#divInteration');
}

function addEvents() {
  inputSearch.addEventListener('keyup', handleKeyup);
}

function handleKeyup(event) {
  const currentKey = event.key;

  if (currentKey !== 'Enter') {
    return;
  }

  const filterText = event.target.value;

  if (filterText.trim() !== '') {
    filterUsers(filterText);
  }
}

function filterUsers(filterText) {
  const filterTextLowercase = filterText.toLowerCase();

  const filteredUsers = users.filter((user) => {
    return user.nameLowerCase.includes(filterTextLowercase);
  });

  renderUsers(filteredUsers);
  renderStatistics(filteredUsers);
}

function renderUsers(users) {
  panelUsers.innerHTML = '';

  const h2 = document.createElement('h2');
  h2.textContent = `${users.length} usuário(s) encontrado(s)`;

  const ul = document.createElement('ul');

  users.forEach(user => {
    const li = document.createElement('li');
    li.classList.add('flex-row');
    li.classList.add('space-bottom');

    const img = `<img class="avatar" src="${user.picture}" alt="${user.name}" />`;
    const userData = `<spam>${user.name}, ${user.age} anos</spam>`;

    li.innerHTML = `${img}${userData}`;

    ul.appendChild(li);
  });

  panelUsers.appendChild(h2);
  panelUsers.appendChild(ul);
}

function renderStatistics(users) {
  const countMale = users.filter((user) => user.gender === 'male').length;
  const countFemale = users.filter((user) => user.gender === 'female').length;
  const sumAge = users.reduce((acc, user) => {
    return acc + user.age
  }, 0);
  const avageAge = sumAge / users.length;

  panelStatistics.innerHTML =
    `
  <h2>Estatísticas</h2>

  <ul> 
    <li>Sexo masculino: <strong>${countMale} </<strong></li>
    <li>Sexo feminino: <strong> ${countFemale}</<strong></li>
    <li>Soma das idades:<strong> ${formatNumber(sumAge)}</<strong> </li>
    <li>Média das idades: <strong> ${formatNumber(avageAge)}</<strong></li>
  </ul>
  `;
}

function formatNumber(number) {
  return formatter.format(number);
}

function formatAvarage(number) {
  return number.toFixed(2).replace('.', ',');
}