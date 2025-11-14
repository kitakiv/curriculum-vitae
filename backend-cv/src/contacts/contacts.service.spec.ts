import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import * as uuid from 'uuid';

const mockContactRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  existsBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockUuid = uuid.v4();

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        {
          provide: getRepositoryToken(Contact),
          useValue: mockContactRepository,
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createContactInput: CreateContactInput = {
      contactName: 'GitHub',
      contactLink: 'https://github.com/user',
      contactSvg: 'https://example.com/github.svg',
    };

    it('should create a contact successfully', async () => {
      const expectedContact = { id: mockUuid, ...createContactInput };
      mockContactRepository.save.mockResolvedValue(expectedContact);

      const result = await service.create(createContactInput);

      expect(mockContactRepository.create).toHaveBeenCalled();
      expect(mockContactRepository.save).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining(createContactInput));
    });

    it('should throw BadRequestException when creation fails', async () => {
      mockContactRepository.save.mockRejectedValue(new Error('DB Error'));

      await expect(service.create(createContactInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all contacts', async () => {
      const expectedContacts = [
        { id: '1', contactName: 'GitHub', contactLink: 'https://github.com' },
        {
          id: '2',
          contactName: 'LinkedIn',
          contactLink: 'https://linkedin.com',
        },
      ];
      mockContactRepository.find.mockResolvedValue(expectedContacts);

      const result = await service.findAll();

      expect(mockContactRepository.find).toHaveBeenCalled();
      expect(result).toEqual(expectedContacts);
    });
  });

  describe('findOne', () => {
    it('should return a contact by id', async () => {
      const expectedContact = { id: '1', contactName: 'GitHub' };
      mockContactRepository.findOneBy.mockResolvedValue(expectedContact);

      const result = await service.findOne('1');

      expect(mockContactRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(expectedContact);
    });

    it('should throw NotFoundException when contact not found', async () => {
      mockContactRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateContactInput: UpdateContactInput = {
      contactName: 'Updated GitHub',
      id: mockUuid,
    };

    it('should update a contact successfully', async () => {
      const updatedContact = { id: '1', ...updateContactInput };
      mockContactRepository.existsBy.mockResolvedValue(true);
      mockContactRepository.findOneBy.mockResolvedValue(updatedContact);

      const result = await service.update('1', updateContactInput);

      expect(mockContactRepository.existsBy).toHaveBeenCalledWith({ id: '1' });
      expect(mockContactRepository.update).toHaveBeenCalledWith(
        '1',
        updateContactInput,
      );
      expect(result).toEqual(updatedContact);
    });

    it('should throw NotFoundException when contact does not exist', async () => {
      mockContactRepository.existsBy.mockResolvedValue(false);

      await expect(service.update('999', updateContactInput)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when update fails', async () => {
      mockContactRepository.existsBy.mockResolvedValue(true);
      mockContactRepository.update.mockRejectedValue(new Error('DB Error'));

      await expect(service.update('1', updateContactInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a contact successfully', async () => {
      mockContactRepository.existsBy.mockResolvedValue(true);

      const result = await service.remove('1');

      expect(mockContactRepository.existsBy).toHaveBeenCalledWith({ id: '1' });
      expect(mockContactRepository.delete).toHaveBeenCalledWith('1');
      expect(result).toEqual({ id: '1' });
    });

    it('should throw NotFoundException when contact does not exist', async () => {
      mockContactRepository.existsBy.mockResolvedValue(false);

      await expect(service.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
