import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class workDBService<entity> {
  constructor(
      private repository: Repository<entity>,
    ) {}
  
  async findAll(): Promise<entity[]> {
      return await this.repository.find();
    }
  
  async FindById(id: number): Promise<entity | undefined> {
    return await this.repository.findOne(id);
  }

  async add(obj: entity): Promise<void | entity> {
    return await this.repository.save(obj);
  }

  async update(id: number, obj: entity): Promise<void> {
    await this.repository.update(id, obj);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}