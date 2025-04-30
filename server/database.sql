-- Tabela principal de coletores em uso
CREATE TABLE IF NOT EXISTS coletores (
  id SERIAL PRIMARY KEY,
  re VARCHAR(20),
  numero_coletor VARCHAR(20),
  encarregado VARCHAR(50),
  turno VARCHAR(5),
  setor VARCHAR(50),
  hora_pegou TIMESTAMP,
  hora_baixa TIMESTAMP,
  estado TEXT
);

-- Tabela base com os 50 coletores cadastrados fixos
CREATE TABLE IF NOT EXISTS base_coletores (
  id SERIAL PRIMARY KEY,
  numero_coletor VARCHAR(50) NOT NULL,
  marca VARCHAR(50) NOT NULL,
  sn VARCHAR(100) UNIQUE NOT NULL
);


CREATE TABLE IF NOT EXISTS colaboradores (
  id SERIAL PRIMARY KEY,
  matricula VARCHAR(20) NOT NULL,
  nome_completo VARCHAR(255) NOT NULL,
  turno VARCHAR(10) NOT NULL,
  setor VARCHAR(100) NOT NULL,
  encarregado VARCHAR(100) NOT NULL
);
