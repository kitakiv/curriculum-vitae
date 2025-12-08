import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import * as uuid from 'uuid';
import { Resource } from './enums/resource.enum';
import { Action } from './enums/action.enum';

const mockRoleRepository = {
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

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const permission = {
      resource: Resource.USER,
      actions: [Action.CREATE],
    };
    const createRoleInput: CreateRoleInput = {
      name: 'roleName',
      permissions: [permission],
    };

    it('should create a role successfully', async () => {
      const expectedRole = { id: mockUuid, ...createRoleInput };
      mockRoleRepository.save.mockResolvedValue(expectedRole);
      const result = await service.create(createRoleInput);
      expect(mockRoleRepository.create).toHaveBeenCalled();
      expect(mockRoleRepository.save).toHaveBeenCalled();
      expect(mockRoleRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(createRoleInput),
      );
      expect(result).toEqual(expect.objectContaining(expectedRole));
    });

    it('should throw BadRequestException when creating a role with existing name', async () => {
      mockRoleRepository.findOneBy.mockResolvedValue({
        id: mockUuid,
        name: 'roleName',
      });
      await expect(service.create(createRoleInput)).rejects.toThrow(
        new BadRequestException('Role already exist'),
      );
    });

    it('should throw BadRequestException when creation fails', async () => {
      mockRoleRepository.save.mockRejectedValue(new Error('DB Error'));

      await expect(service.create(createRoleInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all Roles', async () => {
      const expectedRoles = {
        id: mockUuid,
        name: 'roleName',
        permissions: [
          { id: mockUuid, resource: Resource.USER, actions: [Action.CREATE] },
        ],
      };
      mockRoleRepository.find.mockResolvedValue(expectedRoles);

      const result = await service.findAll();
      expect(mockRoleRepository.find).toHaveBeenCalled();
      expect(result).toEqual(expectedRoles);
    });
  });

  describe('findOne', () => {
    it('should return a role by id', async () => {
      const expectedRole = {
        id: mockUuid,
        name: 'roleName',
        permissions: [
          { id: 'id', resource: Resource.USER, actions: [Action.CREATE] },
        ],
      };
      mockRoleRepository.findOne.mockResolvedValue(expectedRole);

      const result = await service.findOne(mockUuid);

      expect(mockRoleRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUuid },
        relations: { permissions: true },
      });
      expect(result).toEqual(expectedRole);
    });

    it('should throw NotFoundException when role not found', async () => {
      mockRoleRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(mockUuid)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    const updateRoleInput: UpdateRoleInput = {
      name: 'Updated roleName',
      id: mockUuid,
    };

    it('should update a role successfully', async () => {
      const updatedRole = {
        id: mockUuid,
        ...updateRoleInput,
        permissions: [{ resource: Resource.USER, actions: [Action.CREATE] }],
      };
      mockRoleRepository.existsBy.mockResolvedValue(true);
      mockRoleRepository.findOne.mockResolvedValue(updatedRole);
      mockRoleRepository.update.mockResolvedValue(updatedRole);
      const result = await service.update(mockUuid, updateRoleInput);

      expect(mockRoleRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockRoleRepository.update).toHaveBeenCalledWith(
        mockUuid,
        updateRoleInput,
      );
      expect(result).toEqual(updatedRole);
    });

    it('should throw NotFoundException when role does not exist', async () => {
      mockRoleRepository.existsBy.mockResolvedValue(false);

      await expect(service.update(mockUuid, updateRoleInput)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when update fails', async () => {
      mockRoleRepository.existsBy.mockResolvedValue(true);
      mockRoleRepository.update.mockRejectedValue(new Error('DB Error'));

      await expect(service.update(mockUuid, updateRoleInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a role successfully', async () => {
      mockRoleRepository.existsBy.mockResolvedValue(true);
      mockRoleRepository.delete.mockResolvedValue({ id: mockUuid });
      const result = await service.remove(mockUuid);

      expect(mockRoleRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockRoleRepository.delete).toHaveBeenCalledWith(mockUuid);
      expect(result).toEqual({ id: mockUuid });
    });

    it('should throw NotFoundException when role does not exist', async () => {
      mockRoleRepository.existsBy.mockResolvedValue(false);
      await expect(service.remove(mockUuid)).rejects.toThrow(NotFoundException);
    });
  });
});
