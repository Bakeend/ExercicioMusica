# 🎵 Sistema de Controle de Músicas (TypeScript CLI)

Um simples, porém robusto, **sistema de gerenciamento de músicas via terminal (CLI)**, construído com **Node.js**, **TypeScript** e **SQLite**.  
Este projeto permite cadastrar e consultar músicas, bandas e produtoras de forma interativa.

---

## ✨ Funcionalidades

- **Cadastro de Músicas:**  
  Adicione novas músicas, associando-as a uma banda e uma produtora.  
  Se a banda ou produtora não existirem, o sistema as cria automaticamente.

- **Consultas Dinâmicas:**  
  - Buscar por **ID** da música  
  - Buscar por **nome parcial**  
  - Buscar todas as músicas de uma **banda**  
  - Buscar todas as músicas de uma **produtora**  
  - Listar todas as músicas cadastradas  

- **Interface Interativa:**  
  Menu amigável no terminal, com navegação simples e limpa.

- **Experiência Aprimorada:**  
  Limpeza automática da tela a cada operação.

- **Armazenamento Persistente:**  
  Dados salvos em banco de dados **SQLite (musicas.db)**.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Função |
|-------------|--------|
| **Node.js** | Ambiente de execução do JavaScript/TypeScript |
| **TypeScript** | Superset do JavaScript com tipagem estática |
| **SQLite3** | Banco de dados relacional leve baseado em arquivo |
| **ts-node** | Executa arquivos `.ts` diretamente |
| **readline-sync** | Interatividade com o usuário via terminal |

---

## ⚙️ Pré-requisitos

Antes de começar, tenha instalado:
- **Node.js** (versão 18 ou superior)
- **npm** (geralmente vem junto com o Node.js)

---

## 🚀 Como Executar o Projeto

### 1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/sistema-de-musicas.git
```

### 2. Acesse o diretório:
```bash
cd sistema-de-musicas
```

### 3. Instale as dependências:
```bash
npm install
```

### 4. Execute o sistema:
```bash
npx ts-node src/principal.ts
```
ou, se quiser adicionar um script no `package.json`:
```bash
npm start
```

---

## 📂 Estrutura do Projeto

```
/sistema-de-musicas
│
├── /src
│   ├── banco_dados.ts     # Criação e conexão com o banco SQLite
│   ├── cadastro.ts        # Lógica de inserção (cadastrar músicas, bandas e produtoras)
│   ├── consulta.ts        # Funções de busca e listagem
│   ├── principal.ts       # Ponto de entrada da aplicação e menu principal
│   └── utils.ts           # Funções auxiliares (limpar tela, pausa)
│
├── package.json           # Dependências e scripts do projeto
├── tsconfig.json          # Configuração do TypeScript
├── .gitignore             # Arquivos ignorados pelo Git
└── README.md              # Documentação do projeto
```

---

## 📖 Como Usar

Ao rodar o comando `npm start`, o menu principal é exibido:

### **Menu Principal**
```
=== Sistema de Músicas ===
1) Cadastrar nova música
2) Consultas
0) Sair
```

### **Cadastrar nova música**
- Informe o nome da música, da banda e da produtora.  
- Se a banda ou produtora não existirem, o sistema as cria automaticamente.

### **Consultar músicas**
O submenu de consultas oferece várias opções:
```
1) Buscar por ID
2) Buscar por nome (parcial)
3) Listar músicas de uma banda
4) Listar músicas de uma produtora
5) Listar todas as músicas
0) Voltar
```
- Resultados são exibidos em tabela (`console.table`).
- Pressione **ENTER** para retornar ao menu principal.

---

## 🔮 Próximos Passos (Possíveis Melhorias)

- ✅ Implementar **Atualizar** e **Deletar** músicas (CRUD completo)  
- ✅ Adicionar **testes unitários** com Jest  
- ✅ Criar uma **API REST** para expor as funcionalidades  
- ✅ Desenvolver uma **interface web (frontend)** para consumo da API  
- ✅ Melhorar tratamento de erros e validações de entrada  

---

## 📄 Licença

Este projeto está sob a **licença MIT**.  
Você pode usá-lo, modificá-lo e distribuí-lo livremente, desde que mantenha os créditos ao autor original.
