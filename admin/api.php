<?php
/*
  API do painel LCA.
  Guarda o "documento" do app (projetos, servicos, crm, tickets, entregas)
  em MySQL quando existir admin/config.php; senão, no arquivo data/db.json.

  GET  api.php          → devolve o documento
  POST api.php?key=XXX  → grava o documento (precisa da chave de admin)

  Configuração do banco: copie config.example.php para config.php e preencha.
  ⚠ config.php NÃO vai para o Git (está no .gitignore).
*/

$CFG = @include __DIR__ . '/config.php';            // array de config, ou false se não existir
$ADMIN_KEY = (is_array($CFG) && !empty($CFG['admin_key']))
  ? $CFG['admin_key']
  : (getenv('LCA_ADMIN_KEY') ?: 'lca2026');

define('DATA_DIR', __DIR__ . '/../data');
define('DB_FILE',  DATA_DIR . '/db.json');
define('SEED_FILE', DATA_DIR . '/db.example.json');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

/* ---------- helpers ---------- */
function db_connect($CFG) {
  if (!is_array($CFG) || empty($CFG['db_name'])) return null;
  try {
    $dsn = 'mysql:host=' . ($CFG['db_host'] ?? 'localhost')
         . ';dbname=' . $CFG['db_name'] . ';charset=utf8mb4';
    $pdo = new PDO($dsn, $CFG['db_user'] ?? '', $CFG['db_pass'] ?? '', [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    $pdo->exec('CREATE TABLE IF NOT EXISTS lca_store (id INT PRIMARY KEY, doc LONGTEXT, updated_at DATETIME) CHARACTER SET utf8mb4');
    return $pdo;
  } catch (Exception $e) {
    return null; // cai no fallback de arquivo
  }
}

function seed_doc() {
  if (file_exists(SEED_FILE)) return file_get_contents(SEED_FILE);
  if (file_exists(DB_FILE))   return file_get_contents(DB_FILE);
  return '{"projetos":[],"servicos":[],"crm":[],"tickets":[],"entregas":{}}';
}

$pdo = db_connect($CFG);

/* ---------- GET: ler ---------- */
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if ($pdo) {
    $row = $pdo->query('SELECT doc FROM lca_store WHERE id = 1')->fetch(PDO::FETCH_ASSOC);
    if ($row && $row['doc'] !== null) { echo $row['doc']; exit; }
    $seed = seed_doc();
    $st = $pdo->prepare('INSERT INTO lca_store (id, doc, updated_at) VALUES (1, ?, NOW()) ON DUPLICATE KEY UPDATE doc = VALUES(doc)');
    $st->execute([$seed]);
    echo $seed; exit;
  }
  if (file_exists(DB_FILE)) { readfile(DB_FILE); exit; }
  echo seed_doc(); exit;
}

/* ---------- POST: gravar ---------- */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $key = $_GET['key'] ?? ($_SERVER['HTTP_X_ADMIN_KEY'] ?? '');
  if (!hash_equals($ADMIN_KEY, $key)) { http_response_code(401); echo '{"erro":"chave inválida"}'; exit; }

  $raw  = file_get_contents('php://input');
  $data = json_decode($raw, true);
  if ($data === null) { http_response_code(400); echo '{"erro":"JSON inválido"}'; exit; }

  $data['salvoEm'] = date('Y-m-d\TH:i:s');
  $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

  if ($pdo) {
    try {
      $st = $pdo->prepare('INSERT INTO lca_store (id, doc, updated_at) VALUES (1, ?, NOW()) ON DUPLICATE KEY UPDATE doc = VALUES(doc), updated_at = NOW()');
      $st->execute([$json]);
      echo json_encode(['ok' => true, 'salvoEm' => $data['salvoEm'], 'store' => 'mysql']);
      exit;
    } catch (Exception $e) {
      http_response_code(500);
      echo json_encode(['erro' => 'falha ao gravar no MySQL: ' . $e->getMessage()]);
      exit;
    }
  }

  // fallback: arquivo
  if (!is_dir(DATA_DIR)) { @mkdir(DATA_DIR, 0775, true); }
  if (!is_writable(DATA_DIR) && !(file_exists(DB_FILE) && is_writable(DB_FILE))) {
    http_response_code(500);
    echo json_encode(['erro' => 'pasta data/ sem permissão de escrita (ajuste para 755/775).']);
    exit;
  }
  if (file_exists(DB_FILE)) @copy(DB_FILE, DB_FILE . '.bak');
  if (file_put_contents(DB_FILE, $json, LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['erro' => 'falha ao gravar o db.json.']);
    exit;
  }
  echo json_encode(['ok' => true, 'salvoEm' => $data['salvoEm'], 'store' => 'file']);
  exit;
}

http_response_code(405);
echo '{"erro":"método não suportado"}';
