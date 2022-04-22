const { asyncQuery } = require('../../../utils/asyncQuery');
const pedido_produtosData = require('./data');

module.exports = async () => {
  const promises = pedido_produtosData.map(({
   id,
   num_pedido,
   produto_id,
   quantidade,
  }) => {
   asyncQuery(`SELECT COUNT(id) FROM pedidos_produtos WHERE id=${id} LIMIT 1;`).then(result => {
      if(result[0]['COUNT(id)'] === 0) {
         asyncQuery(`INSERT INTO pedidos_produtos (num_pedido, id, produto_id, quantidade) VALUES (${num_pedido}, ${id}, ${produto_id}, ${quantidade});`)
      }
    });
  })

  await Promise.all(promises)
}