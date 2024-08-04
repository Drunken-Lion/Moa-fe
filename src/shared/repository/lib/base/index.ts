import type { Entity } from '@/shared/entity/lib/types';
import { injectable } from 'inversify';

import type { IRepository, Res } from './types';
import HttpClient from './client';

@injectable()
export default abstract class Repository<T extends Entity> extends HttpClient implements IRepository<T> {
  protected abstract resource: string;

  get = async (id: number): Res<T> => {
    return await this.httpClient.get<T>(`/${this.resource}/${id}`);
  }

  getMany = async (): Res<T[]> => {
    return await this.httpClient.get<T[]>(`/${this.resource}`);
  }

  create = async (item: Omit<T, 'id'>): Res<T> => {
    return await this.httpClient.post<T>(`/${this.resource}`, item);
  }

  update = async (item: T): Res<T> => {
    const { id, ...data } = item;

    return await this.httpClient.put(`/${this.resource}/${id}`, data);
  }

  delete = async (id: number): Res<void> => {
    return await this.httpClient.delete(`/${this.resource}/${id}`);
  }
}