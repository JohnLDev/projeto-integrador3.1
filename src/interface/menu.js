const inquirer = require("inquirer")
const { findAllCustomers, showCustomer } = require('../repositories/cliente')
const { findAllPedidos } =  require('../repositories/pedidos')

const menuItems = ["01 - Listar clientes", "02 - Detalhar histórico de cliente", "03 - Listar todos os pedidos", '04 - Sair']
module.exports =  async function menu() {
  let selectedAction = null
  inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "Menu",
      choices: menuItems,
    }
  ])
  .then(async ({ action }) => { 
    selectedAction = action.split(' ')[0]
    // console.log({ selectedAction })
    let result
    
    switch (selectedAction) {
      case '01':
      result = await findAllCustomers()
      break;
      
      case '02':
        const { cpf } = await inquirer
          .prompt([
            {
              type: "input",
              name: "cpf",
              message: "Informe o CPF do cliente:",
            }
          ])
        result = JSON.stringify(await showCustomer(cpf))
      
      break;
      
      case '03':
      result = await findAllPedidos()
      break;
      
      case '04':
      process.exit()
      break;
      
      default:
      break;
    }
    console.log(result)
    menu()
    
  });
}