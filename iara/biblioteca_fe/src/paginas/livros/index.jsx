import { LogOut, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Livro } from "../../componentes/livro";
import livroServico from "../../servicos/livro";
import { AdicionarLivro } from "./adicionarLivro";
import { EditarLivro } from "./editarLivro";
import "./styles.scss";

const LivrosPagina = () => {
  const [livros, setLivros] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [livroParaEditar, setLivroParaEditar] = useState({});

  const pegarLivros = async () => {
    const resposta = await livroServico.pegarLivros();
    setLivros(resposta.data);
  };

  useEffect(() => {
    pegarLivros();
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  const fechar = () => setMostrar(false);

  const fecharEditar = () => {
    setLivroParaEditar({});
    setMostrarEditar(false);
  };

  const removerLivro = async (id) => {
    try {
      await livroServico.removerLivro(id);
      toast.success("Livro removido com sucesso!");
      pegarLivros();
    } catch (erro) {
      toast.error("Erro ao remover livro!");
    }
  };

  const editarLivro = async (id) => {
    const livro = livros.find((livro) => livro.id === id);

    if (livro) {
      setLivroParaEditar(livro);
      setMostrarEditar(true);
    }
  };

  const cartoesDeLivros = useMemo(() => {
    return livros.map((livro) => (
      <Livro
        key={livro.id}
        {...livro}
        remover={() => removerLivro(livro.id)}
        editar={() => editarLivro(livro.id)}
      />
    ));
  }, [livros]);

  return (
    <div id="livros">
      <div
        id="acao"
        className="mb-4 d-grid gap-2 d-md-flex justify-content-md-end"
      >
        <Button
          variant="primary"
          onClick={() => {
            setMostrar(true);
          }}
        >
          <Plus /> Adicionar Livro
        </Button>
        <Button variant="outline-secondary" onClick={logout}>
          <LogOut /> Sair
        </Button>
      </div>

      <div id="livros-lista">{cartoesDeLivros}</div>

      <AdicionarLivro
        mostrar={mostrar}
        fechar={fechar}
        atualizar={pegarLivros}
      />

      <EditarLivro
        mostrar={mostrarEditar}
        fechar={fecharEditar}
        livro={livroParaEditar}
        atualizar={pegarLivros}
      />
    </div>
  );
};

export default LivrosPagina;
