import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@Injectable()
export class SyncService {
  async syncArray<Entity extends ObjectLiteral, Raw>(
    repo: Repository<Entity>,
    items: Raw[],
    mapExternalId: (raw: Raw) => string,
    mapToEntity: (entity: Entity, raw: Raw) => void,
  ) {
    for (const raw of items) {
      const externalId = mapExternalId(raw);

      const where: any = { externalId };

      let entity = await repo.findOne({ where });

      if (!entity) {
        entity = repo.create() as Entity;
        (entity as any).externalId = externalId;
      }

      mapToEntity(entity, raw);

      await repo.save(entity);
    }
  }
}
