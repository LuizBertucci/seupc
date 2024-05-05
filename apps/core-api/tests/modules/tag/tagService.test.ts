import { tagRepository } from '@modules/tag/tagRepository';
import { tagService } from '@modules/tag/tagService';
import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'crypto';
import { GetPartByIdResponse } from '@modules/part/partModel';
import { CreateTagRequest, Tag, TagCategory } from '@modules/tag/tagModel';
import { partService } from '@modules/part/partService';
import { ServiceResponse } from '@common/models/serviceResponse';
import { BatchNotFoundError } from '@common/models/notFoundError';

jest.mock('@modules/tag/tagRepository');
jest.mock('@src/index');
jest.mock('@src/server');
jest.mock('uuid', () => ({ v4: () => '9c2195df-db50-401b-acea-66b702cb3d92' }));

describe('Tag Service', () => {
  let tag: Tag;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

    tag = {
      id: randomUUID(),
      name: 'Fornite',
      category: TagCategory.GAMES,
      createdAt: new Date('2019-12-31'),
      updatedAt: new Date(),
    };
  });

  describe('create', () => {
    it('should throw errors for invalid parts ids', async () => {
      const request: CreateTagRequest = {
        name: 'Fortnite',
        category: TagCategory.GAMES,
        partsIds: [randomUUID(), randomUUID()],
      };
      jest
        .spyOn(partService, 'findByIds')
        .mockResolvedValue({ responseObject: [] } as unknown as ServiceResponse<GetPartByIdResponse[]>);
      await expect(tagService.create(request).catch()).rejects.toThrow(BatchNotFoundError);
    });

    it('should create a tag', async () => {
      const createValues: CreateTagRequest = {
        name: 'Fortnite',
        category: TagCategory.GAMES,
        partsIds: [randomUUID(), randomUUID()],
      };
      jest.spyOn(tagRepository, 'create').mockResolvedValue(tag);
      jest
        .spyOn(partService, 'findByIds')
        .mockResolvedValue({ responseObject: [{}, {}] } as unknown as ServiceResponse<GetPartByIdResponse[]>);

      expect(await tagService.create(createValues)).toEqual({
        message: 'Tag criada',
        responseObject: tag.id,
        statusCode: StatusCodes.CREATED,
        success: true,
      });
      expect(partService.findByIds).toHaveBeenCalledWith(createValues.partsIds);
      expect(tagRepository.create).toHaveBeenCalledTimes(1);
      expect(tagRepository.create).toHaveBeenCalledWith(
        {
          name: 'Fortnite',
          category: TagCategory.GAMES,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: '9c2195df-db50-401b-acea-66b702cb3d92',
        },
        createValues.partsIds
      );
    });
  });
});
