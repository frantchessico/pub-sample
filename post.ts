const axios = require('axios');

// Função para gerar um e-mail aleatório único
const generateUniqueEmail = (existingEmails) => {
  let email;
  do {
    const randomString = Math.random().toString(36).substring(2, 15);
    email = `${randomString}@example.com`;
  } while (existingEmails.has(email));
  existingEmails.add(email);
  return email;
};

// Função para gerar um nome aleatório único
const generateUniqueName = (existingNames) => {
  const firstNames = [
    'Alice', 'Bob', 'Charlie', 'Daisy', 'Eve', 'Frank', 'Grace', 'Hannah', 'Ivy', 'Jack',
    'Kathy', 'Liam', 'Mona', 'Nina', 'Oscar', 'Paul', 'Quinn', 'Rita', 'Sam', 'Tina',
    'Ursula', 'Victor', 'Wendy', 'Xander', 'Yara', 'Zane'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson'
  ];

  let name;
  do {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    name = `${firstName} ${lastName}`;
  } while (existingNames.has(name));
  existingNames.add(name);
  return name;
};

// Função para criar um usuário com e-mail e nome aleatório
const createUser = async (name, email) => {
  try {
    const response = await axios.post('http://localhost:2920/api/users/new', {
      name,
      email
    });
    console.log(`Usuário criado com e-mail ${email} e nome ${name}:`, response.data);
  } catch (error) {
    console.error(`Erro ao criar usuário com e-mail ${email} e nome ${name}:`, error.response ? error.response.data : error.message);
  }
};

// Função principal para criar vários usuários com e-mails e nomes únicos em tempo real
const main = async () => {
  const numberOfUsers = 2000; // Número de usuários a serem criados
  const existingEmails = new Set();
  const existingNames = new Set();

  for (let i = 0; i < numberOfUsers; i++) {
    const name = generateUniqueName(existingNames);
    const email = generateUniqueEmail(existingEmails);
    await createUser(name, email);
  }
};

main();
