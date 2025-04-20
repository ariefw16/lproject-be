import { Exclude, Expose } from 'class-transformer';
import { ProvinsiEntity } from './provinsi.entity';

@Exclude()
export class KabupatenEntity {
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
  provinsiId: string;

  @Expose()
  provinsi: ProvinsiEntity;
}
