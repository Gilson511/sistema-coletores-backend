CREATE TABLE coletores (
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
