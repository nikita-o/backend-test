import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Files } from './files.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Files])],
    controllers: [],
    providers: [],
})
export class FilesModule {}
