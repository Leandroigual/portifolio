<?php
/*
  API simples do painel LCA (o "banco" é o arquivo data/db.json).
  GET  api.php          → devolve o db.json (ou o seed db.example.json se ainda não existir)
  POST api.php?key=XXX  → grava o corpo (JSON) no db.json, criando-o se preciso
  ⚠ Troque a chave: defina a variável de ambiente LCA_ADMIN_KEY no servidor.
*/
define('ADMIN_KEY', getenv('LCA_ADMIN_KEY') ?: 'lca2026');
define('DATA_DIR', __DIR__ . '/../data');
define('DB_FILE', DATA_DIR . '/db.json');
define('SEED_FILE', DATA_DIR . '/db.example.json');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // Banco já existe → devolve.
  if (file_exists(DB_FILE)) { readfile(DB_FILE); exit; }
  // Ainda não existe → devolve o seed (ou estrutura vazia) com HTTP 200,
  // para o painel reconhecer a API e gravar o banco no primeiro "Salvar".
  if (file_exists(SEED_FILE)) { readfile(SEED_FILE); exit; }
  echo '{"projetos":[],"servicos":[],"crm":[],"tickets":[],"entregas":{}}';
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $key = $_GET['key'] ?? ($_SERVER['HTTP_X_ADMIN_KEY'] ?? '');
  if (!hash_equals(ADMIN_KEY, $key)) { http_response_code(401); echo '{"erro":"chave inválida"}'; exit; }

  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);
  if ($data === null) { http_response_code(400); echo '{"erro":"JSON inválido"}'; exit; }

  // Garante que a pasta data/ exista e seja gravável.
  if (!is_dir(DATA_DIR)) { @mkdir(DATA_DIR, 0775, true); }
  if (!is_writable(DATA_DIR) && !(file_exists(DB_FILE) && is_writable(DB_FILE))) {
    http_response_code(500);
    echo json_encode(['erro' => 'pasta data/ sem permissão de escrita. Ajuste as permissões (755/775) no servidor.']);
    exit;
  }

  $data['salvoEm'] = date('Y-m-d\TH:i:s');
  $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

  // backup da versão anterior
  if (file_exists(DB_FILE)) @copy(DB_FILE, DB_FILE . '.bak');

  if (file_put_contents(DB_FILE, $json, LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['erro' => 'falha ao gravar o db.json (verifique as permissões da pasta data/).']);
    exit;
  }
  echo json_encode(['ok' => true, 'salvoEm' => $data['salvoEm']]);
  exit;
}

http_response_code(405);
echo '{"erro":"método não suportado"}';
