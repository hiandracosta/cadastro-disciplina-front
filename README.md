# Sistema de Cadastro de Disciplinas Optativas

Este é um sistema web desenvolvido para facilitar o cadastro de disciplinas optativas pelos alunos da Facisa. O sistema utiliza leitura de QR Code para agilizar o processo de cadastro.

## Funcionalidades

- **Leitura de QR Code**: O sistema lê o QR Code da carteirinha digital do aluno através da câmera do dispositivo.
- **Cadastro de Disciplinas**: Permite o cadastro de disciplinas optativas com os seguintes dados:
  - Matrícula do aluno (preenchida automaticamente via QR Code)
  - Semestre atual
  - Curso
  - Disciplina optativa desejada
- **Visualização de Registros**: Permite visualizar todos os registros de disciplinas cadastradas em formato de tabela.

## Como Usar

1. **Acesse o Sistema**:
   - Abra o sistema no navegador
   - Permita o acesso à câmera quando solicitado

2. **Leitura do QR Code**:
   - Abra o app Meu App Unifacisa
   - Acesse a Carteirinha digital
   - Posicione o QR Code no scanner
   - O sistema preencherá automaticamente sua matrícula

3. **Cadastro de Disciplina**:
   - Selecione o semestre atual
   - Escolha seu curso
   - Selecione a disciplina optativa desejada
   - Clique em "Enviar" para finalizar o cadastro

4. **Visualizar Registros**:
   - Na tela inicial, clique em "Ver Registros"
   - Visualize todos os cadastros realizados em formato de tabela

## Tecnologias Utilizadas

- React
- Material-UI
- ZXing (Biblioteca de leitura de QR Code)
- TypeScript

## Requisitos do Sistema

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Câmera funcional para leitura do QR Code
- Conexão com a internet

## Desenvolvido pelo grupo :

- LUIS CARLOS RODRIGUES SILVA  
- IGOR GABRIEL SOARES 
- HIANDRA ALVES COSTA
- MARCOS AURELIO SEGUNDO
- MARCOS GABRIEL
- CRISTIAN VIEIRA SILVA LINS
