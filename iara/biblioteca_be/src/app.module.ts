import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';
import { LivroModule } from './modules/livro/livro.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    AutenticacaoModule,
    LivroModule,
  ],
})
export class AppModule {}
