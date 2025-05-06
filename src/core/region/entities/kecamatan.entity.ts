import { Exclude, Expose } from 'class-transformer';
import { KabupatenEntity } from './kabupaten.entity';

@Exclude()
export class KecamatanEntity {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  deletedAt: Date;

  @Expose()
  kabupatenId: string;

  @Expose()
  kabupaten: KabupatenEntity;
}
