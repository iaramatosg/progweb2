import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import livroServico from "../../../servicos/livro";

export const EditarLivro = (props) => {
  const [livro, setLivro] = useState(props.livro);

  const sucesso = () => toast.success("Livro editado com sucesso!");

  const editarLivro = async () => {
    try {
      await livroServico.editarLivro(livro.id, {
        ...livro,
        autor: livro.autor.split(",").map((autor) => autor.trim()),
      });
      sucesso();
      props.atualizar();
      props.fechar();
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(`${error.response.data.message}`);
      }
    }
  };

  useEffect(() => {
    setLivro({ ...props.livro, autor: props.livro.autor?.join(", ") });
  }, [props.livro]);

  return (
    <Modal
      show={props.mostrar}
      onHide={props.fechar}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Livro</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="codigo">
            <Form.Label>Código</Form.Label>
            <Form.Control
              placeholder="Digite o código do livro"
              defaultValue={livro.codigo}
              onChange={(e) => {
                setLivro({
                  ...livro,
                  codigo: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="titulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              placeholder="Digite o título do livro"
              defaultValue={livro.titulo}
              onChange={(e) => {
                setLivro({
                  ...livro,
                  titulo: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="autor">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              placeholder="Digite o autor do livro"
              defaultValue={livro.autor}
              onChange={(e) => {
                setLivro({
                  ...livro,
                  autor: e.target.value,
                });
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.fechar}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={editarLivro}>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
