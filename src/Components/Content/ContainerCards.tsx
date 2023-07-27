import React from "react";
import styles from "./ContainerCards.module.css";
import Card from "./Card";
import data from "./Data";
import imgResultadoOk from "../../Assets/resultadoCard.svg";
import imgAguardando from "../../Assets/aguardandoResult.svg";
import exame from "../../Assets/exame.svg";
import receita from "../../Assets/receita.svg";
import relatorio from "../../Assets/relatorio.svg";
import prontuario from "../../Assets/prontuario2.svg";
import atestado from "../../Assets/atestado.svg";
import { useClinicaContext } from "../../ClinicaContext";

interface ContainerCardsProps {
  tipo: string;
  titulo: string;
}

const ContainerCards = ({ tipo, titulo }: ContainerCardsProps) => {
  const { clinica } = useClinicaContext();

  const resultados = data
    .map((resultado) => {
      if (clinica === resultado.empresa) {
        const [ano, mes, dia] = resultado.data.split("-");
        const dataFormatada = dia + "/" + mes + "/" + ano;
        console.log(dataFormatada);
        return resultado.tipo === tipo
          ? { ...resultado, data: dataFormatada }
          : null;
      }
    })
    .filter(Boolean);

  const escolherImagem = () => {
    if (tipo === "exame") return exame;
    if (tipo === "receita") return receita;
    if (tipo === "relatorio") return relatorio;
    if (tipo === "prontuario") return prontuario;
    if (tipo === "atestado") return atestado;
  };

  const imagem = escolherImagem();

  return (
    <div className={styles.containerResultados}>
      <h1>{titulo}</h1>
      <span></span>
      <div className={styles.containerCards}>
        {resultados.length > 0 ? (
          resultados.map((resultado, index) => (
            <Card
              link={resultado?.link}
              key={index}
              procedimento={resultado?.procedimento}
              tipo={resultado?.tipo}
              aguardando={resultado?.aguardando}
              img={
                tipo === "resultado"
                  ? resultado?.aguardando
                    ? imgAguardando
                    : imgResultadoOk
                  : imagem
              }
              data={resultado?.data}
              medico={resultado?.medico}
            />
          ))
        ) : (
          <h1 className={styles.frase}>
            Nenhum documento deste tipo encontrado para esta clínica
          </h1>
        )}
      </div>
    </div>
  );
};

export default ContainerCards;
