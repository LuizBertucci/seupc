import { brandRepository } from '@modules/brand/brandRepository';
import { brandService } from '@modules/brand/brandService';
import { Brand } from '@modules/brand/brandModel';
import { randomUUID } from 'crypto';
import { StatusCodes } from 'http-status-codes';

jest.mock('@modules/brand/brandRepository');
jest.mock('@src/index');
jest.mock('@src/server');

describe('brandService', () => {
  let brand: Brand;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

    brand = {
      id: randomUUID(),
      name: 'Name',
      status: 'STATUS',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  describe('findAll', () => {
    it('handles errors for findAllAsync', async () => {
      jest.spyOn(brandRepository, 'findAllAsync').mockRejectedValue(new Error('Database error'));

      expect(await brandService.findAll()).toEqual({
        message: 'Erro ao encontrar os notebooks: Database error',
        responseObject: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
      });
    });

    it('return all brands', async () => {
      jest.spyOn(brandRepository, 'findAllAsync').mockResolvedValue([brand]);

      expect(await brandService.findAll()).toBeDefined();
      expect(brandRepository.findAllAsync).toHaveBeenCalledTimes(1);
    });
  });
});
