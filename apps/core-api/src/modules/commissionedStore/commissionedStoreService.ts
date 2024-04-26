import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { v4 as uuidv4 } from 'uuid';
import { commissionedStoreRepository } from '@modules/commissionedStore/commissionedStoreRepository';
import {
  CommissionedStore,
  CreateCommissionedStoreRequest,
  GetCommissionedStoreByIdResponse,
  UpdateCommissionedStoreRequest,
} from '@modules/commissionedStore/commissionedStoreModel';
import { NotFoundError } from '@common/models/notFoundError';

const toDTO = (commissionedStore: CommissionedStore): GetCommissionedStoreByIdResponse => ({
  id: commissionedStore.id,
  commissionedCompany: commissionedStore.commissionedCompany,
  notebookId: commissionedStore.notebookId,
  productUrl: commissionedStore.productUrl,
  commissionedUrl: commissionedStore.commissionedUrl,
  createdAt: commissionedStore.createdAt,
  updatedAt: commissionedStore.updatedAt,
});

export const commissionedStoreService = {
  getAll: async (): Promise<ServiceResponse<GetCommissionedStoreByIdResponse[] | null>> => {
    const stores = await commissionedStoreRepository.getAll();
    return new ServiceResponse<GetCommissionedStoreByIdResponse[]>(
      ResponseStatus.Success,
      'Stores encontrados',
      stores.map(toDTO),
      StatusCodes.OK
    );
  },
  get: async (id: string): Promise<ServiceResponse<GetCommissionedStoreByIdResponse | null>> => {
    const store = await commissionedStoreRepository.get(id);
    if (!store) {
      throw new NotFoundError(id);
    }
    return new ServiceResponse<GetCommissionedStoreByIdResponse>(
      ResponseStatus.Success,
      'Store encontrado',
      toDTO(store),
      StatusCodes.OK
    );
  },
  create: async (request: CreateCommissionedStoreRequest): Promise<ServiceResponse<string | null>> => {
    const store = await commissionedStoreRepository.create({
      id: uuidv4(),
      commissionedCompany: request.commissionedCompany,
      notebookId: request.notebookId,
      productUrl: request.productUrl,
      commissionedUrl: request.commissionedUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return new ServiceResponse<string>(ResponseStatus.Success, 'Store criada', store.id, StatusCodes.CREATED);
  },
  update: async (id: string, request: UpdateCommissionedStoreRequest): Promise<ServiceResponse<string | null>> => {
    const store = await commissionedStoreRepository.get(id);
    if (!store) {
      throw new NotFoundError(id);
    }

    store.commissionedUrl = request.commissionedUrl;
    store.productUrl = request.productUrl;
    store.updatedAt = new Date();

    await commissionedStoreRepository.update(store);

    return new ServiceResponse<string>(ResponseStatus.Success, 'Store alterada', store.id, StatusCodes.OK);
  },
  delete: async (id: string): Promise<ServiceResponse<string | null>> => {
    const store = await commissionedStoreRepository.get(id);
    if (!store) {
      throw new NotFoundError(id);
    }

    await commissionedStoreRepository.delete(id);

    return new ServiceResponse<string>(ResponseStatus.Success, 'Store deletada', store.id, StatusCodes.OK);
  },
};
