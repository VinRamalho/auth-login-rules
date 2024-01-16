// data.abstract.ts
import { Injectable } from '@nestjs/common';
import { Model, Document, HydratedDocument } from 'mongoose';

@Injectable()
export abstract class Data<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async createData(entity: Partial<T>): Promise<HydratedDocument<T>> {
    const create = new this.model(entity);
    return await create.save();
  }

  async findDataAll(): Promise<HydratedDocument<T>[]> {
    return await this.model.find().exec();
  }

  async findDataById(id: string): Promise<HydratedDocument<T> | undefined> {
    try {
      const res = await this.model.findById(id).exec();

      return res;
    } catch (err) {
      if (
        err.name === 'CastError' &&
        err.kind === 'ObjectId' &&
        err.path === '_id'
      ) {
        return undefined;
      } else {
        throw err;
      }
    }
  }

  async findDataByField(
    field: Partial<T>,
  ): Promise<HydratedDocument<T> | undefined> {
    const key = Object.keys(field).at(0);

    const query = { [key]: field[key] } as any;

    try {
      const res = await this.model.findOne<T>(query).exec();

      return res as HydratedDocument<T>;
    } catch (err) {
      if (
        err.name === 'CastError' &&
        err.kind === 'ObjectId' &&
        err.path === '_id'
      ) {
        return undefined;
      } else {
        throw err;
      }
    }
  }

  async updateData(
    id: string,
    updateEntity: Partial<T>,
  ): Promise<HydratedDocument<T> | undefined> {
    try {
      const res = await this.model
        .findByIdAndUpdate(id, updateEntity, { new: true })
        .exec();

      return res;
    } catch (err) {
      if (
        err.name === 'CastError' &&
        err.kind === 'ObjectId' &&
        err.path === '_id'
      ) {
        return undefined;
      } else {
        throw err;
      }
    }
  }

  async setData(
    id: string,
    updateEntity: Partial<T>,
  ): Promise<HydratedDocument<T> | undefined> {
    try {
      const res = await this.model
        .findByIdAndUpdate(id, updateEntity, { new: true })
        .exec();

      return res;
    } catch (err) {
      if (
        err.name === 'CastError' &&
        err.kind === 'ObjectId' &&
        err.path === '_id'
      ) {
        return undefined;
      } else {
        throw err;
      }
    }
  }

  async deleteData(id: string) {
    try {
      const res = await this.model.findByIdAndDelete(id).exec();

      return res;
    } catch (err) {
      if (
        err.name === 'CastError' &&
        err.kind === 'ObjectId' &&
        err.path === '_id'
      ) {
        return undefined;
      } else {
        throw err;
      }
    }
  }
}
