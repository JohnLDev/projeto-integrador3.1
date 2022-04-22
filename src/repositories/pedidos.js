const { asyncQuery } = require('../utils/asyncQuery');

const findAllPedidos = async () => {
  const query = `SELECT * FROM pedidos;`;
  const pedidos = await asyncQuery(query)
  return pedidos.map((pedido)=> ({ ...pedido }))
}

module.exports = {
  findAllPedidos
}