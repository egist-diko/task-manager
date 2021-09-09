const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");

const permaUserId = new mongoose.Types.ObjectId();
const permaUser = {
  _id: permaUserId,
  name: "Egist",
  email: "egistdiko@gmail.com",
  password: "egiegi99",
  tokens: [
    {
      token: jwt.sign({ _id: permaUserId }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany({});
  await new User(permaUser).save();
});

test("should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Testing",
      email: "test@example.com",
      password: "MyPass2319",
    })
    .expect(200);
});

test("should login permauser", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "egistdiko@gmail.com",
      password: "egiegi99",
    })
    .expect(200);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${permaUser.tokens[0].token}`)
    .send()
    .expect(200);
});
