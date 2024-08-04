import type { AxiosResponse } from 'axios';

export type Res<T> = Promise<AxiosResponse<T>>;

export interface IRepository<T> {
  get: (id: number) => Res<T>;
  getMany: () => Res<T[]>;
  create: (item: Omit<T, 'id'>) => Res<T>;
  update: (item: T) => Res<T>;
  delete: (id: number) => Res<void>;
}