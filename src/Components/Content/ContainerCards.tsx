import React from "react";
import styles from "./ContainerCards.module.css";
import Card from "./Card";
import imgResultadoOk from "../../Assets/resultadoCard.svg";
import imgAguardando from "../../Assets/aguardandoResult.svg";
import exame from "../../Assets/exame.svg";
import receita from "../../Assets/receita.svg";
import relatorio from "../../Assets/relatorio.svg";
import prontuario from "../../Assets/prontuario2.svg";
import atestado from "../../Assets/atestado.svg";
import { UserContext } from "../../ClinicaContext";

interface ContainerCardsProps {
  tipo: string;
  titulo: string;
}

const ContainerCards = ({ tipo, titulo }: ContainerCardsProps) => {
  const { clinica, clinicas, data } = React.useContext(UserContext);
  console.log(data);
  const resultados = data

    .map((resultado: any) => {
      if (clinica?.id === resultado.id_cliente) {
        const [ano, mes, dia] = resultado.data.split("-");
        const dataFormatada = dia + "/" + mes + "/" + ano;
        console.log(dataFormatada);
        return resultado.tipo === tipo
          ? { ...resultado, data: dataFormatada }
          : null;
      }
    })
    .filter(Boolean);
  console.log(resultados);

  const escolherImagem = () => {
    if (tipo === "exame") return exame;
    if (tipo === "Receituario") return receita;
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
