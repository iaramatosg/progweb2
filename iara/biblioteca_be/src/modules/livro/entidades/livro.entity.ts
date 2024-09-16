import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('livro')
export class LivroEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column()
  titulo: string;

  @Column('simple-array')
  autor: string[];
}
