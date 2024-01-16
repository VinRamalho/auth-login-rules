import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crud } from 'src/crud/crud.abstract';
import { UserSchema } from './schemas/user.schema';

@Injectable()
export class UserService extends Crud<UserSchema> {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
  ) {
    super(userModel);
  }

  async findByEmail(email: string) {
    const res = await super.findByField({ email });

    return res;
  }
}
