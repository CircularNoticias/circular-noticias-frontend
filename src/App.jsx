import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    buscarNoticias();
  }, []);

  const buscarNoticias = async () => {
    try {
      const res = await axios.get("https://circular-noticias-backend.onrender.com/noticias");
      setNoticias(res.data);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {/* TOPO: CANVA EMBUTIDO */}
      <div className="w-full max-w-screen-lg mx-auto mt-4">
        <div className="aspect-video rounded-lg shadow overflow-hidden">
          <iframe
            loading="lazy"
            className="w-full h-full border-0"
            src="https://www.canva.com/design/DAGnNbjDxiM/EMUdUGijT-AvT-ga9kbwjw/view?embed"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* NOTÍCIAS DINÂMICAS */}
      <div className="max-w-screen-md mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-4">Notícias Atualizadas</h2>
        {noticias.map((noticia, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-semibold">{noticia.titulo}</h3>
            <p className="text-sm mt-1">{noticia.resumo}</p>
            <div className="mt-2 flex justify-between text-sm text-gray-600">
              <span>{noticia.fonte || "Fonte desconhecida"}</span>
              <span>{noticia.data_hora || "Horário"}</span>
            </div>
            <a
              href={noticia.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm font-medium mt-2 inline-block"
            >
              Ler mais
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
