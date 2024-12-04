import { useEffect, useState } from "react";
import api from "../../services/api";

function ListarUsuarios() {
  const [allUsers, setAllUsers] = useState([]); // Inicialize como array vazio
  const [error, setError] = useState(null); // Gerencia erros
  const [loading, setLoading] = useState(true); // Gerencia estado de carregamento

  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/listar-usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllUsers(response.data.users || []); // Atualiza os usuários
        setError(null); // Limpa mensagens de erro anteriores
      } catch (err) {
        console.error("Erro ao carregar usuários:", err.response || err.message);
        setError(
          err.response?.data?.message ||
            "Ocorreu um erro ao carregar os usuários. Tente novamente."
        );
      } finally {
        setLoading(false); // Sempre encerra o carregamento
      }
    }

    loadUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Lista de Usuários
      </h2>

      {loading && <p className="text-center text-gray-500">Carregando...</p>}

      {error && (
        <p className="text-center text-red-500">
          {error}
        </p>
      )}

      {!loading && !error && (
        <ul className="space-y-2">
          {allUsers.length > 0 ? (
            allUsers.map((user) => (
              <li key={user.id} className="bg-gray-100 p-4 rounded-md">
                <p className="font-semibold">ID: {user.id}</p>
                <p className="font-semibold">NOME: {user.name}</p>
                <p className="font-semibold">EMAIL: {user.email}</p>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Nenhum usuário encontrado.
            </p>
          )}
        </ul>
      )}
    </div>
  );
}

export default ListarUsuarios;
