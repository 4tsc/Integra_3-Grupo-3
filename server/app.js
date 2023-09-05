import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  getAsesores,
  getAsesorById,
  createAsesor,
  getHoras,
  getHoraById,
  createHora,
  deleteHora,
} from "./database.js"; // Replace with the correct path to your database module

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to your API!");
});

// Users Routes
app.get("/usuarios", async (req, res) => {
  const usuarios = await getUsuarios();
  res.json(usuarios);
});

app.get("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const usuario = await getUsuarioById(id);
  res.json(usuario);
});

app.post("/usuarios", async (req, res) => {
  const { nombre, apellido, rut, correo, facultad, t_planta } = req.body;
  const newUser = await createUsuario(nombre, apellido, rut, correo, facultad, t_planta);
  res.json(newUser);
});

// Advisors Routes
app.get("/asesores", async (req, res) => {
  const asesores = await getAsesores();
  res.json(asesores);
});

app.get("/asesores/:id", async (req, res) => {
  const { id } = req.params;
  const asesor = await getAsesorById(id);
  res.json(asesor);
});

app.post("/asesores", async (req, res) => {
  const { nombre, apellido, rut, correo, area } = req.body;
  const newAsesor = await createAsesor(nombre, apellido, rut, correo, area);
  res.json(newAsesor);
});

// Appointments Routes
app.get("/horas", async (req, res) => {
  const horas = await getHoras();
  res.json(horas);
});

app.get("/horas/:id", async (req, res) => {
  const { id } = req.params;
  const hora = await getHoraById(id);
  res.json(hora);
});

app.post("/horas", async (req, res) => {
  const { descripcion, hora, fecha, id_usuario, id_asesor } = req.body;
  const newHora = await createHora(descripcion, hora, fecha, id_usuario, id_asesor);
  res.json(newHora);
});

app.delete("/horas/:id", async (req, res) => {
  const { id } = req.params;
  await deleteHora(id);
  res.send("Appointment deleted successfully.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
