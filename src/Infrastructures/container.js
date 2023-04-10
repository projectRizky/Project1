const { createContainer } = require('instances-container');

const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const pool = require('./database/postgres/pool');

// Repository
const UserRepository = require('../Domains/users/UserRepository');

// const user = require('./sequelize/models/user');
const UserRepositoryPostgres = require('./repositories/postgres/UserRepositoryPostgres');
const TestUseCase = require('../Applications/use_case/TestUseCase');
// const User = require('./sequelize/models');
const LoginUseCase = require('../Applications/use_case/authentication/LoginUseCase');
const AuthenticationTokenManager = require('../Applications/security/AuthenticationTokenManager');
const PasswordHash = require('../Applications/security/PasswordHash');
const JwtTokenManager = require('./security/JwtTokenManager');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');
const Role = require('./sequelize/models/Role');
const RegisterUseCase = require('../Applications/use_case/authentication/RegisterUseCase');
const RoleRepository = require('../Domains/roles/RoleRepository');
const RoleRepositoryPostgres = require('./repositories/postgres/RoleRepostoryPostgres');

// create container
const container = createContainer();

// register service and repository
container.register([
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: RoleRepository.name,
    Class: RoleRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
]);

// register use case
container.register([
  {
    key: TestUseCase.name,
    Class: TestUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: LoginUseCase.name,
    Class: LoginUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: RegisterUseCase.name,
    Class: RegisterUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
        {
          name: 'roleRepository',
          internal: RoleRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
