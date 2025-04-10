import { Exclude, Expose } from 'class-transformer';
import { RegionEntity } from './region.entity';

@Exclude()
export class ProvinsiEntity {
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
  regionalId: string;

  @Expose()
  regional: RegionEntity;
}
