import { useRoutes } from "react-router-dom";
import LivrosPagina from "../paginas/livros";
import LoginPagina from "../paginas/login";
import Privado from "./privado";

const Rotas = () => {
  return useRoutes([
    {
      path: "",
      element: <Privado />,
      children: [
        {
          path: "",
          element: <LivrosPagina />,
        },
      ],
    },
    {
      path: "login",
      element: <LoginPagina />,
    },
  ]);
};

export default Rotas;
