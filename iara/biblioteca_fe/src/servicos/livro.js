import Base from "./base";

class LivroServico extends Base {
  pegarLivros() {
    return this.api.get("/livros");
  }

  adicionarLivro(livro) {
    return this.api.post("/livros", livro);
  }

  editarLivro(id, livro) {
    return this.api.put(`/livros/${id}`, livro);
  }

  removerLivro(id) {
    return this.api.delete(`/livros/${id}`);
  }
}

const livroServico = new LivroServico();

export default livroServico;
