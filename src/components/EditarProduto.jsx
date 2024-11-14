import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditarProduto = () => {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', preco: 'R$ 15,00', quantidade: 10, valorTotal: 'R$ 150,00' },
    { id: 2, nome: 'Produto B', descricao: 'Descrição do Produto B', preco: 'R$ 25,00', quantidade: 5, valorTotal: 'R$ 125,00' },
    { id: 3, nome: 'Produto C', descricao: 'Descrição do Produto C', preco: 'R$ 30,00', quantidade: 8, valorTotal: 'R$ 240,00' },
  ]);

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const handleEdit = (produto) => {
    setProdutoSelecionado(produto);
  };

  const formatCurrency = (value) => {
    value = value.replace(/\D/g, '');
    const formattedValue = (value / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formattedValue;
  };

  const calculateTotal = (preco, quantidade) => {
    const numericPreco = parseFloat(preco.replace(/[^\d,-]/g, '').replace(',', '.'));
    const total = numericPreco * quantidade;
    return isNaN(total)
      ? 'R$ 0,00'
      : total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let updatedProduto = { ...produtoSelecionado, [name]: value };

    if (name === 'preco') {
      updatedProduto.preco = formatCurrency(value);
    }

    if (name === 'preco' || name === 'quantidade') {
      updatedProduto.valorTotal = calculateTotal(updatedProduto.preco, updatedProduto.quantidade);
    }

    setProdutoSelecionado(updatedProduto);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const produtosAtualizados = produtos.map((produto) =>
      produto.id === produtoSelecionado.id ? produtoSelecionado : produto
    );
    setProdutos(produtosAtualizados);
    setProdutoSelecionado(null);
  };

  const navigate = useNavigate()

  const handleHome = () => navigate ("/Status_Pedido")

  return (
    <div style={styles.container}>
      <div style={styles.tableContainer}>
        <h2 style={styles.title}>Lista de Produtos</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Produto</th>
              <th style={styles.tableHeader}>Descrição</th>
              <th style={styles.tableHeader}>Valor Unitário</th>
              <th style={styles.tableHeader}>Quantidade</th>
              <th style={styles.tableHeader}>Valor Total</th>
              <th style={styles.tableHeader}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td style={styles.tableCell}>{produto.nome}</td>
                <td style={styles.tableCell}>{produto.descricao}</td>
                <td style={styles.tableCell}>{produto.preco}</td>
                <td style={styles.tableCell}>{produto.quantidade}</td>
                <td style={styles.tableCell}>{produto.valorTotal}</td>
                <td style={styles.tableCell}>
                  <button style={styles.editButton} onClick={() => handleEdit(produto)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {produtoSelecionado && (
        <div style={styles.formContainer}>
          <h2 style={styles.title1}>Editar Produto</h2>
          <form onSubmit={handleSave} style={styles.form}>
            <label style={styles.label}>
              Produto:
              <input
                type="text"
                name="nome"
                value={produtoSelecionado.nome}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            
            <label style={styles.label}>
              Descrição:
              <input
                type="text"
                name="descricao"
                value={produtoSelecionado.descricao}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            
            <label style={styles.label}>
              Valor Unitário:
              <input
                type="text"
                name="preco"
                value={produtoSelecionado.preco}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            
            <label style={styles.label}>
              Quantidade:
              <input
                type="number"
                name="quantidade"
                value={produtoSelecionado.quantidade}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Valor Total:
              <input
                type="text"
                name="valorTotal"
                value={produtoSelecionado.valorTotal}
                readOnly
                style={styles.input}
              />
            </label>

            <button type="submit" style={styles.button}>
              Salvar Alterações
            </button>
          </form>
          
        </div>
      )}
          <button type="button" onClick={handleHome} style={styles.backButton}>
            Voltar
          </button>
    </div>
  );
};

const styles = {
  // ... (manter os estilos existentes)
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#00009c',
    minHeight: '100vh',
  },
  tableContainer: {
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.8em',
    marginBottom: '20px',
  },
  title1: {
    textAlign: 'center',
    color: 'black',
    fontSize: '1.8em',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white'
  },
  tableHeader: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  editButton: {
    backgroundColor: '#2196F3',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '100%',
    maxWidth: '400px',
    marginTop: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    fontSize: '1em',
    color: '#555',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1em',
    marginTop: '5px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#F20DE7',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    marginTop: '10px',
    fontWeight: 'bold',
  },
};

export default EditarProduto;
