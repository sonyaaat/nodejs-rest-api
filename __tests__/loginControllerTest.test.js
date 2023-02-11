const User = require("../models/users");
const app = require("../app");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;
const request = require("supertest");
describe("test auth routes", () => {
  const loginUser = {
    email: "bogdan@gmail.com",
    password: "1234568990088",
  };
  let server;
  beforeAll(() => {
    server = app.listen(3000);
  });
  afterAll(() => server.close());

  beforeEach(async () => {
    await mongoose.connect(DB_HOST);
  });

  test("login test", async () => {
    await request(app).post("/api/auth/register").send(loginUser);

    const response = await request(app).post("/api/auth/login").send(loginUser);
    console.log(response.body.token);

    expect(response.statusCode).toBe(201);

    const findedUser = await User.findOne({ email: loginUser.email });
    console.log(findedUser);
    const token = findedUser.token;
    expect(response.body.token).toBe(token);
  });

  // test("register test", async () => {
  //   const newUser = {
  //     email: "bogdan@gmail.com",
  //     password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
  //     subscription:"starter",
  //     avatarURL:"avatar.com"
  //   };
  //   const response = await request(app)
  //     .post("/api/auth/register")
  //     .send(newUser);
  //   expect(response.statusCode).toBe(201);
  // });
});
