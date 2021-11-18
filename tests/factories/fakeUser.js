import faker from 'faker';

export default function fakeUser() {
  const fakeUserData = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return fakeUserData;
}
