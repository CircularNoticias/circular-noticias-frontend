import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [categoria, setCategoria] = useState("todas");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    buscarNoticias();
  }, []);

  const buscarNoticias = async () => {
    try {
      const response = await axios.get("https://circular-noticias-backend.onrender.com/noticias");
      setNoticias(response.data);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
    }
  };

  const filtrarNoticias = () => {
    return noticias.filter((noticia) => {
      const atendeCategoria = categoria === "todas" || noticia.categoria?.toLowerCase() === categoria;
      const atendeBusca = noticia.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                          noticia.resumo?.toLowerCase().includes(busca.toLowerCase());
      return atendeCategoria && atendeBusca;
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <header className="bg-blue-700 text-white p-4 rounded-2xl shadow mb-4">
        <h1 className="text-xl font-bold">Circular Notícia</h1>
        <p className="text-sm">Agregador de Notícias do Rio de Janeiro e Brasil</p>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
          <input
            type="text"
            placeholder="Buscar notícias..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 p-2 rounded text-black"
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="p-2 rounded text-black"
          >
            <option value="todas">Últimas Notícias</option>
            <option value="política">Política</option>
            <option value="segurança">Segurança</option>
            <option value="economia">Economia</option>
            <option value="ciência">Ciência</option>
            <option value="cultura">Cultura</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="comércio">Comércio</option>
            <option value="esporte">Esporte</option>
            <option value="entretenimento">Entretenimento</option>
          </select>
          <button
            onClick={buscarNoticias}
            className="bg-white text-blue-700 px-4 py-2 rounded font-semibold hover:bg-gray-100"
          >
            Atualizar
          </button>
        </div>
        <p className="text-xs text-gray-200 mt-2">Rio de Janeiro, Brasil</p>
      </header>

      <main>
        {filtrarNoticias().map((noticia, index) => (
          <div key={index} className="bg-white p-4 mb-4 rounded-2xl shadow">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="bg-gray-100 px-2 py-0.5 rounded text-blue-700 font-medium">
                {noticia.categoria?.charAt(0).toUpperCase() + noticia.categoria?.slice(1)}
              </span>
              <span className="text-gray-500">{noticia.data_hora}</span>
            </div>
            <h2 className="text-lg font-semibold text-black">{noticia.titulo}</h2>
            <p className="text-gray-800 text-sm mt-1">{noticia.resumo}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-blue-700 font-medium">{noticia.fonte}</span>
              <a href={noticia.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium">
                Ler mais
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
