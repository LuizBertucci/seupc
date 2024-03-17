import { partRepository } from '@modules/part/partRepository';
import { partService } from '@modules/part/partService';
import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'crypto';
import { CreatePartRequest, Part, PartType, UpdatePartRequest } from '@modules/part/partModel';
import { NotFoundError } from '@common/models/notFoundError';
import { BusinessRuleError } from '@common/models/businessRuleError';

jest.mock('@modules/part/partRepository');
jest.mock('@src/index');
jest.mock('@src/server');
jest.mock('uuid', () => ({ v4: () => '9c2195df-db50-401b-acea-66b702cb3d92' }));

describe('partService', () => {
  let part: Part;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

    part = {
      id: randomUUID(),
      name: 'SSD 1GB',
      partType: PartType.SSD,
      point: 1,
      createdAt: new Date('2019-12-31'),
      updatedAt: new Date(),
    };
  });

  describe('findAll', () => {
    it('return all Parts', async () => {
      jest.spyOn(partRepository, 'findAllAsync').mockResolvedValue([part]);

      expect(await partService.findAll()).toEqual({
        message: 'Parts encontradas',
        responseObject: [part],
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(partRepository.findAllAsync).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('handles errors for findById', async () => {
      jest.spyOn(partRepository, 'findByIdAsync').mockResolvedValue(null);

      await expect(partService.findById(randomUUID()).catch()).rejects.toThrow(NotFoundError)
    });

    it('return a Part', async () => {
      jest.spyOn(partRepository, 'findByIdAsync').mockResolvedValue(part);

      expect(await partService.findById(part.id)).toEqual({
        message: 'Part encontrada',
        responseObject: part,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(partRepository.findByIdAsync).toHaveBeenCalledTimes(1);
      expect(partRepository.findByIdAsync).toHaveBeenCalledWith(part.id);
    });
  });

  describe('deletePart', () => {
    it('handles errors for deletePart', async () => {
      jest.spyOn(partRepository, 'findByIdAsync').mockResolvedValue(null);

      await expect(partService.deletePart(randomUUID())).rejects.toThrow(NotFoundError)
    });

    it('delete a Part', async () => {
      jest.spyOn(partRepository, 'findByIdAsync').mockResolvedValue(part);
      jest.spyOn(partRepository, 'deletePart').mockResolvedValue();

      expect(await partService.deletePart(part.id)).toEqual({
        message: 'Part deletada',
        responseObject: part.id,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(partRepository.findByIdAsync).toHaveBeenCalledTimes(1);
      expect(partRepository.findByIdAsync).toHaveBeenCalledWith(part.id);
      expect(partRepository.deletePart).toHaveBeenCalledTimes(1);
      expect(partRepository.deletePart).toHaveBeenCalledWith(part.id);
    });
  });

  describe('updatePart', () => {
    it('handles errors for duplicate name', async () => {
      const request: UpdatePartRequest = { name: 'HD 1GB', point: 0.5 };

      jest.spyOn(partRepository, 'findByIdAsync').mockResolvedValue(part);
      jest.spyOn(partRepository, 'findByNameAsync').mockResolvedValue({ id: randomUUID() } as Part);

      await expect(partService.updatePart(part.id, request).catch()).rejects.toThrow(BusinessRuleError)
    });

    it('handles errors for updatePart', async () => {
      jest.spyOn(partRepository, 'findByIdAsync').mockResolvedValue(null);
      await expect(partService.updatePart(randomUUID(), {} as UpdatePartRequest).catch()).rejects.toThrow(NotFoundError)
    });

    it.each([{ findByNameAsync: null }, { findByNameAsync: part }])('update a Part', async ({ findByNameAsync }) => {
      const newValues: UpdatePartRequest = { name: 'HD 1GB', point: 0.5 };
      const updatePart = { ...part, ...newValues, updatedAt: new Date() };
      jest.spyOn(partRepository, 'findByIdAsync').mockResolvedValue(part);
      jest.spyOn(partRepository, 'updatePart').mockResolvedValue(part);
      jest.spyOn(partRepository, 'findByNameAsync').mockResolvedValue(findByNameAsync);

      expect(await partService.updatePart(part.id, newValues)).toEqual({
        message: 'Part alterada',
        responseObject: part.id,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(partRepository.findByNameAsync).toHaveBeenCalledWith(newValues.name);
      expect(partRepository.findByIdAsync).toHaveBeenCalledTimes(1);
      expect(partRepository.findByIdAsync).toHaveBeenCalledWith(part.id);
      expect(partRepository.updatePart).toHaveBeenCalledTimes(1);
      expect(partRepository.updatePart).toHaveBeenCalledWith(updatePart);
    });
  });

  describe('createPart', () => {
    it('handles errors for duplicate name', async () => {
      const request: CreatePartRequest = { name: 'HD 1GB', point: 0.5, partType: PartType.HD };
      jest.spyOn(partRepository, 'findByNameAsync').mockResolvedValue({} as Part);
      await expect(partService.createPart(request).catch()).rejects.toThrow(BusinessRuleError)
    });

    it('create a Part', async () => {
      const createValues: CreatePartRequest = {
        name: part.name,
        point: part.point,
        partType: part.partType,
      };
      jest.spyOn(partRepository, 'createPart').mockResolvedValue(part);
      jest.spyOn(partRepository, 'findByNameAsync').mockResolvedValue(null);

      expect(await partService.createPart(createValues)).toEqual({
        message: 'Part criada',
        responseObject: part.id,
        statusCode: StatusCodes.CREATED,
        success: true,
      });
      expect(partRepository.findByNameAsync).toHaveBeenCalledWith(part.name);
      expect(partRepository.createPart).toHaveBeenCalledTimes(1);
      expect(partRepository.createPart).toHaveBeenCalledWith({
        ...createValues,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: '9c2195df-db50-401b-acea-66b702cb3d92',
      });
    });
  });
});
