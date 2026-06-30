<?php
/*
  Modelo de configuração do painel. Para usar MySQL:
  1. Copie este arquivo para  config.php  (na mesma pasta admin/)
  2. Preencha com os dados do seu banco
  3. NÃO versione o config.php (já está no .gitignore)

  Se o config.php não existir, o painel grava no arquivo data/db.json.
  Na Hostinger, o host do banco é 'localhost' (não o endereço do site).
*/
return [
  'db_host'   => 'localhost',
  'db_name'   => 'NOME_DO_BANCO',
  'db_user'   => 'USUARIO_DO_BANCO',
  'db_pass'   => 'SENHA_DO_BANCO',
  'admin_key' => 'troque-esta-chave',
];
