import User from '@modules/users/infra/typeorm/entities/User';
// import { isEqual } from 'date-fns';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import { getRepository, Repository } from 'typeorm';

// typeorm 'Repository' has already some built in methods like:
// contructor, "all", "list" and "create"

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findByDate(date: Date): Promise<User | undefined> {
        const findUser = await this.ormRepository.findOne({
            where: { date },
        });

        console.log('find by date is being executed');

        // '||' behaves like an 'else'
        return findUser;
    }

    public async findById(id: string): Promise<User | undefined> {
        // direct find with id (no where needed)
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { email } });

        return user;
    }

    public async create({
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({ name, email, password });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
