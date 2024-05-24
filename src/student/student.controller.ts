import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  BadRequestException,
  NotFoundException,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Student } from '../student/entity/student.entity';
import { StudentService } from './student.service';
import { StudentDTO } from './dto/create-student.dto';
import { UpdateStudentDTO } from './dto/update-student.dto';
import { ListStudentsDto } from './dto/student.dto';
import { AgeQueryParamDto } from './dto/filter.dto';

@ApiTags('students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  //GetAllStudents API
  @Get()
  @ApiResponse({ status: 200, description: 'List of all students.' })
  async findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  // GetStudentById API
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Student> {
    const user = await this.studentService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  //CreateStudent API
  @Post()
  @ApiBody({ type: StudentDTO })
  @ApiResponse({ status: 201, description: 'Create a new student.' })
  async create(
    @Body() studentData: StudentDTO,
  ): Promise<{ message: string; data: Student }> {
    // Check if any field is empty
    const emptyFields = Object.entries(studentData).filter(
      ([key, value]) => !value,
    );
    if (emptyFields.length > 0) {
      const missingFields = emptyFields.map(([key, value]) => key).join(', ');
      throw new BadRequestException(
        `The following fields are required: ${missingFields}`,
      );
    }

    // Proceed with creating the student
    const createdStudent = await this.studentService.create(studentData);

    return { message: 'Data created successfully', data: createdStudent };
  }

  //Update Student API
  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update a student.' })
  async update(
    @Param('id') id: number,
    @Body() studentData: UpdateStudentDTO,
  ): Promise<Student> {
    return this.studentService.update(id, studentData);
  }

  //Delete Students API
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Deleted a student successfully' })
  async delete(
    @Param('id') id: number,
  ): Promise<{ data: Student[]; message: string }> {
    const student = await this.studentService.findOne(id);

    if (!student) {
      throw new NotFoundException('Student does not exist!');
    }
    await this.studentService.delete(id);

    return { data: [], message: 'Student deleted successfully' };
  }

  //listStudents API
  @Post('list')
  @ApiResponse({ status: 200, description: 'List all students.' })
  async listAllStudents(
    @Query(new ValidationPipe({ transform: true })) ageQuery: AgeQueryParamDto,
    @Body() listStudentsDto: ListStudentsDto,
  ): Promise<any> {
    return this.studentService.listAllStudents(ageQuery, listStudentsDto);
  }
}
