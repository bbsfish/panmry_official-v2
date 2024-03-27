<?php
var_dump(ftp_connect());
function ftp_connect()
{
    $ftp_host = "sv2.html.xdomain.ne.jp";
    $ftp_user = "panmryworks.html.xdomain.jp";
    $ftp_password = "P3UYQxA-eFZavui";
    $ftp_port = "";
    $ftp_dir = "";

    // Open ftp connection
    $connection = ftp_connect($ftp_host);
    if ($connection === false) return false;
    // login
    if (!ftp_login($connection, $ftp_user, $ftp_password)) return false; else true;

    // // 
    // $file_name = $file["file"]["name"];
    // $file_tmp_name = $file["file"]["tmp_name"];

    // // ftp passive mode turn on
    // ftp_pasv($connection, true);

    // // appoint dir
    // if (!ftp_chdir($connection, $ftp_dir)) return false;

    // // upload
    // ftp_put($connection, $file_name, $file_tmp_name, FTP_BINARY);
}

