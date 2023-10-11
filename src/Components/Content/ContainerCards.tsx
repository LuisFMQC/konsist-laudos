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
import { ReactComponent as Refresh } from "../../Assets/refresh.svg";
import { UserContext } from "../../ClinicaContext";
import { useLocation } from "react-router-dom";

interface ContainerCardsProps {
  tipo: string;
  titulo: string;
}

const ContainerCards = ({ tipo, titulo }: ContainerCardsProps) => {
  const location = useLocation();
  const { clinica, clinicas, data, token, getUser, loading } =
    React.useContext(UserContext);
  const resultados = data
    ? data

        .map((resultado: any) => {
          if (clinica?.id === resultado.id_cliente) {
            const regex = /(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
            const dataFormatada = resultado.data.replace(regex, "$3/$2/$1");
            return resultado.tipo === tipo
              ? { ...resultado, data: dataFormatada }
              : null;
          }
        })
        .filter(Boolean)
    : "";

  async function handleRefresh() {
    if (token) getUser(token);
  }

  const escolherImagem = () => {
    if (tipo === "Pedido de Exame") return exame;
    if (tipo === "Receituário") return receita;
    if (tipo === "Relatório Médico") return relatorio;
    if (tipo === "prontuario") return prontuario;
    if (tipo === "Atestado Médico") return atestado;
  };

  const imagem = escolherImagem();

  React.useEffect(() => {
    const element = document.querySelector(".animeLeft") as HTMLElement;
    const element2 = document.querySelector(".animeLeft2") as HTMLElement;
    if (element && element2) {
      element.classList?.remove("animeLeft");
      element2.classList?.remove("animeLeft2");
      void element.offsetWidth;
      void element2.offsetWidth;
      element.classList?.add("animeLeft");
      element2.classList?.add("animeLeft2");
    }
  }, [location.pathname]);

  return (
    <div className={`${styles.containerResultados} animeLeft`}>
      <div className={`${styles.containerTitulo}`}>
        <h1>{titulo}</h1>
        <Refresh
          className={loading ? styles.loading : styles.refresh}
          onClick={handleRefresh}
        />
      </div>
      <span></span>
      <div className={`${styles.containerCards} animeLeft2`}>
        {resultados && resultados.length > 0 ? (
          resultados.map((resultado, index) => (
            <Card
              link={resultado?.link}
              key={index}
              procedimento={resultado?.procedimento}
              tipo={resultado?.tipo}
              aguardando={resultado?.aguardando_resultado}
              img={
                tipo === "resultado"
                  ? resultado?.aguardando_resultado
                    ? imgAguardando
                    : imgResultadoOk
                  : imagem
              }
              data={resultado?.data}
              medico={resultado?.medico}
            />
          ))
        ) : (
          <h1 className={`${styles.frase} animeLeft2`}>
            Nenhum documento deste tipo encontrado para esta clínica
          </h1>
        )}
      </div>
    </div>
  );
};

export default ContainerCards;
