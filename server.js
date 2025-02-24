import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    source: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

app.post("/enviar-email", async (req, res) => {
    const { nome, telefone, email, assunto, descricao } = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: "vistefanesouza@gmail.com",
        subject: `Nova mensagem de ${nome}`,
        text: `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\nAssunto: ${assunto}\nMensagem: ${descricao}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error); 
        res.status(500).json({ message: "Erro ao enviar e-mail", error: error.message });
    }
});

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
