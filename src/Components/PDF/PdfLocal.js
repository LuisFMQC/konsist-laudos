import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDFViewerLoc extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
  };

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
    const { pageNumber, numPages } = this.state;

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
          <Document
            file="/01_nbsb_tarifas_energia_eletrica_GrupoA_nov_2022_reh3134.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    );
  }
}

export default PDFViewerLoc;
