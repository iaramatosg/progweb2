import { LogIn, UserRound } from "lucide-react";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import autenticacaoServico from "../../servicos/autenticacao";
import "./styles.scss";

const LoginPagina = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const campoVazio = () =>
    toast("Falta preencher campos obrigatórios", {
      type: "error",
    });

  const usuarioSenhaIncorretos = () =>
    toast("Usuário ou senha inválidos!", {
      type: "error",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!usuario || !senha) {
      campoVazio();
      return;
    }

    try {
      const resposta = await autenticacaoServico.login(usuario, senha);
      localStorage.setItem("access_token", resposta.access_token);
      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        usuarioSenhaIncorretos();
      }
    }
  };

  return (
    <div id="login">
      <Card>
        <Card.Body>
          <UserRound size={64} className="mb-4" />

          <Form onSubmit={handleSubmit}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="username"
                placeholder="Digite usuário"
                autoComplete="username"
                onChange={(event) => setUsuario(event.target.value)}
              />
              <label htmlFor="username">Usuário</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id="senha"
                type="password"
                placeholder="Digite senha"
                autoComplete="current-password"
                onChange={(event) => setSenha(event.target.value)}
              />
              <label htmlFor="senha">Senha</label>
            </Form.Floating>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Entrar <LogIn />
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPagina;
