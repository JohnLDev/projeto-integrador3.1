const { asyncQuery } = require('../../../utils/asyncQuery');
const estoqueData = require('./data');

module.exports = async () => {
  const promises = estoqueData.map(({
   id,
   nome,
   quantidade,
   tipo,
   valor_unidade
  }) => {
   asyncQuery(`SELECT COUNT(id) FROM estoque WHERE id=${id} LIMIT 1;`).then(result => {
      if(result[0]['COUNT(id)'] === 0) {
         asyncQuery(`INSERT INTO estoque (nome, id, quantidade, tipo, valor_unidade) VALUES ('${nome}', ${id}, ${quantidade}, '${tipo}', ${valor_unidade});`)
      }
    });
  })

  await Promise.all(promises)
}