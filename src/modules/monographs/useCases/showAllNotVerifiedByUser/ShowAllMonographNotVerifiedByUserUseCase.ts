import { inject, injectable } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IMonographsListResponseDTO } from '@modules/monographs/dtos/IMonographsListResponseDTO';
import { MonographsRepository } from '@modules/monographs/infra/prisma/repositories/MonographsRepository';
import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ShowAllMonographNotVerifiedByUserUseCase {
  constructor(
    @inject(MonographsRepository)
    private monographsRepository: IMonographsRepository,
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    user_email: string,
    page: number,
  ): Promise<IMonographsListResponseDTO> {
    if (!user_email) {
      throw new AppError('Email invalid!');
    }

    const user = await this.usersRepository.findByConfirmedEmail(user_email);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const all = await this.monographsRepository.showAllNotVerifiedByUser(
      user.id,
      page,
    );

    return all;
  }
}

export { ShowAllMonographNotVerifiedByUserUseCase };
