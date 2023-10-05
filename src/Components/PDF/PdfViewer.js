import React from "react";
import { Document, Page } from "react-pdf";

class PDFViewer extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
    pdfUrl: null,
  };

  componentDidMount() {
    // Substitua 'URL_DO_SEU_PDF' pela URL do seu PDF na nuvem
    const pdfUrl =
      "http://konsistfiles.s3.sa-east-1.amazonaws.com/ef1aa6a5106fc4086609202e53bdd337_ASSINADO.pdf";

    fetch(pdfUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Falha ao carregar o PDF da nuvem");
        }
        return response.arrayBuffer();
      })
      .then((data) => {
        const pdfData = new Blob([data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfData);
        this.setState({ pdfUrl });
      })
      .catch((error) => {
        console.error("Erro ao carregar o PDF da nuvem:", error);
      });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () => {
    this.setState((prevState) => ({
      pageNumber: prevState.pageNumber - 1,
    }));
  };

  goToNextPage = () => {
    this.setState((prevState) => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  render() {
    const { pageNumber, numPages, pdfUrl } = this.state;

    return (
      <div>
        <nav>
          <button onClick={this.goToPrevPage} disabled={pageNumber <= 1}>
            Anterior
          </button>
          <button onClick={this.goToNextPage} disabled={pageNumber >= numPages}>
            Próxima
          </button>
        </nav>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {pdfUrl && (
            <Document file={pdfUrl} onLoadSuccess={this.onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          )}
        </div>
      </div>
    );
  }
}

export default PDFViewer;
