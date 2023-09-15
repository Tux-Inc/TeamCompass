import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

/**
 * The function `getUser` retrieves a user from the database based on their ID.
 * @param {number} id - The `id` parameter is a number that represents the unique identifier of a user.
 * @returns The `getUser` function is returning a `Promise` that resolves to a `User` object.
 */
  async getUser(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

/**
 * The function retrieves a user by their distant ID and creates a new user if one does not exist.
 * @param {number} distant_id - The `distant_id` parameter is a number that represents the unique
 * identifier of a user in a distant system or database.
 * @returns a Promise that resolves to a User object.
 */
  async getUserByDistantId(distant_id: number): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { distant_id },
    });
    if (!user) return this.createUser({ distant_id });
    return user;
  }

/**
 * The getUsers function returns a promise that resolves to an array of User objects.
 * @returns The getUsers() function is returning a Promise that resolves to an array of User objects.
 */
  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

/**
 * The function `createUser` asynchronously saves a user object to the users repository and returns a
 * promise that resolves to the saved user.
 * @param {User} user - The `user` parameter is an object of type `User` that represents the user data
 * to be created.
 * @returns The createUser function is returning a Promise that resolves to a User object.
 */
  async createUser(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

/**
 * The deleteUser function deletes a user from the users repository using the provided id.
 * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
 * user that needs to be deleted.
 */
  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
