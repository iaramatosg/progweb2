import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarLivroDto } from './dto/criar-livro.dto';
import { LivroEntity } from './entidades/livro.entity';

@Injectable()
export class LivroService {
  constructor(
    @InjectRepository(LivroEntity)
    private livroRepository: Repository<LivroEntity>,
  ) {}

  async pegarLivroPorId(id: number) {
    const encontrado = await this.livroRepository.findOneBy({ id });

    if (!encontrado) {
      throw new NotFoundException('Livro não encontrado');
    }

    return encontrado;
  }

  pegarLivro(codigo: string) {
    return this.livroRepository.findOne({ where: { codigo } });
  }

  criarLivro(criarLivroDto: CriarLivroDto) {
    const livro = this.livroRepository.create(criarLivroDto);
    return this.livroRepository.save(livro);
  }

  async atualizarLivro(id: number, criarLivroDto: CriarLivroDto) {
    const livro = await this.pegarLivroPorId(id);
    return await this.livroRepository.save({ ...livro, ...criarLivroDto });
  }

  listarLivros() {
    return this.livroRepository.find();
  }

  async removerLivro(id: number) {
    const livro = await this.pegarLivroPorId(id);
    return await this.livroRepository.remove(livro);
  }
}
