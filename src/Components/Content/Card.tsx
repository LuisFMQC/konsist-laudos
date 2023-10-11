import React from "react";
import styles from "./Card.module.css";
import { transform } from "typescript";
import { useLocation } from "react-router-dom";

interface Card {
  aguardando: boolean | undefined;
  img: string | undefined;
  procedimento: string | undefined;
  data: string | undefined;
  medico: string | undefined;
  tipo: string | undefined;
  link: string | undefined;
}

const Card = ({
  aguardando,
  img,
  procedimento,
  data,
  medico,
  tipo,
  link,
}: Card) => {
  const location = useLocation();
  const [isHovering, setIsHovering] = React.useState(false);
  // Função de manipulador de evento para o onMouseOver
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  // Função de manipulador de evento para o onMouseOut
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  // Estilo baseado no estado de isHovering
  const estiloDoElemento = {
    background: aguardando ? "#ededed" : "#dedede",
    cursor: aguardando ? "default" : "pointer",
    transform: aguardando ? "none" : "",
  };

  React.useEffect(() => {
    const element = document.querySelector(".animeLeft2") as HTMLElement;
    if (element) {
      element.classList?.remove("animeLeft2");
      void element.offsetWidth;
      element.classList?.add("animeLeft2");
    }
  }, [location.pathname]);

  return (
    <>
      {aguardando ? (
        <div
          className={`${styles.containerCard}`}
          style={estiloDoElemento}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div className={styles.logoCard}>
            <img src={img} alt={`ícone do status do ${tipo}`} />
            {aguardando && <p>Aguardando Resultado</p>}
          </div>
          <div className={styles.infosCard}>
            <p>{procedimento}</p>
            <p>{data}</p>
            <p>{medico}</p>
          </div>
        </div>
      ) : (
        <a href={link}>
          <div className={styles.containerCard}>
            <div className={styles.logoCard}>
              <img src={img} alt={`ícone do status do ${tipo}`} />
              {aguardando && <p>Aguardando Resultado</p>}
            </div>
            <div className={styles.infosCard}>
              <p>{procedimento}</p>
              <p>{data}</p>
              <p>{medico}</p>
            </div>
          </div>
        </a>
      )}
    </>
  );
};

export default Card;
