// import {
//   BadRequestException,
//   ConflictException,
//   HttpException,
//   HttpStatus,
//   Injectable,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Student } from '../student/entity/student.entity';
// import { StudentDTO } from './dto/create-student.dto';
// import { UpdateStudentDTO } from './dto/update-student.dto';
// import { ListStudentsDto } from './dto/student.dto';
// import { query } from 'express';
// import { AgeQueryParamDto } from './dto/filter.dto';

// @Injectable()
// export class StudentService {
//   constructor(
//     @InjectRepository(Student)
//     private readonly studentRepository: Repository<Student>,
//   ) {}

//   async findAll(): Promise<Student[]> {
//     return this.studentRepository.find();
//   }

//   async findOne(id: number): Promise<Student> {
//     try {
//       const student = await this.studentRepository.findOne({ where: { id } });
//       if (!student || student.status !== 'active') {
//         throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
//       }
//       return student;
//     } catch (error) {
//       throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
//     }
//   }

//   async create(studentData: any): Promise<any> {
//     try {
//       const newStudent = this.studentRepository.create(studentData);
//       await this.studentRepository.save(newStudent);
//       return { message: 'Data created successfully', data: newStudent };
//     } catch (error) {
//       // Check if the error is due to a duplicate email
//       if (
//         error.code === '23505' &&
//         error.constraint === 'unique_email_constraint'
//       ) {
//         throw new ConflictException('Email already exists');
//       } else {
//         // If it's another type of database error, re-throw the original error
//         throw error;
//       }
//     }
//   }
//   async update(id: any, studentData: UpdateStudentDTO): Promise<any> {
//     try {
//       const existingStudent = await this.studentRepository.findOne({
//         where: { id },
//       });

//       if (!existingStudent) {
//         throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
//       }

//       // Check if the status is 'inactive'
//       if (existingStudent.status === 'inactive') {
//         throw new HttpException(
//           'Cannot update inactive student',
//           HttpStatus.BAD_REQUEST,
//         );
//       }

//       // Checking if any data actually changed 
//       const isDataChanged = Object.keys(studentData).some(
//         (key) => existingStudent[key] !== studentData[key],
//       );

//       if (!isDataChanged) {
//         return {
//           data: [],
//           message: 'No changes detected',
//         };
//       }

//       Object.assign(existingStudent, studentData);

//       // Save the updated student entity
//       const updatedStudent = await this.studentRepository.save(existingStudent);

//       return {
//         data: updatedStudent,
//         message: 'Data updated successfully',
//       };
//     } catch (error) {
//       // Handle any errors that occurred during the update process
//       return {
//         data: [],
//         message: 'Failed to update data',
//         error: error.message || 'Unknown error occurred',
//       };
//     }
//   }

//   async delete(id: any): Promise<void> {
//     try {
//       const existingStudent = await this.studentRepository.findOne({
//         where: { id },
//       });

//       if (!existingStudent) {
//         throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
//       }

//       existingStudent.status = 'inactive'; // Set status to 'inactive'

//       await this.studentRepository.save(existingStudent);
//     } catch (error) {
//       throw error;
//     }
//   }

//   async listAllStudents(
//     ageQuery: AgeQueryParamDto,
//     listStudentsDto: ListStudentsDto,
//   ): Promise<any> {
//     const { page, pageSize, search, filter } = listStudentsDto;
//     const { age, ageFilter } = ageQuery;

//     let queryBuilder = this.studentRepository.createQueryBuilder('student');

//     // Add a WHERE clause to filter out inactive students
//     queryBuilder = queryBuilder.where('student.status =:status', {
//       status: 'active',
//     });
//     //search operation
//     if (search) {
//       console.log('inside the search');

//       queryBuilder = queryBuilder.where(
//         'LOWER(student.fullName) LIKE LOWER(:search)',
//         { search: `%${search}%` },
//       );
//     }

//     //filter operation
//     if (filter) {
//       for (const [key, value] of Object.entries(filter)) {
//         console.log(key, 'keyyyy');
//         console.log(value, 'valuee');

//         queryBuilder = queryBuilder.andWhere(`student.${key} = :${key}`, {
//           [key]: value,
//         });
//       }
//     }

//     //age Filtering
//     if (age && ageFilter) {
//       if (ageFilter === '>') {
//         queryBuilder = queryBuilder.andWhere('student.age > :age', { age });
//       } else if (ageFilter === '<') {
//         queryBuilder = queryBuilder.andWhere('student.age < :age', { age });
//       } else if (ageFilter === '>=') {
//         queryBuilder = queryBuilder.andWhere('student.age >= :age', { age });
//       } else if (ageFilter === '<=') {
//         queryBuilder = queryBuilder.andWhere('student.age <= :age', { age });
//       }
//     }

//     queryBuilder = queryBuilder.orderBy('student.id', 'ASC');

//     const result = await queryBuilder.getMany();
//     console.log(result, 'res data');

//     if (result.length === 0) {
//       const error = new HttpException(
//         'No Student data found.',
//         HttpStatus.NOT_FOUND,
//       );
//       throw error;
//     }

//     // Both search && Filter
//     if (search && filter) {
//       console.log(true, ' inside the search & filter');
//       const filteredResult = result.filter((student) => {
//         for (const [key, value] of Object.entries(filter)) {
//           if (value) {
//             if (student[key] !== value) {
//               console.log('insideee');
//               return false;
//             }
//           }
//         }
//         return true;
//       });

//       /* pagination*/
//       const startIndex = (page - 1) * pageSize;
//       const endIndex = startIndex + pageSize;
//       const paginatedResult = filteredResult.slice(startIndex, endIndex);
//       console.log(paginatedResult, 'pagee');

//       if (paginatedResult.length === 0) {
//         console.log(true);
//         const error = new HttpException(
//           'No Student data found.',
//           HttpStatus.NOT_FOUND,
//         );
//         throw error;
//       }

//       return paginatedResult;
//     }

//     const startIndex = (page - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const paginatedResult = result.slice(startIndex, endIndex);

//     if (paginatedResult.length === 0) {
//       const error = new HttpException(
//         'No Student data found.',
//         HttpStatus.NOT_FOUND,
//       );
//       throw error;
//     }

//     return paginatedResult;
//   }
// }
