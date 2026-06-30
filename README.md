# Portfólio LCA — Leandro César de Abreu

Site de portfólio e mini-painel administrativo (CRM, tickets e entregas) para Web Designer & Developer.

## Estrutura

```
portifolio/
├── index.html          # Página principal do portfólio
├── cliente.html        # Área do cliente (entregas / aprovações)
├── portfolio.jsx       # Componentes da interface
├── previews.jsx        # Pré-visualizações de projetos
├── tweaks-panel.jsx    # Painel de ajustes
├── admin/
│   ├── index.html      # Painel administrativo (CRM, tickets, entregas)
│   └── api.php         # API simples de leitura/gravação do db.json
└── data/
    ├── db.json         # Base de dados (NÃO versionado — dados reais)
    └── db.example.json # Modelo de exemplo para começar
```

## Rodando localmente (XAMPP)

O painel admin usa PHP, então precisa de um servidor com PHP (ex.: XAMPP).

1. Coloque o projeto em `htdocs` (ex.: `C:\xampp\htdocs\portifolio`).
2. Inicie o **Apache** pelo painel do XAMPP.
3. Na primeira execução, crie a base copiando o exemplo:
   ```sh
   cp data/db.example.json data/db.json
   ```
4. Acesse:
   - Portfólio: http://localhost/portifolio/
   - Admin: http://localhost/portifolio/admin/

## Configuração

A API (`admin/api.php`) usa uma chave de admin (`ADMIN_KEY`).
**Troque essa chave** antes de publicar em produção e nunca a deixe em repositório público.

## Notas

- `data/db.json` guarda dados reais de clientes e fica fora do versionamento (ver `.gitignore`).
- Use `data/db.example.json` como ponto de partida.
