import { brandRepository } from '@modules/brand/brandRepository';
import { brandService } from '@modules/brand/brandService';
import { Brand, CreateBrandRequest, UpdateBrandRequest } from '@modules/brand/brandModel';
import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'crypto';
import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';

jest.mock('@modules/brand/brandRepository');
jest.mock('@src/index');
jest.mock('@src/server');
jest.mock('uuid', () => ({ v4: () => '9c2195df-db50-401b-acea-66b702cb3d92' }));

describe('brandService', () => {
  let brand: Brand;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

    brand = {
      id: randomUUID(),
      name: 'Lenova',
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
    it('handles errors for duplicate name', async () => {
      const request: UpdateBrandRequest = { name: 'Lenova & Cmp' };

      jest.spyOn(brandRepository, 'findByIdAsync').mockResolvedValue(brand);
      jest.spyOn(brandRepository, 'findByNameAsync').mockResolvedValue({ id: randomUUID() } as Brand);

      expect(await brandService.updateBrand(brand.id, request)).toEqual(
        new ServiceResponse(
          ResponseStatus.Failed,
          `Nome ${request.name} já é utilizado por outra brand`,
          null,
          StatusCodes.BAD_REQUEST
        )
      );
    });

    it('handles errors for updateBrand', async () => {
      jest.spyOn(brandRepository, 'findByIdAsync').mockResolvedValue(null);

      expect(await brandService.updateBrand(randomUUID(), {} as UpdateBrandRequest)).toEqual({
        message: 'Nenhuma brand encontrada',
        responseObject: null,
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
      });
    });

    it.each([{ findByNameAsync: null }, { findByNameAsync: brand }])('update a brand', async ({ findByNameAsync }) => {
      const newValues = { name: 'Lenova & Co.' };
      const updateBrand = { ...brand, ...newValues, updatedAt: new Date() };
      jest.spyOn(brandRepository, 'findByIdAsync').mockResolvedValue(brand);
      jest.spyOn(brandRepository, 'updateBrand').mockResolvedValue(brand);
      jest.spyOn(brandRepository, 'findByNameAsync').mockResolvedValue(findByNameAsync);

      expect(await brandService.updateBrand(brand.id, newValues)).toEqual({
        message: 'Brand alterada',
        responseObject: brand.id,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(brandRepository.findByNameAsync).toHaveBeenCalledWith(newValues.name);
      expect(brandRepository.findByIdAsync).toHaveBeenCalledTimes(1);
      expect(brandRepository.findByIdAsync).toHaveBeenCalledWith(brand.id);
      expect(brandRepository.updateBrand).toHaveBeenCalledTimes(1);
      expect(brandRepository.updateBrand).toHaveBeenCalledWith(updateBrand);
    });
  });

  describe('createBrand', () => {
    it('handles errors for createBrand', async () => {
      jest.spyOn(brandRepository, 'createBrand').mockRejectedValue(new Error('Database error'));
      jest.spyOn(brandRepository, 'findByNameAsync').mockResolvedValue(null);

      expect(await brandService.createBrand({} as CreateBrandRequest)).toEqual({
        message: 'Erro ao criar a brand: Database error',
        responseObject: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
      });
    });

    it('handles errors for duplicate name', async () => {
      const request: CreateBrandRequest = { name: 'Lenova' };
      jest.spyOn(brandRepository, 'findByNameAsync').mockResolvedValue({} as Brand);
      expect(await brandService.createBrand(request)).toEqual(
        new ServiceResponse(
          ResponseStatus.Failed,
          `Nome ${request.name} já é utilizado por outra brand`,
          null,
          StatusCodes.BAD_REQUEST
        )
      );
    });

    it('create a brand', async () => {
      const createValues = { name: brand.name };
      jest.spyOn(brandRepository, 'createBrand').mockResolvedValue(brand);
      jest.spyOn(brandRepository, 'findByNameAsync').mockResolvedValue(null);

      expect(await brandService.createBrand(createValues)).toEqual({
        message: 'Brand criada',
        responseObject: brand.id,
        statusCode: StatusCodes.CREATED,
        success: true,
      });
      expect(brandRepository.findByNameAsync).toHaveBeenCalledWith(brand.name);
      expect(brandRepository.createBrand).toHaveBeenCalledTimes(1);
      expect(brandRepository.createBrand).toHaveBeenCalledWith({
        ...createValues,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: '9c2195df-db50-401b-acea-66b702cb3d92',
      });
    });
  });
});
