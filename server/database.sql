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


-- Tabela para registrar coletores devolvidos
CREATE TABLE IF NOT EXISTS db_coletores (
  id SERIAL PRIMARY KEY,
  numero_coletor VARCHAR(20) NOT NULL,
  re VARCHAR(20) NOT NULL,
  encarregado VARCHAR(50),
  turno VARCHAR(5),
  setor VARCHAR(50),
  hora_pegou TIMESTAMP,
  hora_baixa TIMESTAMP NOT NULL,
  estado TEXT,
  data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS coletores_devolvidos;

CREATE TABLE coletores_devolvidos (
  id SERIAL PRIMARY KEY,
  re VARCHAR(20),
  nome VARCHAR(100),
  numero_coletor VARCHAR(20),   -- corrigido
  encarregado VARCHAR(100),
  turno VARCHAR(20),
  setor VARCHAR(100),
  data_retirada TIMESTAMP,      -- corrigido
  data_baixa TIMESTAMP,         -- corrigido
  observacoes TEXT
);


--Permitir cadastro com numeração unica;
ALTER TABLE base_coletores
ADD CONSTRAINT unique_numero_coletor UNIQUE (numero_coletor);


--os registros sao unicos, um colaborador pode fazer a retira apenas se nao tiver nenhuma pendencia de baixa. 
CREATE UNIQUE INDEX unico_re_pendente
ON coletores (re)
WHERE hora_baixa IS NULL;



