import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
const DB_FILE = './musicas.db';

interface ResultadoConsulta {
  id: number;
  nome_musica: string;
  nome_banda: string;
  nome_produtora: string;
}

function formatarResultados(resultados: ResultadoConsulta[]) {
  if (resultados.length === 0) {
    console.log("Nenhum resultado encontrado.");
    return;
  }

  resultados.forEach((item) => {
    console.log(`ID: ${item.id} | Música: ${item.nome_musica}, Banda: ${item.nome_banda}, Produtora: ${item.nome_produtora}`);
  });
}

const consultaBase = `
SELECT
m.id,
m.nome as nome_musica,
b.nome as nome_banda,
p.nome as nome_produtora
FROM musicas m
JOIN bandas b ON m.id_banda = b.id
JOIN produtoras p ON m.id_produtora = p.id
`;

export async function consultarTodos() {
  const db = await open({ filename: DB_FILE, driver: sqlite3.Database });
  try {
    const resultados = await db.all(consultaBase);
    console.log(`\n--- Todas as Músicas Cadastradas ---`);
    formatarResultados(resultados);
  } catch (error) {
    console.error("Erro ao consultar todas as músicas:", error);
  } finally {
    await db.close();
  }
}

export async function consultarPorId(id: number) {
  const db = await open({ filename: DB_FILE, driver: sqlite3.Database });
  try {
    const sql = `${consultaBase} WHERE m.id = ?`;
    const resultado = await db.get(sql, id);
    console.log(`\n--- Resultado para a busca por ID: ${id} ---`);
    if (resultado) {
      formatarResultados([resultado]);
    } else {
      console.log(`Nenhuma música encontrada com o ID ${id}.`);
    }
  } catch (error) {
    console.error("Erro na consulta por ID:", error);
  } finally {
    await db.close();
  }
}

export async function consultarPorMusica(nomeMusica: string) {
  const db = await open({ filename: DB_FILE, driver: sqlite3.Database });
  try {
    const sql = `${consultaBase} WHERE m.nome LIKE ?`;
    const resultados = await db.all(sql, `%${nomeMusica}%`);
    console.log(`\n--- Resultados para a música '${nomeMusica}' ---`);
    formatarResultados(resultados);
  } catch (error) {
    console.error("Erro na consulta por música:", error);
  } finally {
    await db.close();
  }
}

export async function consultarPorBanda(nomeBanda: string) {
  const db = await open({ filename: DB_FILE, driver: sqlite3.Database });
  try {
    const sql = `${consultaBase} WHERE b.nome LIKE ?`;
    const resultados = await db.all(sql, `%${nomeBanda}%`);
    console.log(`\n--- Resultados para a banda '${nomeBanda}' ---`);
    formatarResultados(resultados);
  } catch (error) {
    console.error("Erro na consulta por banda:", error);
  } finally {
    await db.close();
  }
}

export async function consultarPorProdutora(nomeProdutora: string) {
  const db = await open({ filename: DB_FILE, driver: sqlite3.Database });
  try {
    const sql = `${consultaBase} WHERE p.nome LIKE ?`;
    const resultados = await db.all(sql, `%${nomeProdutora}%`);
    console.log(`\n--- Resultados para a produtora '${nomeProdutora}' ---`);
    formatarResultados(resultados);
  } catch (error) {
    console.error("Erro na consulta por produtora:", error);
  } finally {
    await db.close();
  }
}
