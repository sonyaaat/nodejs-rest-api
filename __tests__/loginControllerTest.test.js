const User = require("../models/users");
const jwt = require("jsonwebtoken");
const app = require("../app");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const login = require("../controllers/auth/login");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;
const request = require("supertest");
const { SECRET_KEY } = process.env;
describe("test auth routes", () => {
  let server;
  beforeAll(() => {
    server = app.listen(3000);
  });
  afterAll(() => server.close());

  beforeEach(async () => {
    await mongoose.connect(DB_HOST);
  });

  afterEach(async () => {
    await User.findOneAndRemove({ email: "bogdan@gmail.com" });
  });
  test("login test", async () => {
    const newUser = {
      email: "bogdan@gmail.com",
      password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
    };

    const user = await User.create(newUser);
    const loginUser = {
      email: "bogdan@gmail.com",
      password: "123456",
    };
    const response = await request(app).post("/api/auth/login").send(loginUser);
    console.log(response.body);
    expect(response.statusCode).toBe(201);
    // const {body} = response;
    // expect(response.body.token).toByTruthy();
    const { token } = await User.findById(user._id);
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
