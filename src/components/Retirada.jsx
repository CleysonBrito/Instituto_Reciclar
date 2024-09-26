// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// // Dados fictícios para exemplificação
// const produtosData = [
//   { SKU: '1234', nome: 'Coxa de Frango', fornecedor: 'Mais Brasil', qtdeEstoque: 100, tipo: 'AVE', dataCadastro: '2024-02-01', dataVencimento: '2024-06-03' },
//   { SKU: '1234', nome: 'Coxa de Frango', fornecedor: 'Mais Brasil', qtdeEstoque: 100, tipo: 'AVE', dataCadastro: '2024-02-01', dataVencimento: '2024-06-03' },
//   { SKU: '4567', nome: 'Coxão Mole', fornecedor: 'Friboi', qtdeEstoque: 50, tipo: 'BOVINO', dataCadastro: '2023-06-01', dataVencimento: '2024-06-01' },
//   // Adicione mais produtos conforme necessário
// ];

// const RetiradaProdutos = () => {
//   const [nomeOuSKU, setNomeOuSKU] = useState('');
//   const [data, setData] = useState('');
//   const [produtos, setProdutos] = useState([]);
//   const [produtoSelecionado, setProdutoSelecionado] = useState(null);
//   const [retirante, setRetirante] = useState('');
//   const [quantidadeRetirada, setQuantidadeRetirada] = useState('');
//   const [mensagem, setMensagem] = useState('');

//   const handleConsulta = () => {
//     const resultado = produtosData.filter(produto =>
//       (produto.nome.toLowerCase().includes(nomeOuSKU.toLowerCase()) || produto.SKU.includes(nomeOuSKU)) &&
//       (!data || produto.dataCadastro === data)
//     );
//     setProdutos(resultado);
//   };

//   const handleSelecionarProduto = (produto) => {
//     setProdutoSelecionado(produto);
//   };

//   const handleRetirarProduto = () => {
//     if (!produtoSelecionado || !retirante || !quantidadeRetirada) {
//       setMensagem('Por favor, preencha todos os campos obrigatórios.');
//       return;
//     }

//     const quantidade = parseInt(quantidadeRetirada, 10);
//     if (quantidade <= 0 || quantidade > produtoSelecionado.qtdeEstoque) {
//       setMensagem('Quantidade inválida ou maior que o estoque disponível.');
//       return;
//     }

//     const produtoAtualizado = { ...produtoSelecionado, qtdeEstoque: produtoSelecionado.qtdeEstoque - quantidade };
//     setProdutos(produtos.map(produto =>
//       produto.SKU === produtoSelecionado.SKU ? produtoAtualizado : produto
//     ));

//     setMensagem(`Produto ${produtoSelecionado.nome} retirado por ${retirante}. Quantidade retirada: ${quantidade}. Estoque restante: ${produtoAtualizado.qtdeEstoque}.`);

//     // Limpar o formulário
//     setProdutoSelecionado(null);
//     setRetirante('');
//     setQuantidadeRetirada('');
//   };

//   // Função para salvar a retirada e permitir uma nova consulta
//   const handleSalvar = () => {
//     setMensagem('');
//     setNomeOuSKU('');
//     setData('');
//     setProdutos([]);
//     setProdutoSelecionado(null);
//     setRetirante('');
//     setQuantidadeRetirada('');
//   };

//   return (
//     <div style={{ background: '#00009c', height: "100vh", overflow: "auto", color: "black", fontFamily: "Arial, sans-serif" }}>
//       <h1 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: "bold", margin: "20px 0", color:"white"}}>Retirada de Produtos</h1>

//       <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "20px", background: "white", borderRadius: "12px" }}>
//         <div style={{ marginBottom: '20px', textAlign: "center" }}>
//           <label style={{ marginRight: '20px' }}>
//             Nome ou SKU:
//             <input
//               type="text"
//               value={nomeOuSKU}
//               onChange={(e) => setNomeOuSKU(e.target.value)}
//               style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//             />
//           </label>
//           <label style={{ marginRight: '20px' }}>
//             Data:
//             <input
//               type="date"
//               value={data}
//               onChange={(e) => setData(e.target.value)}
//               style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//             />
//           </label>
//           <button
//             onClick={handleConsulta}
//             style={{ padding: "10px 20px", border: "none", background: "#F20DE7", color: "#fff", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.3s ease" }}
//           >
//             Consultar
//           </button>
//         </div>

//         {produtos.length > 0 && (
//           <div>
//             <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>Produtos Encontrados</h2>
//             <table border="3 black"  style={{ marginTop: "5vh", width: '100%', color: "black", borderCollapse: "collapse", textAlign: "center"}}>    
//               <thead>
//                 <tr>
//                   <th>SKU</th>
//                   <th>Nome</th>
//                   <th>Fornecedor</th>
//                   <th>Qtde no Estoque</th>
//                   <th>Qtde Cadastrada</th>
//                   <th>Qtde Utilizada</th>
//                   <th>Tipo</th>
//                   <th>Data Cadastro</th>
//                   <th>Data Vencimento</th>
//                   <th>Selecionar</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {produtos.map((produto) => (
//                   <tr key={produto.SKU}>
//                     <td>{produto.SKU}</td>
//                     <td>{produto.nome}</td>
//                     <td>{produto.fornecedor}</td>
//                     <td>{produto.qtdeEstoque}</td>
//                     <td>-</td>
//                     <td>-</td>
//                     <td>{produto.tipo}</td>
//                     <td>{produto.dataCadastro}</td>
//                     <td>{produto.dataVencimento}</td>
//                     <td>
//                       <button
//                         onClick={() => handleSelecionarProduto(produto)}
//                         style={{ padding: "5px 10px", border: "none", background: "#28a745", color: "#fff", borderRadius: "4px", cursor: "pointer" }}
//                       >
//                         Selecionar
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {produtoSelecionado && (
//               <div style={{ marginTop: '20px', textAlign: "center" }}>
//                 <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>Retirar Produto</h2>
//                 <label>
//                   Nome do Retirante:
//                   <input
//                     type="text"
//                     value={retirante}
//                     onChange={(e) => setRetirante(e.target.value)}
//                     style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//                   />
//                 </label>
//                 <label style={{ marginLeft: '20px' }}>
//                   Quantidade:
//                   <input
//                     type="number"
//                     value={quantidadeRetirada}
//                     onChange={(e) => setQuantidadeRetirada(e.target.value)}
//                     style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//                   />
//                 </label>
//                 <button
//                   onClick={handleRetirarProduto}
//                   style={{ marginLeft: '20px', padding: "10px 20px", border: "none", background: "#dc3545", color: "#fff", borderRadius: "4px", cursor: "pointer" }}
//                 >
//                   Retirar
//                 </button>
//                 <button
//                   onClick={handleSalvar}
//                   style={{ marginLeft: '20px', padding: "10px 20px", border: "none", background: "#007bff", color: "#fff", borderRadius: "4px", cursor: "pointer" }}
//                 >
//                   Salvar
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {mensagem && (
//           <div style={{ marginTop: '20px', color: 'red', textAlign: 'center' }}>
//             <p>{mensagem}</p>
//           </div>
//         )}
//       </div>
//       <Link to={'/'}>
//       <button type="button" id="return"  style={{ position: "absolute", top: "18vh", background: "none", border: "none", right:"42vh" }}>
//           <img src="/return.svg" alt="Voltar" style={{ width: "50px", height: "50px" }} />
//         </button>
//         </Link>
//     </div>
//   );
// };

// export default RetiradaProdutos;

import { useState, useEffect } from 'react';

const produtosData = [
  { SKU: '1234', nome: 'Coxa de Frango', qtdeEstoque: 100, tipo: 'proteina', dataCadastro: '2023-06-01' },
  { SKU: '5678', nome: 'Alface', qtdeEstoque: 50, tipo: 'hortaliças', dataCadastro: '2023-06-01' },
  // Adicione mais produtos conforme necessário
];

const RetiradaProdutos = () => {
  const [nomeOuSKU, setNomeOuSKU] = useState('');
  const [data, setData] = useState('');
  const [tipoProduto, setTipoProduto] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [retirante, setRetirante] = useState('');
  const [quantidadeRetirada, setQuantidadeRetirada] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Verificar se o navegador suporta o BarcodeDetector
    if ('BarcodeDetector' in window) {
      const barcodeDetector = new window.BarcodeDetector({ formats: ['ean_13', 'ean_8', 'code_128'] });

      const startScanner = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          const video = document.querySelector('#videoScanner');
          video.srcObject = stream;
          video.play();

          const scan = () => {
            barcodeDetector.detect(video)
              .then(barcodes => {
                if (barcodes.length > 0) {
                  // Pegar o primeiro código de barras detectado
                  setNomeOuSKU(barcodes[0].rawValue);
                  handleConsulta(barcodes[0].rawValue); // Faz a consulta automaticamente
                }
              })
              .catch(err => {
                console.error('Erro ao detectar o código de barras: ', err);
              });

            requestAnimationFrame(scan);
          };

          scan();
        } catch (err) {
          console.error('Erro ao acessar a câmera: ', err);
        }
      };

      if (isScanning) {
        startScanner();
      }
    } else {
      console.error('BarcodeDetector não é suportado neste navegador.');
    }
  }, [isScanning]);

  const handleConsulta = (sku) => {
    const resultado = produtosData.filter((produto) => {
      const nomeOuSkuMatch = produto.SKU.includes(sku || nomeOuSKU) || produto.nome.toLowerCase().includes(nomeOuSKU.toLowerCase());
      const tipoMatch = tipoProduto ? produto.tipo === tipoProduto : true;
      const dataMatch = data ? produto.dataCadastro === data : true;
      return nomeOuSkuMatch && tipoMatch && dataMatch;
    });
    setProdutos(resultado);
  };

  const handleSelecionarProduto = (produto) => {
    setProdutoSelecionado(produto);
  };

  const handleRetirarProduto = () => {
    if (!produtoSelecionado || !retirante || !quantidadeRetirada) {
      setMensagem('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const quantidade = parseInt(quantidadeRetirada, 10);
    if (quantidade <= 0 || quantidade > produtoSelecionado.qtdeEstoque) {
      setMensagem('Quantidade inválida ou maior que o estoque disponível.');
      return;
    }

    const produtoAtualizado = {
      ...produtoSelecionado,
      qtdeEstoque: produtoSelecionado.qtdeEstoque - quantidade,
    };
    setProdutos(
      produtos.map((produto) =>
        produto.SKU === produtoSelecionado.SKU ? produtoAtualizado : produto
      )
    );

    setMensagem(
      `Produto ${produtoSelecionado.nome} retirado por ${retirante}. Quantidade retirada: ${quantidade}. Estoque restante: ${produtoAtualizado.qtdeEstoque}.`
    );

    // Limpar o formulário
    setProdutoSelecionado(null);
    setRetirante('');
    setQuantidadeRetirada('');
  };

  const isConsultaDisabled = !nomeOuSKU || !data || !tipoProduto;

  return (
    <div style={{ background: '#00009c', height: '100vh', color: 'black', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0', color: 'white' }}>Retirada de Produtos</h1>

      <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', padding: '20px', borderRadius: '8px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '20px' }}>
            Nome ou SKU:
            <input
              type="text"
              value={nomeOuSKU}
              onChange={(e) => setNomeOuSKU(e.target.value)}
              style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </label>

          <label style={{ marginRight: '20px' }}>
            Data:
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </label>

          <label style={{ marginRight: '20px' }}>
            Tipo de Produto:
            <select
              value={tipoProduto}
              onChange={(e) => setTipoProduto(e.target.value)}
              style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Selecione</option>
              <option value="proteina">Proteína</option>
              <option value="mantimento">Mantimento</option>
              <option value="hortaliças">Hortaliças</option>
              <option value="doações">Doações</option>
            </select>
          </label>

          <button
            onClick={() => handleConsulta(nomeOuSKU)}
            disabled={isConsultaDisabled}
            style={{
              padding: '10px 20px',
              background: isConsultaDisabled ? '#ccc' : '#F20DE7',
              color: '#fff',
              borderRadius: '4px',
              cursor: isConsultaDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            Consultar
          </button>

          <button
            onClick={() => setIsScanning(!isScanning)}
            style={{
              padding: '10px 20px',
              background: '#28a745',
              color: '#fff',
              borderRadius: '4px',
              marginLeft: '20px',
              cursor: 'pointer',
            }}
          >
            {isScanning ? 'Parar Scanner' : 'Iniciar Scanner'}
          </button>
        </div>

        <video id="videoScanner" style={{ width: '20%', display: isScanning ? 'block' : 'none' }}></video>
              <br /><br />
        {produtos.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Estoque</th>
                <th>Selecionar</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.SKU}>
                  <td>{produto.SKU}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.tipo}</td>
                  <td>{produto.qtdeEstoque}</td>
                  <td>
                    <button
                      onClick={() => handleSelecionarProduto(produto)}
                      style={{ padding: '5px 10px', background: '#28a745', color: '#fff', borderRadius: '4px' }}
                    >
                      Selecionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {produtoSelecionado && (
          <div>
            <h2>Retirar Produto</h2>
            <div>
              <label>
                Nome do Retirante:
                <input
                  type="text"
                  value={retirante}
                  onChange={(e) => setRetirante(e.target.value)}
                  style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </label>

              <label style={{ marginLeft: '20px' }}>
                Quantidade:
                <input
                  type="number"
                  value={quantidadeRetirada}
                  onChange={(e) => setQuantidadeRetirada(e.target.value)}
                  style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </label>

              <button
                onClick={handleRetirarProduto}
                style={{ marginLeft: '20px', padding: '10px 20px', background: '#dc3545', color: '#fff', borderRadius: '4px' }}
              >
                Retirar
              </button>
            </div>
          </div>
        )}

        {mensagem && (
          <div style={{ marginTop: '20px', color: 'green' }}>
            <p>{mensagem}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetiradaProdutos;

