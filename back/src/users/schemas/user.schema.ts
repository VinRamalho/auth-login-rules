import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { User } from '../entities/user.entity';

export type UserDocument = HydratedDocument<UserSchema>;

@Schema({ collection: 'users', timestamps: true })
export class UserSchema extends Document implements User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
