import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobSchema } from './schemas/job.schema';
import { Crud } from 'src/crud/crud.abstract';

@Injectable()
export class JobService extends Crud<JobSchema> {
  constructor(
    @InjectModel(JobSchema.name)
    private readonly jobService: Model<JobSchema>,
  ) {
    super(jobService);
  }
}
