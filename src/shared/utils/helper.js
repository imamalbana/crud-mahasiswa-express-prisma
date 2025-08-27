// helper.js
const findOrFail = async (model, id, name = "Data") => {
  const record = await model.findUnique({ where: { id } });
  if (!record) throw new Error(`${name} dengan id ${id} tidak ditemukan`);
  return record;
};

module.exports = { findOrFail };
