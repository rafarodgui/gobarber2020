import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../Services/UpdateUserAvatarService';

import CreateUserService from '../Services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import User from '../models/User';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({ name, email, password });

  delete user.password;

  return response.json({ user });
});

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);

  const users = await userRepository.find();

  return response.json(users);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
