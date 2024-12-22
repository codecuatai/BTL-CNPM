<?php
    $_SERVER='localhost';
    $user = 'root';
    $pass = '';
    $database = 'travelnest';

    $conn = new mysqLi($_SERVER, $user, $pass,$database);
    if($conn){
        mysqli_query($conn, "SET NAMES 'utf8'");
        echo 'da ket noy yhanh cong';
    }else{
        echo 'ket noi that bai';
    }
?>