import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Criar usuário
app.post("/usuarios", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const user = await prisma.user.create({
      data: { name, email, age: Number(age) },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar usuários
app.get("/usuarios", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Deletar usuário
app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: { id: req.params.id },
  });
  res.status(204).json({ message: "Usuário deletado com sucesso" });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
