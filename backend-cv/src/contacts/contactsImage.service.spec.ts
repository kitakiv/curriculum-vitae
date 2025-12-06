import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import { ContactsImageService } from './contactsImage.service';
import { Contact } from './entities/contact.entity';

const mockContactsRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  existsBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
};

const mockUuid = uuid.v4();

const mockContact = new Contact({
  contactSvg: `https://image/${mockUuid}-1.svg`,
  contactLink: 'https://google.com',
  contactName: 'title 1',
});

describe('ContactsImageService', () => {
  let serviceImage: ContactsImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsImageService,
        {
          provide: getRepositoryToken(Contact),
          useValue: mockContactsRepository,
        },
      ],
    }).compile();

    serviceImage = module.get<ContactsImageService>(ContactsImageService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(serviceImage).toBeDefined();
  });

  describe('uploadImage', () => {
    const expectedValue = {
      id: mockUuid,
      contactSvg: mockContact.contactSvg,
    };
    const inputContactImage = {
      id: mockUuid,
      image: mockContact.contactSvg,
    };
    it('should upload image successfully', async () => {
      mockContactsRepository.existsBy.mockResolvedValue(true);
      mockContactsRepository.update.mockResolvedValue(expectedValue);
      const result = await serviceImage.uploadImage(inputContactImage);
      expect(mockContactsRepository.update).toHaveBeenCalled();
      expect(mockContactsRepository.update).toHaveBeenCalledWith(mockUuid, {
        contactSvg: mockContact.contactSvg,
      });
      expect(mockContactsRepository.existsBy).toHaveBeenCalled();
      expect(mockContactsRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(expectedValue);
    });

    it('should return NOT_FOUND when profile not found', async () => {
      mockContactsRepository.existsBy.mockResolvedValue(false);
      mockContactsRepository.update.mockResolvedValue(expectedValue);
      await expect(serviceImage.uploadImage(inputContactImage)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when update fails', async () => {
      mockContactsRepository.existsBy.mockResolvedValue(true);
      mockContactsRepository.update.mockRejectedValue(new Error('DB Error'));
      await expect(serviceImage.uploadImage(inputContactImage)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getImageKey', () => {
    it('should return key of image', async () => {
      mockContactsRepository.existsBy.mockResolvedValue(true);
      mockContactsRepository.findOneBy.mockResolvedValue(mockContact);
      const expectedResult = mockContact.contactSvg.split('/').at(-1);
      const result = await serviceImage.getImageKey(mockUuid);
      expect(mockContactsRepository.existsBy).toHaveBeenCalled();
      expect(mockContactsRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockContactsRepository.findOneBy).toHaveBeenCalled();
      expect(mockContactsRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(expectedResult);
    });

    it('should return null if svg not defined in contact svg', async () => {
      mockContactsRepository.existsBy.mockResolvedValue(true);
      mockContactsRepository.findOneBy.mockResolvedValue({
        ...mockContact,
        contactSvg: null,
      });
      const result = await serviceImage.getImageKey(mockUuid);
      expect(result).toBeNull();
    });

    it('should throw NotFoundException when contact not found', async () => {
      mockContactsRepository.existsBy.mockResolvedValue(false);
      await expect(serviceImage.getImageKey(mockUuid)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
