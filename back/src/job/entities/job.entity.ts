import { IsNotEmpty } from 'class-validator';

export class Job {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  price: number;
}
