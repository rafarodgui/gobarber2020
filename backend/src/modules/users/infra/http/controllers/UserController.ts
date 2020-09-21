import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return response.json({ user });
  }

  // public async index(request: Request, response: Response): Promise<Response> {
  //   const userRepository = getRepository(User);

  //   const users = await userRepository.find();

  //   return response.json(users);
  // }
}
