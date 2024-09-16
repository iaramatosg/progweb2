import { Body, Controller, Post } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { LoginDto } from './dto/login.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private autenticacaoService: AutenticacaoService) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.autenticacaoService.login(loginDto.username, loginDto.senha);
  }
}
