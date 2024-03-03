import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { logger } from '@src/server';
import { v4 as uuidv4 } from 'uuid';
import { brandRepository } from '@modules/brand/brandRepository';
import { Brand, CreateBrandRequest, GetBrandByIdResponse, UpdateBrandRequest } from '@modules/brand/brandModel';

const toDTO = (brand: Brand): GetBrandByIdResponse => ({
  id: brand.id,
  name: brand.name,
  status: brand.status,
  createdAt: brand.createdAt,
  updatedAt: brand.updatedAt,
});

export const brandService = {
  findAll: async (): Promise<ServiceResponse<GetBrandByIdResponse[] | null>> => {
    try {
      const brands = await brandRepository.findAllAsync();
      return new ServiceResponse<GetBrandByIdResponse[]>(
        ResponseStatus.Success,
        'Brands encontradas',
        brands.map(toDTO),
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Erro ao encontrar as brands: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  findById: async (id: string): Promise<ServiceResponse<GetBrandByIdResponse | null>> => {
    try {
      const brand = await brandRepository.findByIdAsync(id);
      if (!brand) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhuma brand encontrada', null, StatusCodes.NOT_FOUND);
      }

      return new ServiceResponse<GetBrandByIdResponse>(
        ResponseStatus.Success,
        'Brand encontrada',
        toDTO(brand),
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Erro ao encontrar a brand: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  createBrand: async (request: CreateBrandRequest): Promise<ServiceResponse<string | null>> => {
    try {
      const brand = await brandRepository.createBrand({
        id: uuidv4(),
        name: request.name,
        status: request.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return new ServiceResponse<string>(ResponseStatus.Success, 'Brand criada', brand.id, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Erro ao criar a brand: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  updateBrand: async (id: string, request: UpdateBrandRequest): Promise<ServiceResponse<string | null>> => {
    try {
      const brand = await brandRepository.findByIdAsync(id);
      if (!brand) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhuma brand encontrada', null, StatusCodes.NOT_FOUND);
      }

      brand.name = request.name;
      brand.status = request.status;
      brand.updatedAt = new Date();

      await brandRepository.updateBrand(brand);

      return new ServiceResponse<string>(ResponseStatus.Success, 'Brand alterada', brand.id, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Erro ao alterar a brand: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  deleteBrand: async (id: string): Promise<ServiceResponse<string | null>> => {
    try {
      const brand = await brandRepository.findByIdAsync(id);
      if (!brand) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhuma brand encontrada', null, StatusCodes.NOT_FOUND);
      }

      await brandRepository.deleteBrand(id);

      return new ServiceResponse<string>(ResponseStatus.Success, 'Brand deletada', brand.id, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Erro ao alterar a brand: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
