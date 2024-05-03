import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';

describe('UserController', () => {
  let controller: UserController;
  const createUserDtoTest: CreateUserDto = {
    login: 'One',
    password: 'Two',
  };

  beforeEach(async () => {
    controller = new UserController(new UserService());
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an emply array', async () => {
      const result = [];

      expect(await controller.getAllUsers()).toBe(result);
    });
  });

  describe('createUser and getSingleUser', () => {
    it("User's properties must be defined", async () => {
      await controller.createUser(createUserDtoTest);

      const currUser = await controller.getAllUsers()[0];

      expect(currUser).toMatchObject({
        login: 'One',
      });
      expect(currUser).toHaveProperty('id');
      expect(currUser).toHaveProperty('password');
      expect(currUser).toHaveProperty('login');
      expect(currUser).toHaveProperty('createdAt');
      expect(currUser).toHaveProperty('updatedAt');
      expect(currUser).toHaveProperty('version');
      expect(currUser.createdAt).toBeInstanceOf(Date);
      expect(currUser.updatedAt).toBeInstanceOf(Date);
      expect(typeof currUser.login).toBe('string');
      expect(typeof currUser.password).toBe('string');
    });
  });
  describe('updateUserPassword', () => {
    it('should update user pass', async () => {
      await controller.createUser(createUserDtoTest);
      const [user] = await controller.getAllUsers();
      const userDto: UpdateUserDto = {
        newPassword: 'November',
        oldPassword: createUserDtoTest.password,
      };
      await controller.updateUserPassword(user.id, userDto);
      const singleuser = await controller.getSingleUser(user.id);
      expect(singleuser.password).not.toEqual(user.password);
    });
  });
});
