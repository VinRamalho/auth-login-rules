import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema, JobSchemaFactory } from './schemas/job.schema';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobSchema.name, schema: JobSchemaFactory },
    ]),
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobsModule {}
