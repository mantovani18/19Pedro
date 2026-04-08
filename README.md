# Site de confirmação de presença (RSVP)

Projeto simples e responsivo baseado no convite de 19 anos do Pedro.

## Arquivos

- `index.html`: estrutura da página
- `styles.css`: estilo visual inspirado no convite
- `script.js`: envio do formulário para Google Sheets
- `google-apps-script.gs`: código para colar no Google Apps Script

## Como ligar com Google Sheets

1. Crie uma planilha no Google Sheets.
2. A aba `Respostas` pode ser criada automaticamente pelo script na primeira confirmação.
3. No menu da planilha, abra `Extensões > Apps Script`.
4. Cole o conteúdo do arquivo `google-apps-script.gs` no editor.
5. Clique em `Implantar > Nova implantação`.
6. Em tipo, escolha `Aplicativo da web`.
7. Em acesso, escolha `Qualquer pessoa`.
8. Copie a URL gerada.
9. Abra `script.js` e troque:

```js
const SHEETS_WEB_APP_URL = "COLE_AQUI_SUA_URL_DO_WEB_APP";
```

pela URL do seu Apps Script.

Importante: sempre que alterar o código do Apps Script, faça uma nova implantação (ou gerencie a implantação existente para usar a versão mais recente).

## Publicação

Você pode subir estes arquivos em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel ou servidor próprio).
