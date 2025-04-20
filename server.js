const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const coletoresRoutes = require("./routes/coletores");
app.use("/api/coletores", coletoresRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
