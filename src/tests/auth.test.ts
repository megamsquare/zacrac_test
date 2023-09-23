import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../../server";

const mongoServer = new MongoMemoryServer();

describe("User", () => {
  beforeAll(async () => {
    await mongoServer.start();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await mongoServer.stop();
    // await redisServer.stop();
  });

  const createUser = {
    first_name: "test",
    last_name: "user",
    username: "testUser",
    email: "testuser@example.com",
    phone_number: "+2347038089237",
  };

  const updateUser = {
    first_name: "test",
    last_name: "user1",
    username: "testUser",
    email: "testuser@example.com",
    phone_number: "+2347038089237",
  };

  let getByiD: string;

  describe("Create User Profile Test", () => {
    it("should create a new user profile", async () => {
      const createUserResponse = await request(app)
        .post("/api/v1/user")
        .send(createUser);
      getByiD = createUserResponse.body.data._id;
      expect(createUserResponse.status).toBe(201);
    });
  });

  describe("Get All User Profile Test", () => {
    it("should get all users profile", async () => {
      const getUserResponse = await request(app).get("/api/v1/user");
      expect(getUserResponse.status).toBe(200);
    });
  });

  describe("Get User Profile By Id Test", () => {
    it("should get user profile by user id", async () => {
      const getUserByIdResponse = await request(app).get(
        `/api/v1/user/${getByiD}`
      );
      expect(getUserByIdResponse.status).toBe(200);
    });
  });

  describe("Get User Profile By Email Test", () => {
    it("should get user profile by user email", async () => {
      const getUserByEmailResponse = await request(app).get(
        `/api/v1/user/${createUser.email}`
      );
      expect(getUserByEmailResponse.status).toBe(200);
    });
  });

  describe("Update User Profile By Id Test", () => {
    it("should update user profile by user id", async () => {
      const createUserResponse = await request(app)
        .put(`/api/v1/user/${getByiD}`)
        .send(updateUser);
      expect(createUserResponse.status).toBe(200);
    });
  });

  describe("Delete User Profile By Id Test", () => {
    it("should delete user profile by user id", async () => {
      const createUserResponse = await request(app)
        .delete(`/api/v1/user/${getByiD}`)
        .send(updateUser);
      expect(createUserResponse.status).toBe(200);
    });
  });
});
