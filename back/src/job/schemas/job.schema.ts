import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { Job } from '../entities/job.entity';

export type JobDocument = HydratedDocument<JobSchema>;

@Schema({ collection: 'job', timestamps: true })
export class JobSchema extends Document implements Job {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;
}

export const JobSchemaFactory = SchemaFactory.createForClass(JobSchema);
