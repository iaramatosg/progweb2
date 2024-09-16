import Base from "./base";

class AutenticacaoServico extends Base {
  login = async (username, senha) => {
    const resposta = await this.api.post("/autenticacao", {
      username,
      senha,
    });
    return resposta.data;
  };
}

const autenticacaoServico = new AutenticacaoServico();

export default autenticacaoServico;
