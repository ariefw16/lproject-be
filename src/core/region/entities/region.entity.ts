import { Exclude, Expose } from 'class-transformer';
import { ProvinsiEntity } from './provinsi.entity';

@Exclude()
export class RegionEntity {
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
  Provinsi: ProvinsiEntity[];
}
