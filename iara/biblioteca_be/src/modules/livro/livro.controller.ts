import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CriarLivroDto } from './dto/criar-livro.dto';
import { LivroService } from './livro.service';

@Controller('livros')
export class LivroController {
  constructor(private livroService: LivroService) {}

  @UseGuards(AuthGuard)
  @Post()
  criarLivro(@Body() criarLivroDto: CriarLivroDto) {
    return this.livroService.criarLivro(criarLivroDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  atualizarLivro(
    @Param('id') id: number,
    @Body() criarLivroDto: CriarLivroDto,
  ) {
    return this.livroService.atualizarLivro(id, criarLivroDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  listarLivros() {
    return this.livroService.listarLivros();
  }

  @UseGuards(AuthGuard)
  @Get(':codigo')
  pegarLivro(@Param('codigo') codigo: string) {
    return this.livroService.pegarLivro(codigo);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  removerLivro(@Param('id') id: number) {
    return this.livroService.removerLivro(id);
  }
}
