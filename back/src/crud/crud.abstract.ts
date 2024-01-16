// crud.abstract.ts
import { Injectable } from '@nestjs/common';
import { Model, Document, HydratedDocument } from 'mongoose';
import { Data } from 'src/data/data.abstract';

@Injectable()
export abstract class Crud<T extends Document> extends Data<T> {
  constructor(model: Model<T>) {
    super(model);
  }

  async create(entity: Partial<T>): Promise<HydratedDocument<T>> {
    return await super.createData(entity);
  }

  async findAll(): Promise<HydratedDocument<T>[]> {
    return await super.findDataAll();
  }

  async findById(id: string): Promise<HydratedDocument<T> | undefined> {
    return await super.findDataById(id);
  }

  async findByField(
    field: Partial<T>,
  ): Promise<HydratedDocument<T> | undefined> {
    return await super.findDataByField(field);
  }

  async update(
    id: string,
    updateEntity: Partial<T>,
  ): Promise<HydratedDocument<T> | undefined> {
    return await super.updateData(id, updateEntity);
  }

  async set(
    id: string,
    updateEntity: Partial<T>,
  ): Promise<HydratedDocument<T> | undefined> {
    return await super.setData(id, updateEntity);
  }

  async delete(id: string) {
    return await super.deleteData(id);
  }
}
