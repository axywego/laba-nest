import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(username: string, email: string, hashedPassword: string): Promise<User> {
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = hashedPassword;

    return await this.userRepository.save(newUser);
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }
    return user;
  }

  async findUserWithTasks(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

}



// import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { QueryFailedError } from 'typeorm';

// @Injectable()
// export class UsersService {
//   constructor(private prisma: PrismaService) {}

//   async createUser(username: string, email: string) {
//     try {
//       return await this.prisma.user.create({
//         data: {
//           username,
//           email,
//         },
//       });
//     } catch (error) {
//       if (error.code === 'P2002') {
//         const target = error.meta?.target as string[];
//         if (target && target.includes('username')) {
//           throw new ConflictException(`User with username "${username}" already exists.`);
//         } else if (target && target.includes('email')) {
//           throw new ConflictException(`User with email "${email}" already exists.`);
//         } else {
//           throw new ConflictException('User with provided username or email already exists.');
//         }
//       }
//       throw error;
//     }
//   }

//   async findUserById(id: number) {
//     const user = await this.prisma.user.findUnique({ where: { id } });
//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//     return user;
//   }

//   async findUserWithTasks(id: number) {
//     const user = await this.prisma.user.findUnique({
//       where: { id },
//       include: { tasks: true },
//     });
//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//     return user;
//   }

//   async findAllUsers() {
//     return await this.prisma.user.findMany();
//   }
// }