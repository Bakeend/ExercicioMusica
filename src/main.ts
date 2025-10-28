import readline from 'readline';
import { inicializarBanco } from './banco';
import { cadastrarMusica } from './cadastro';
import {
  consultarPorBanda,
  consultarPorMusica,
  consultarPorProdutora,
  consultarTodos,
  consultarPorId
} from './consulta';
import { limparTela } from './utils';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntar(query: string): Promise<any> {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

async function pressionarEnterParaContinuar() {
  await perguntar("\nPressione ENTER para continuar...");
}

function exibirMenuPrincipal() {
  console.log(`
=========================
Sistema de Controle de Músicas
=========================
1. Cadastrar nova música
2. Consultar músicas
3. Sair
=========================
`);
}

async function handleCadastroManual() {
  limparTela();
  console.log("--- Cadastro de Nova Música ---");
  const nomeMusica = await perguntar("Digite o nome da música: ");
  const nomeBanda = await perguntar("Digite o nome da banda: ");
  const nomeProdutora = await perguntar("Digite o nome da produtora: ");
  if (nomeMusica && nomeBanda && nomeProdutora) {
    await cadastrarMusica(nomeMusica, nomeBanda, nomeProdutora);
  } else {
    console.log("Cadastro cancelado. Todos os campos são obrigatórios.");
  }
}

async function handleConsulta() {
  limparTela();
  console.log(`
--- Menu de Consulta ---
1. Consultar por nome da música
2. Consultar por nome da banda
3. Consultar por nome da produtora
4. Consultar TODAS as músicas
5. Consultar por ID da música
6. Voltar ao menu principal
------------------------
`);
  const opcao = await perguntar("Escolha uma opção de consulta: ");
  limparTela();
  switch (opcao) {
    case '1':
      const nomeMusica = await perguntar("Digite o nome da música para buscar: ");
      await consultarPorMusica(nomeMusica);
      break;
    case '2':
      const nomeBanda = await perguntar("Digite o nome da banda para buscar: ");
      await consultarPorBanda(nomeBanda);
      break;
    case '3':
      const nomeProdutora = await perguntar("Digite o nome da produtora para buscar: ");
      await consultarPorProdutora(nomeProdutora);
      break;
    case '4':
      await consultarTodos();
      break;
    case '5':
      const idStr = await perguntar("Digite o ID da música para buscar: ");
      const id = parseInt(idStr, 10);
      if (!isNaN(id)) {
        await consultarPorId(id);
      } else {
        console.log("ID inválido. Por favor, digite um número.");
      }
      break;
    case '6':
      console.log("Voltando ao menu principal...");
      return;
    default:
      console.log("Opção inválida!");
      break;
  }
  await pressionarEnterParaContinuar();
}

async function main() {
  await inicializarBanco();
  let continuar = true;
  while (continuar) {
    limparTela();
    exibirMenuPrincipal();
    const opcao = await perguntar("Escolha uma opção: ");
    switch (opcao) {
      case '1':
        await handleCadastroManual();
        await pressionarEnterParaContinuar();
        break;
      case '2':
        await handleConsulta();
        break;
      case '3':
        continuar = false;
        limparTela();
        console.log("Saindo do sistema. Até logo!");
        break;
      default:
        console.log("\nOpção inválida! Por favor, escolha uma das opções do menu.");
        await pressionarEnterParaContinuar();
        break;
    }
  }
  rl.close();
}

main();
