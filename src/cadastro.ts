import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const DB_FILE = './musicas.db';

export async function cadastrarMusica(nomeMusica: string, nomeBanda: string, nomeProdutora: string) {
  const db = await open({ filename: DB_FILE, driver: sqlite3.Database });

  try {
    await db.run('INSERT OR IGNORE INTO bandas (nome) VALUES (?)', nomeBanda);
    await db.run('INSERT OR IGNORE INTO produtoras (nome) VALUES (?)', nomeProdutora);

    const banda = await db.get('SELECT id FROM bandas WHERE nome = ?', nomeBanda);
    const produtora = await db.get('SELECT id FROM produtoras WHERE nome = ?', nomeProdutora);

    if (!banda || !produtora) {
      throw new Error("Não foi possível encontrar o ID da banda ou produtora.");
    }

    await db.run(
      'INSERT INTO musicas (nome, id_banda, id_produtora) VALUES (?, ?, ?)',
      nomeMusica,
      banda.id,
      produtora.id
    );
    console.log(`Música '${nomeMusica}' cadastrada com sucesso!`);
  } catch (error) {
    console.error("Erro ao cadastrar música:", error);
  } finally {
    await db.close();
  }
}
