import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Privado = () => {
  const [autorizado, setAutorizado] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    } else {
      setAutorizado(true);
    }
  }, []);

  return <>{autorizado && <Outlet />}</>;
};

export default Privado;
