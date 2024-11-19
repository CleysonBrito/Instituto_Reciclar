import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCFXaeQ2L8zq0ZYTsydGek2K5pEZ_-BqPw",
  authDomain: "bancoestoquecozinha.firebaseapp.com",
  databaseURL: "https://bancoestoquecozinha-default-rtdb.firebaseio.com",
  projectId: "bancoestoquecozinha",
  storageBucket: "bancoestoquecozinha.firebasestorage.app",
  messagingSenderId: "71775149511",
  appId: "1:71775149511:web:bb2ce1a1872c65d1668de2"
};

// Inicializar o Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Referência ao banco de dados
const dbProdutos = firebase.database().ref("Pedidos");

const Pedido = () => {
  const [formData, setFormData] = useState({
    sku: "",
    fornecedor: "",
    marca: "",
    produto: "",
    quantidade: "",
    categoria: "proteina", // Definindo a categoria como 'proteina' por padrão
    observacoes: "",
  });
  const [pedidos, setPedidos] = useState([]);

  // Função para buscar dados do Firebase
  const fetchPedidos = () => {
    dbProdutos.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setPedidos(lista);
      } else {
        setPedidos([]);
      }
    });
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar os dados para o Firebase
    dbProdutos.push(formData)
      .then(() => {
        alert("Pedido realizado com sucesso!");
        setFormData({
          sku: "",
          fornecedor: "",
          marca: "",
          produto: "",
          quantidade: "",
          categoria: "proteina",
          observacoes: "",
        });
      })
      .catch((error) => {
        console.error("Erro ao fazer pedido:", error);
        alert("Erro ao realizar pedido. Tente novamente.");
      });
  };

  // Função para excluir um pedido
  const handleDelete = (id) => {
    if (window.confirm("Você tem certeza que deseja excluir este pedido?")) {
      dbProdutos.child(id)
        .remove()
        .then(() => {
          alert("Pedido excluído com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao excluir pedido:", error);
          alert("Erro ao excluir pedido. Tente novamente.");
        });
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>SKU:</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Fornecedor:</label>
          <input
            type="text"
            name="fornecedor"
            value={formData.fornecedor}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Marca:</label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Produto:</label>
          <input
            type="text"
            name="produto"
            value={formData.produto}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Quantidade:</label>
          <input
            type="number"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Categoria:</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="proteina">Proteína</option>
            <option value="mantimento">Mantimento</option>
            <option value="hortalicas">Hortaliças</option>
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Observações:</label>
          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Enviar Pedido
        </button>
      </form>

      <h3 style={{ marginTop: "30px" }}>Pedidos Realizados</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Produto</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Fornecedor</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Marca</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Quantidade</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Categoria</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {pedido.produto}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {pedido.fornecedor}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {pedido.marca}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {pedido.quantidade}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {pedido.categoria}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() => handleDelete(pedido.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#FF5733",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pedido;
