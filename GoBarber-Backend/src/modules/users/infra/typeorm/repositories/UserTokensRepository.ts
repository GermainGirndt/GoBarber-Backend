import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import { getRepository, Repository } from 'typeorm';

class UserTokensRepository implements IUserTokensRepository {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async generate(user_id: string): Promise<UserToken> {
        console.log('user_id:');
        console.log(user_id);
        const userToken = this.ormRepository.create({
            user_id,
        });
        console.log('user token');
        console.log(userToken);

        await this.ormRepository.save(userToken);

        console.log('saved');

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        console.log('Executing find by token');
        const userToken = await this.ormRepository.findOne({
            where: { token },
        });

        console.log(`Returning ${userToken}`);

        return userToken;
    }
}

export default UserTokensRepository;
