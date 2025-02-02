import server from "../server";
import request from "supertest";

describe('GET /api', () => {
    test('should a send back json response', async () => { 
        const res = await request(server).get('/api')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})