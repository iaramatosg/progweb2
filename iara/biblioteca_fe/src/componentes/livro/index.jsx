import { Captions, IdCard, Pencil, Trash2, UsersRound } from "lucide-react";
import { Button, Card } from "react-bootstrap";

export const Livro = (props) => {
  const autores = props.autor.join(", ");

  return (
    <Card border="primary" style={{ width: "18rem" }}>
      <Card.Header>
        <IdCard /> {props.codigo}
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <Captions /> {props.titulo}
        </Card.Title>
        <Card.Text>
          <UsersRound /> {autores}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button variant="outline-warning" size="sm" onClick={props.editar}>
            <Pencil />
          </Button>
          <Button variant="outline-danger" size="sm" onClick={props.remover}>
            <Trash2 />
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};
