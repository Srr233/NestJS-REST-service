import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { CreateUserDto } from 'src/user/dto/CreateUserDto';
import { User_I } from 'src/user/interfaces/User';
import { UpdateUserDto } from 'src/user/dto/UpdateUserDto';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let dto: CreateUserDto;
  let updateUserDto: UpdateUserDto;
  const userVersion = '1';
  beforeEach(async () => {
    dto = { login: 'login', password: 'password' };
    updateUserDto = { oldPassword: dto.password, newPassword: 'drowssap' };
    process.env.version = userVersion;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (GET)', async () => {
    await request(app.getHttpServer()).get('/user').expect(200);
  });

  it('/user (POST and GET, GET by ID, PUT, DELETE)', async () => {
    let testId: string;
    await request(app.getHttpServer()).post('/user').send(dto).expect(201);
    await request(app.getHttpServer())
      .get('/user')
      .then((response) => {
        const body: User_I = response.body[0];
        testId = body.id;
        expect(body.id).toMatch(
          /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gm,
        );
        expect(body.login).toBe(dto.login);
        expect(body.password).toBeDefined();
        expect(new Date(body.createdAt).getTime()).not.toBeNaN();
        expect(new Date(body.updatedAt).getTime()).not.toBeNaN();
        expect(body.version).toBeDefined();
      });

    let userTest;
    //GET by id
    await request(app.getHttpServer())
      .get(`/user/${testId}`)
      .then((response) => {
        const user: User_I = response.body;
        userTest = user;
        expect(user).toBeDefined();
        expect(user.id === testId).toBeTruthy();
      });
    //PUT
    await request(app.getHttpServer())
      .put(`/user/${userTest.id}`)
      .send(updateUserDto)
      .expect(200);

    //GET by Id and check changed password
    await request(app.getHttpServer())
      .get(`/user/${testId}`)
      .then((response) => {
        const user: User_I = response.body;
        expect(user.password !== userTest.password).toBeTruthy();
      });

    await request(app.getHttpServer()).delete(`/user/${testId}`).expect(200);
  });
});
