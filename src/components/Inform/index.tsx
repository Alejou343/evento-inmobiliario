import React from "react";
import axios from "axios";
import Loader from "@/components/Loader";

interface ComponentProps {
  endpoint: string;
}

const Index: React.FC<ComponentProps> = ({ endpoint }) => {
  const [content, setContent] = React.useState<string>("");
  const [loaderActive, setLoaderActive] = React.useState<boolean>(false);

  const handleResponse = (message: string) => {
    setContent(message);
    setLoaderActive(false);
  };

  const handleResponseFailed = (message: string) => {
    setContent(message);
    setLoaderActive(false);
  };

  React.useEffect(() => {
    setLoaderActive(true);
    try {
      axios
        .get(`${process.env.BACK_LINK}/api/${endpoint}`)
        .then((res) => handleResponse(res.data.answer))
        .catch((err) =>
          handleResponseFailed("Error consultando la información")
        );
    } catch (err) {
      console.error(err);
    }
  }, [endpoint]);

  return (
    <div className="w-full max-w-4xl h-[80vh] border-2 border-secondary mx-auto overflow-y-auto rounded-md my-4 bg-white shadow-lg p-8">
      <Loader active={loaderActive} />
      <div className="report-header mb-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Informe Evento Inmobiliario del Año</h1>
        <p className="text-sm text-gray-600">Fecha: {new Date().toLocaleDateString()}</p>
        <p className="text-sm text-gray-600">Generado por: Pocki AI</p>
      </div>
      <div className="report-content">
        <pre className="whitespace-pre-wrap text-lg leading-relaxed text-justify font-sans">{content}</pre>
      </div>
    </div>
  );
};

export default Index;
