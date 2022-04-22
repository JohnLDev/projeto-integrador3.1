const { connection } = require("../config/db");
const { asyncQuery } = require("../utils/asyncQuery");

const setUpDatabase = async () => {

  // criação do banco de dados
  await asyncQuery(`CREATE DATABASE IF NOT EXISTS trabalho;`)
  
  // selecionando o banco de dados
  await asyncQuery(`USE trabalho;`)
  
  // criação da tabela de clientes
  await asyncQuery(`
  CREATE TABLE IF NOT EXISTS clientes 
  (
    cpf VARCHAR(14) NOT NULL PRIMARY KEY, 
    nome VARCHAR(50) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    telefone VARCHAR(14) NOT NULL, 
    bairro VARCHAR(14) NOT NULL, 
    endereco VARCHAR(60) NOT NULL, 
    cidade VARCHAR(12) NOT NULL, 
    uf VARCHAR(2) NOT NULL, 
    cep VARCHAR(8) NOT NULL );`)
    
    
    // criação da tabela de estoque 
    await asyncQuery(`
    CREATE TABLE IF NOT EXISTS estoque 
    (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      nome VARCHAR(50) NOT NULL, 
      quantidade INT NOT NULL, 
      tipo VARCHAR(255) NOT NULL, 
      valor_unidade DECIMAL(6,2) NOT NULL );`)
      
      
      // criação da tabela de pedidos
      await asyncQuery(`
      CREATE TABLE IF NOT EXISTS pedidos 
      (
        num_pedido INT AUTO_INCREMENT PRIMARY KEY, 
        cpf_cliente VARCHAR(14) NOT NULL,
        data_efeticvacao VARCHAR(14) NOT NULL,
        valor_final DECIMAL(6,2) NOT NULL,
        CONSTRAINT fk_customer FOREIGN KEY (cpf_cliente) REFERENCES clientes(cpf) );`)
        
        // criação da tabela de relacionamento dos produtos com os pedidos
        await asyncQuery(`
        CREATE TABLE IF NOT EXISTS pedidos_produtos 
        (
          id INT AUTO_INCREMENT PRIMARY KEY, 
          num_pedido INT NOT NULL, 
          produto_id INT NOT NULL, 
          quantidade INT NOT NULL, 
          CONSTRAINT fk_estoque FOREIGN KEY (produto_id) REFERENCES estoque(id),
          CONSTRAINT fk_pedido FOREIGN KEY (num_pedido) REFERENCES pedidos(num_pedido) );`)
        }

module.exports = { setUpDatabase }