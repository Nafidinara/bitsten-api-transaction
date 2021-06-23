const bcrypt = require('bcryptjs');

const bcryptService = () => {
  const password = (user) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);

    return {hash : hash, salt : salt};
  };

  const comparePassword = (pw, hash) => (
    bcrypt.compareSync(pw, hash)
  );

  const password2 = (pass) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(pass, salt);

    return {hash : hash, salt : salt};
  }

  return {
    password,
    comparePassword,
    password2
  };
};

module.exports = bcryptService;
