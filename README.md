# Ferramenta CLI que clona paginas

uma pequena ferramenta CLI feita com nodejs+puppeter que clona paginas pela URL.

## Funcionalidades

- [x] clona a pagina com HTML, CSS e Javascript
- [x] sobe o site em um servidor local
- [x] cria um proxy para intermediar requizições
- [x] salvar arquivos localmente
- [] clona todas as paginas da URL
- [] refaz requicições para todos os metodos (atualmente epenas para GET e POST)


### Fluxo de uso
Ao executar a ferramenta, informe a URL da página que deseja clonar e escolha se o JavaScript deve ser incluído ou não. Todas as requisições para APIs externas são interceptadas, processadas pelo servidor local e então entregues à página clonada. Os arquivos da página clonada ficam salvos no diretorio do projeto em /out (este diretorio será criado automaticamente).

### Detalhes
Esta ferramenta é ideal para landing pages, sites institucionais, páginas de vendas ou SPAs. No entanto, ainda não é possível clonar páginas que dependem de cookies ou outras informações sensíveis do navegador.

## Instalar e usar
Clone o repositório com o comando: 
```bash 
git clone https://github.com/Math3uso/page-cloner.git
``` 
Em seguida, acesse o diretório do projeto e instale as dependências:
```bash
cd page-cloner
npm install
```
Por fim, inicie o ambiente de desenvolvimento com:
```bash
npm run dev
```
Caso queira executar uma página já existente execute:
```bash
npm run dev -l
```
isso vai executar os arquivos existentes na pasta out
