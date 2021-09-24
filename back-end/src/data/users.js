const START = 1;
const END = 20;

const usersArray = [];

for (let i = START; i <= END; i++) {
  const user = {
    email: `User${i}@test.com`,
    password: `User${i}`
  }
  usersArray.push(user);
}

module.exports = {
  usersArray,
};
