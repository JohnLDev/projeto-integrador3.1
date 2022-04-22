const cliente = require("./cliente/cliente")
const estoque = require("./estoque/estoque")
const pedidos = require("./pedidos/pedidos")
const pedidos_produtos = require("./pedidos_produtos/pedidos_produtos")

module.exports = async () => {
  await cliente()
  await estoque()
  await pedidos()
  await pedidos_produtos()
}