import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JobService } from './job.service';
import { JobDto } from './dto/job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async create(@Body() createJobDto: JobDto) {
    try {
      return await this.jobService.create(createJobDto);
    } catch (err: any) {
      console.error('ERR', err);
      throw err;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.jobService.findAll();
    } catch (err: any) {
      console.error('ERR', err);
      throw err;
    }
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    try {
      const res = await this.jobService.findById(id);
      if (!res) {
        throw new NotFoundException(`Not found Job: ${id}`);
      }
      return res;
    } catch (err: any) {
      console.error('ERR', err);
      throw err;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateJobDto: JobDto) {
    try {
      const res = await this.jobService.update(id, updateJobDto);
      if (!res) {
        throw new NotFoundException(`Not found Job: ${id}`);
      }
      return res;
    } catch (err: any) {
      console.error('ERR', err);
      throw err;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const res = await this.jobService.delete(id);

      if (!res) {
        throw new NotFoundException(`Not found Job: ${id}`);
      }
      return res;
    } catch (err: any) {
      console.error('ERR', err);
      throw err;
    }
  }
}
