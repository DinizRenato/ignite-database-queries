import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({ user_id, }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id: user_id
      },
      relations: ['games']
    })
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const query = `
      SELECT 
        * 
      FROM 
        USERS 
      ORDER BY 
        first_name;
      `;
    return this.repository.query(query);
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    const query = `
      SELECT 
        * 
      FROM 
        USERS 
      WHERE
        first_name ILIKE $1
      AND
        last_name ILIKE $2
      `
    return this.repository.query(query, [first_name, last_name]);
  }
}
