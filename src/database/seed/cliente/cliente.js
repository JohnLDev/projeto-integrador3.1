const { asyncQuery } = require('../../../utils/asyncQuery');
const clienteData = require('./data');

module.exports = async () => {
  const promises = clienteData.map(({
    bairro,
    cep,
    cidade,
    cpf,
    email,
    endereco,
    nome,
    telefone,
    uf,
  }) => {
   asyncQuery(`SELECT COUNT(cpf) FROM clientes WHERE cpf='${cpf}' LIMIT 1;`).then(result => {
      if(result[0]['COUNT(cpf)'] === 0) {
         asyncQuery(`INSERT INTO clientes (nome, cpf, email, telefone, endereco, cidade, uf, cep, bairro) VALUES ('${nome}', '${cpf}', '${email}', '${telefone}', '${endereco}', '${cidade}', '${uf}', '${cep}', '${bairro}');`)
      }
    });
  })

  await Promise.all(promises)
}