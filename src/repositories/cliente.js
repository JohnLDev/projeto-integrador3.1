const { asyncQuery } = require('../utils/asyncQuery');

const findAllCustomers = async () => {
  const query = `SELECT * FROM clientes;`;
  const customers = await asyncQuery(query);
  return customers.map((customer)=> ({ ...customer }))
}

const showCustomer = async (cpf) => {
  // pegando o cliente que possui o cpf informado
  const getCustomerQuery = `SELECT * FROM clientes WHERE cpf='${cpf}' LIMIT 1;`;
  const resultCustomer = await asyncQuery(getCustomerQuery);
  if(!resultCustomer[0]?.cpf) {
    return (`Cliente com CPF ${cpf} não encontrado`) 
  }
  const customer = { ...resultCustomer[0] }

  // pegando os pedidos do cliente
  const getCustomerPedidosQuery = `SELECT * FROM pedidos WHERE cpf_cliente='${cpf}';`;
  const pedidos = await asyncQuery(getCustomerPedidosQuery);
  for (const pedido of pedidos) {
    // detalhando os produtos do pedido
    pedido.produtos = [];
    const getProductPedidoQuery = `SELECT * FROM pedidos_produtos WHERE num_pedido=${pedido.num_pedido};`;
    const pedidos_produtos = await asyncQuery(getProductPedidoQuery);
    for (const pedido_produto of pedidos_produtos) {
      const getProductQuery = `SELECT * FROM estoque WHERE id=${pedido_produto.produto_id} LIMIT 1;`;
      const produto = await asyncQuery(getProductQuery);
      if(produto[0]){
        produto[0].quantidade = pedido_produto.quantidade
        pedido.produtos.push({ ...produto[0] });
      }
    }

  }
  customer.pedidos = pedidos.map(pedido => ({ ...pedido }));
  // OBS: spreads (...) foram feitos para remover propriedades do banco de dados que não serão utilizadas
  return customer
}

module.exports = {
  findAllCustomers,
  showCustomer
}