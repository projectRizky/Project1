const User = require('../../Infrastructures/sequelize/models/User');

class TestUseCase {
  constructor({
    userRepository,
    test,
  }) {
    this._userRepository = userRepository;
    this._test = test;
  }

  async execute(useCasePayload) {
    const add = await this._userRepository.addUser({});

    return add;
  }
}

module.exports = TestUseCase;
