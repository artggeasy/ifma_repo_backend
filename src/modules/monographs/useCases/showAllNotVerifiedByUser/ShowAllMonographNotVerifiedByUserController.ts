import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowAllMonographNotVerifiedByUserUseCase } from './ShowAllMonographNotVerifiedByUserUseCase';

class ShowAllMonographNotVerifiedByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.params;

    const { user_email } = request.query;

    const showAllMonographNotVerifiedByUserUseCase = container.resolve(
      ShowAllMonographNotVerifiedByUserUseCase,
    );

    const all = await showAllMonographNotVerifiedByUserUseCase.execute(
      String(user_email),
      Number(page),
    );

    return response.status(200).json(all);
  }
}

export { ShowAllMonographNotVerifiedByUserController };
