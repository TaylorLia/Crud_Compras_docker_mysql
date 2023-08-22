const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

dotenv.config();


  async function verificaConexaoPrisma() {
    const prisma = new PrismaClient();

    try {
      // Tenta realizar uma consulta simples para verificar a conexão
      await prisma.$queryRaw`SELECT 1`;
      console.log('Conexão com o Prisma estabelecida com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar com o Prisma:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  verificaConexaoPrisma()


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
