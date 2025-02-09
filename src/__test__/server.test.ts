import db from "../config/db";
import { connectDB } from "../server";



jest.mock('../config/db')

describe('connectDB', () => {
    test('should handle database connection error', async () => {
        jest.spyOn(db,'authenticate').mockRejectedValueOnce(new Error('Ocurrio un error al conectarse a la DB'))
        const consoleSpy = jest.spyOn(console,'log')
        await connectDB() 
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('ERROR AL CONECTARSE A LA DB'))
    })
})