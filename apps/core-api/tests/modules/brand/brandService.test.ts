import { brandRepository } from '@modules/brand/brandRepository';
import { brandService } from '@modules/brand/brandService';
import { Brand, UpdateBrandRequest } from '@modules/brand/brandModel';
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
      createdAt: new Date('2019-12-31'),
      updatedAt: new Date(),
    };
  });

  describe('findAll', () => {
    it('handles errors for findAllAsync', async () => {
      jest.spyOn(brandRepository, 'findAllAsync').mockRejectedValue(new Error('Database error'));

      expect(await brandService.findAll()).toEqual({
        message: 'Erro ao encontrar as brands: Database error',
        responseObject: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
      });
    });

    it('return all brands', async () => {
      jest.spyOn(brandRepository, 'findAllAsync').mockResolvedValue([brand]);

      expect(await brandService.findAll()).toEqual({
        message: 'Brands encontradas',
        responseObject: [brand],
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(brandRepository.findAllAsync).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('handles errors for findById', async () => {
      jest.spyOn(brandRepository, 'findByIdAsync').mockResolvedValue(null);

      expect(await brandService.findById(randomUUID())).toEqual({
        message: 'Nenhuma brand encontrada',
        responseObject: null,
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
      });
    });

    it('return a brand', async () => {
      jest.spyOn(brandRepository, 'findByIdAsync').mockResolvedValue(brand);

      expect(await brandService.findById(brand.id)).toEqual({
        message: 'Brand encontrada',
        responseObject: brand,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(brandRepository.findByIdAsync).toHaveBeenCalledTimes(1);
      expect(brandRepository.findByIdAsync).toHaveBeenCalledWith(brand.id);
    });
  });

  describe('deleteBrand', () => {
    it('handles errors for deleteBrand', async () => {
      jest.spyOn(brandRepository, 'findByIdAsync').mockResolvedValue(null);

      expect(await brandService.deleteBrand(randomUUID())).toEqual({
        message: 'Nenhuma brand encontrada',
        responseObject: null,
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
      });
    });

    it('delete a brand', async () => {
      jest.spyOn(brandRepository, 'findByIdAsync').mockResolvedValue(brand);
      jest.spyOn(brandRepository, 'deleteBrand').mockResolvedValue();

      expect(await brandService.deleteBrand(brand.id)).toEqual({
        message: 'Brand deletada',
        responseObject: brand.id,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(brandRepository.findByIdAsync).toHaveBeenCalledTimes(1);
      expect(brandRepository.findByIdAsync).toHaveBeenCalledWith(brand.id);
      expect(brandRepository.deleteBrand).toHaveBeenCalledTimes(1);
      expect(brandRepository.deleteBrand).toHaveBeenCalledWith(brand.id);
    });
  });

  describe('updateBrand', () => {
    it('handles errors for updateBrand', async () => {
      jest.spyOn(brandRepository, 'findByIdAsync').mockResolvedValue(null);

      expect(await brandService.updateBrand(randomUUID(), {} as UpdateBrandRequest)).toEqual({
        message: 'Nenhuma brand encontrada',
        responseObject: null,
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
      });
    });

    it('update a brand', async () => {
      const newValues = {name: 'Name 2', status: 'STATUS 2'}
      const updateBrand = {...brand, ...newValues, updatedAt: new Date()};
      jest.spyOn(brandRepository, 'findByIdAsync').mockResolvedValue(brand);
      jest.spyOn(brandRepository, 'updateBrand').mockResolvedValue(brand);

      expect(await brandService.updateBrand(brand.id, newValues)).toEqual({
        message: 'Brand alterada',
        responseObject: brand.id,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(brandRepository.findByIdAsync).toHaveBeenCalledTimes(1);
      expect(brandRepository.findByIdAsync).toHaveBeenCalledWith(brand.id);
      expect(brandRepository.updateBrand).toHaveBeenCalledTimes(1);
      expect(brandRepository.updateBrand).toHaveBeenCalledWith(updateBrand);
    });
  });
});
