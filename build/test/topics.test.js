"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)("http://localhost:4000");
describe("Topics Test Suite", () => {
    try {
        beforeEach(function () {
            //
        });
        afterEach(function () {
            //
        });
        test("GET topics", async () => {
            await request.get(`/api/topics`)
                .expect(200);
        });
        test("GET topics by id", async () => {
            await request.get(`/api/topics/1`)
                .expect(404);
        });
        test("GET topics by id 6238e8210000646efa367326", async () => {
            await request.get(`/api/topics/6238e8210000646efa367326`)
                .expect(200);
        });
        test("POST topics no inputs", async () => {
            await request.post(`/api/topics`)
                .expect(400);
        });
        test("POST topics", async () => {
            await request.post(`/api/topics`)
                .send({
                name: `io`,
                description: `idescriptiono`
            })
                .expect(200);
        });
        test("DELETE topics", async () => {
            await request.delete(`/api/topics/1`)
                .expect(200);
        });
        test("PUT topics", async () => {
            await request.put(`/api/topics/1`)
                .expect(200);
        });
    }
    catch (err) {
        //console.log("Exception : ", err);
    }
});
//# sourceMappingURL=topics.test.js.map