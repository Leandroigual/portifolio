<?php
/*
  API simples do painel LCA.
  GET  api.php          → devolve o db.json
  POST api.php?key=XXX  → grava o corpo (JSON) no db.json
  ⚠ Troque ADMIN_KEY antes de publicar em produção.
*/
define('ADMIN_KEY', 'lca2026');
define('DB_FILE', __DIR__ . '/../data/db.json');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (!file_exists(DB_FILE)) { http_response_code(404); echo '{"erro":"db.json não encontrado"}'; exit; }
  readfile(DB_FILE);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $key = $_GET['key'] ?? ($_SERVER['HTTP_X_ADMIN_KEY'] ?? '');
  if (!hash_equals(ADMIN_KEY, $key)) { http_response_code(401); echo '{"erro":"chave inválida"}'; exit; }

  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);
  if ($data === null) { http_response_code(400); echo '{"erro":"JSON inválido"}'; exit; }

  $data['salvoEm'] = date('Y-m-d\TH:i:s');
  $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

  // backup da versão anterior
  if (file_exists(DB_FILE)) @copy(DB_FILE, DB_FILE . '.bak');

  if (file_put_contents(DB_FILE, $json, LOCK_EX) === false) {
    http_response_code(500); echo '{"erro":"falha ao gravar"}'; exit;
  }
  echo json_encode(['ok' => true, 'salvoEm' => $data['salvoEm']]);
  exit;
}

http_response_code(405);
echo '{"erro":"método não suportado"}';
