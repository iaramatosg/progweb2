import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacaoService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, senha: string) {
    if (username !== 'aluno' || senha !== 'password') {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const payload = { sub: username, username: username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
