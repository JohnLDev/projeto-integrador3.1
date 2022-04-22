const { asyncQuery } = require('../../../utils/asyncQuery');
const pedidoData = require('./data');

module.exports = async () => {
  const promises = pedidoData.map(({
   num_pedido,
   cpf_cliente,
   data_efeticvacao,
   valor_final,
  }) => {
   asyncQuery(`SELECT COUNT(num_pedido) FROM pedidos WHERE num_pedido=${num_pedido} LIMIT 1;`).then(result => {
      if(result[0]['COUNT(num_pedido)'] === 0) {
         asyncQuery(`INSERT INTO pedidos (cpf_cliente, num_pedido, valor_final, data_efeticvacao) VALUES ('${cpf_cliente}', ${num_pedido}, ${valor_final}, '${data_efeticvacao}');`)
      }
    });
  })

  await Promise.all(promises)
}