// genericRepository.js
const { paginate } = require("./utils/paginate");

const GenericRepository = (model) => ({
  getAll: (params) => paginate(model, params),

  getById: (id, options = {}) =>
    model.findUnique({ where: { id }, ...options }),

  create: (data, options = {}) => model.create({ data, ...options }),

  update: (id, data, options = {}) =>
    model.update({ where: { id }, data, ...options }),

  deleteById: (id) => model.delete({ where: { id } }),
});

module.exports = GenericRepository;
