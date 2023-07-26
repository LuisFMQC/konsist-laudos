import React from "react";
import styles from "./Card.module.css";

interface Card {
  aguardando: boolean | undefined;
  img: string | undefined;
  procedimento: string | undefined;
  data: string | undefined;
  medico: string | undefined;
  tipo: string | undefined;
}

const Card = ({ aguardando, img, procedimento, data, medico, tipo }: Card) => {
  return (
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
  );
};

export default Card;
