import { FilesController } from './files.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Files } from './files.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Files])
    ],
    controllers: [
        FilesController, ],
    providers: [],
})
export class FilesModule {}
