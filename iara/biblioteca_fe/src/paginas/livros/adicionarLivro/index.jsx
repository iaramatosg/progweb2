import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import livroServico from "../../../servicos/livro";

export const AdicionarLivro = (props) => {
  const [livro, setLivro] = useState({
    codigo: "",
    titulo: "",
    autor: "",
  });

  const sucesso = () => toast.success("Livro adicionado com sucesso!");

  const adicionarLivro = async () => {
    try {
      await livroServico.adicionarLivro({
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

  return (
    <Modal
      show={props.mostrar}
      onHide={props.fechar}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionando Livro</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="codigo">
            <Form.Label>Código</Form.Label>
            <Form.Control
              placeholder="Digite o código do livro"
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
        <Button variant="primary" onClick={adicionarLivro}>
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
