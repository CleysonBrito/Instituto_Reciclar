import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

// Estilos globais
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #00009C;
    font-family: Arial, sans-serif;
    color: #333;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 768px) {
    #return{
      position: absolute;
      top: 0;
      background: none;
      border: none;
      right: 1vh; 
    }
  }
`;

const Container = styled.div`
  max-width: 750px;
  margin: 50px auto;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 10px;
    margin: 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #00009C;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #00009C;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 18px;
  background: #F20DE7;
  color: #fff;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  width: 100%;

  &:hover {
    background-color: #d10ccf;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  overflow-x: auto;
  display: block;

  @media (max-width: 768px) {
    width: 100%;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const TableHead = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: center;
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const ActionButton = styled(Button)`
  margin-left: 10px;
  padding: 6px 10px;
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #666;
  margin-top: 20px;
`;

const VoltarButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #F20DE7;
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d10ccf;
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    padding: 8px 16px;
    font-size: 14px;
  }
`;


function CadProdutos() {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [supplier, setSupplier] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [type, setType] = useState('');
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = () => {
    if (sku && name && supplier && unit && quantity && dateAdded && expiryDate && unitPrice && totalPrice && type) {
      const newProduct = { sku, name, supplier, unit, quantity, dateAdded, expiryDate, unitPrice, totalPrice, type };

      if (editingIndex !== null) {
        const updatedProducts = [...products];
        updatedProducts[editingIndex] = newProduct;
        setProducts(updatedProducts);
        setEditingIndex(null); // Reset editing mode after saving
      } else {
        setProducts([...products, newProduct]);
      }

      // Limpa os campos após adicionar/editar o produto
      resetForm();
    }
  };

  const resetForm = () => {
    setSku('');
    setName('');
    setSupplier('');
    setUnit('');
    setQuantity('');
    setDateAdded('');
    setExpiryDate('');
    setUnitPrice('');
    setTotalPrice('');
    setType('');
  };

  const handleEdit = (index) => {
    const productToEdit = products[index];
    setSku(productToEdit.sku);
    setName(productToEdit.name);
    setSupplier(productToEdit.supplier);
    setUnit(productToEdit.unit);
    setQuantity(productToEdit.quantity);
    setDateAdded(productToEdit.dateAdded);
    setExpiryDate(productToEdit.expiryDate);
    setUnitPrice(productToEdit.unitPrice);
    setTotalPrice(productToEdit.totalPrice);
    setType(productToEdit.type);
    setEditingIndex(index); // Set the product as being edited
  };

  const handleRemove = (index) => {
    const filteredProducts = products.filter((_, i) => i !== index);
    setProducts(filteredProducts);
  };

  return (
    <>
      <GlobalStyle />
      <Title>Cadastro de Produtos</Title>
      <Container>
        <FormGroup>
          <Label>SKU:</Label>
          <Input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="Digite o SKU do produto"
          />
        </FormGroup>

        <FormGroup>
          <Label>Nome do Produto:</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do produto"
          />
        </FormGroup>

        <FormGroup>
          <Label>Fornecedor:</Label>
          <Input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            placeholder="Digite o nome do fornecedor"
          />
        </FormGroup>

        <FormGroup>
          <Label>Unidade de Medida:</Label>
          <Input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="Digite a unidade de medida"
          />
        </FormGroup>

        <FormGroup>
          <Label>Quantidade:</Label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Digite a quantidade"
          />
        </FormGroup>

        <FormGroup>
          <Label>Data de Cadastro:</Label>
          <Input
            type="date"
            value={dateAdded}
            onChange={(e) => setDateAdded(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Data de Vencimento:</Label>
          <Input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Valor Unitário:</Label>
          <Input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            placeholder="Digite o valor unitário"
          />
        </FormGroup>

        <FormGroup>
          <Label>Valor Total:</Label>
          <Input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            placeholder="Digite o valor total"
          />
        </FormGroup>

        <FormGroup>
          <Label>Tipo de Produto:</Label>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Selecione o tipo</option>
            <option value="Proteína">Proteína</option>
            <option value="Mantimento">Mantimento</option>
            <option value="Hortaliça">Hortaliça</option>
          </Select>
        </FormGroup>

        <Button onClick={handleSave}>Salvar Produto</Button>

        {products.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <TableHead>SKU</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead>Data de Vencimento</TableHead>
                <TableHead>Valor Unitário</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Ações</TableHead>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <TableData>{product.sku}</TableData>
                  <TableData>{product.name}</TableData>
                  <TableData>{product.supplier}</TableData>
                  <TableData>{product.unit}</TableData>
                  <TableData>{product.quantity}</TableData>
                  <TableData>{product.dateAdded}</TableData>
                  <TableData>{product.expiryDate}</TableData>
                  <TableData>{product.unitPrice}</TableData>
                  <TableData>{product.totalPrice}</TableData>
                  <TableData>{product.type}</TableData>
                  <TableData>
                    <ActionButton onClick={() => handleEdit(index)}>Editar</ActionButton>
                    <ActionButton onClick={() => handleRemove(index)}>Remover</ActionButton>
                  </TableData>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <NoDataMessage>Nenhum produto cadastrado.</NoDataMessage>
        )}

        <VoltarButton as={Link} to="/Cadastro">Voltar</VoltarButton>
      </Container>
    </>
  );
}

export default CadProdutos;
