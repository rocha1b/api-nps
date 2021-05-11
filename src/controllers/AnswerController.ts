import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  // http://localhost:2222/answers/1?u=06fa534a-44f7-4546-a845-1023f87a8eb5
  /* 
    Route Params => parâmetros que compõe a rota
    routes.get("/answers/:value")
  
    Query Params => não obrigatórios (busca, paginação)
    ? chave = valor
  */
  
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    });

    if (!surveyUser) {
      throw new AppError("Survey User does not exist!");
      // return response.status(400).json({
      //   error: "Survey User does not exist!"
      // })
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);
    return response.json(surveyUser);
  }
}

export { AnswerController };