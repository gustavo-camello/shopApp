import bcrypt from 'bcryptjs';

const users = [
  {
    name: "adminUser",
    email: "admin@test.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: "gustavo",
    email: "gustavo@test.com",
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: "joyce",
    email: "joyce@test.com",
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users;
