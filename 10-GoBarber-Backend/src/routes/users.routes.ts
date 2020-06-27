import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRoutere = Router();

/**
 * Repositories
 * Services
 *
 */

// route gets '/appointments' from index.ts
usersRoutere.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        //deletes internally
        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRoutere;
