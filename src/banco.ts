import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const DB_FILE = './musicas.db';

export async function inicializarBanco() {
  const db = await open({
    filename: DB_FILE,
    driver: sqlite3.Database
  });

  try {
    await db.exec(`
CREATE TABLE IF NOT EXISTS bandas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS produtoras (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS musicas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  id_banda INTEGER,
  id_produtora INTEGER,
  FOREIGN KEY (id_banda) REFERENCES bandas(id),
  FOREIGN KEY (id_produtora) REFERENCES produtoras(id)
);
`);
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
  } finally {
    await db.close();
  }
}
