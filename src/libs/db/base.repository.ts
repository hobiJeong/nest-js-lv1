import { AggregateID } from '@libs/ddd/entity.base';
import { ConflictException } from '@libs/exceptions/exceptions';
import { ExtendedModel, ModelNames } from '@libs/types/model.type';
import { ObjectLiteral } from '@libs/types/object-literal.type';
import { EventBus } from '@nestjs/cqrs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AggregateRoot } from '@src/libs/ddd/aggregate-root.base';
import { Mapper } from '@src/libs/ddd/mapper.interface';
import { RepositoryPort } from '@src/libs/ddd/repository.port';

export abstract class BaseRepository<
  Aggregate extends AggregateRoot<any>,
  DbModel extends ObjectLiteral & { id: AggregateID },
> implements RepositoryPort<Aggregate>
{
  // protected abstract schema: ZodObject<any>;

  protected constructor(
    protected readonly model: ExtendedModel<ModelNames>,
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly eventBus: EventBus,
  ) {}

  async findOneById(id: bigint): Promise<Aggregate | undefined> {
    const record = await this.model.findUnique({ where: { id } });

    return record ? this.mapper.toEntity(record) : undefined;
  }

  async findAll(): Promise<Aggregate[]> {
    const record = await this.model.findMany();

    return record.map(this.mapper.toEntity);
  }

  async delete(entity: Aggregate): Promise<AggregateID> {
    entity.validate();

    const result = await this.model.delete({ where: { id: entity.id } });

    await entity.publishEvents(this.eventBus);

    return result.id;
  }

  async insert(entity: Aggregate | Aggregate[]): Promise<void> {
    const entities = Array.isArray(entity) ? entity : [entity];

    const records = entities.map(this.mapper.toPersistence);

    try {
      await this.model.createMany({
        data: records.map((record) => record),
      });

      await Promise.all(
        entities.map(
          async (entity) => await entity.publishEvents(this.eventBus),
        ),
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error);

        throw new ConflictException('Record already exists', error);
      }
      throw error;
    }
  }
}
