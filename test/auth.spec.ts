import request from "supertest";
import { Profile } from "../src/models/Profile";
import {connection} from "mongoose"
let server;
let userId: string;
describe("test POST /api/auth", ()=>{
    beforeAll(async () => {
		server = require("../src/api");
	});

	afterAll(async () => {
		server.close();
		await Profile.remove();
		connection.close();
	});
	it("register a user without parameters",async () => {
		const resPonse = await request(server).post('/api/auth');
		expect(resPonse.status).toBe(400);
		const userFromDB = await Profile.find();
		expect(userFromDB[0]).toBeFalsy();
		
	});
	it("register a user",async () => {
		const resPonse = await request(server).post('/api/auth').send({email: "test@test.test", password: "1234"});
		expect(resPonse.status).toBe(200);
		expect(resPonse.body).toHaveProperty('profile');
		expect(resPonse.body.profile).toHaveProperty('_id');
		userId = resPonse.body.profile._id;
		const userFromDB = await Profile.findById(userId);
		expect(userFromDB).toBeTruthy();
	})
})