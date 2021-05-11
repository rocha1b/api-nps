import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import 'reflect-metadata';
import createConnection from "./database";
import { AppError } from './errors/AppError';
import { router } from './routes';

createConnection();
const app = express();

//http://localhost:2222/users

// 1º param => rota (recurso API)
// 2º param => request, response

// app.get("/", (request, response) => {
//   return response.json({ message: "Funcionou hihihi"})
// })

// app.post("/", (request, response) => {
//   // Recebeu os dados para salvar
//   return response.json({ message: "Os dados foram salvos com sucesso!"});
// })

app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal server error ${err.message}`,
  });
});

export { app };