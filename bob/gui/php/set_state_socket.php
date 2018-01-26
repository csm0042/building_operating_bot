<?php

    $host = '127.0.0.1';
    $port = 27061;

    // Get variables from POST
    $devname = $_POST['devname'];
    $devcmd = $_POST['devcmd'];

    try {
        $sock = null;
        if (($sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) == false) {
            throw new Exception(sprintf('Unable to create socket: %s', socket_strerror(socket_last_error())));
        };
        if (!socket_connect($sock, $host, $port)) {
            throw new Exception(sprintf('Undable to connect to socket: %s', socket_strerror(socket_last_error())));
        } else {

            // Generate random reference number
            $ref = rand(1, 999);
            $ref_str = "$ref";
            $len_str = strlen($ref_str);

            // Front-pad ref number if necessary to obtain 3-digit number
            if ($len_str == 1) {
                $msg = "00" . $ref_str;
            } elseif ($len_str == 2) {
                $msg = "0" . $ref_str;
            } else {
                $msg = $ref_str;
            };

            // Create Set Device State Message
            $msg .= ",";
            $msg .= $host;
            $msg .= ",";
            $msg .= "$port";
            $msg .= ",";
            $msg .= "127.0.0.1";
            $msg .= ",";
            $msg .= "27999";
            $msg .= ",";
            $msg .= "604";
            $msg .= ",";        
            $msg .= $devname;
            $msg .= ",";
            $msg .= ",";        
            $msg .= $devcmd;
            $msg .= ",";
            $msg .= ",";
            $len = strlen($msg);

            // Send message and close socket
            socket_send($sock, $msg, $len, 0);
            $read = socket_read($sock, 1024);
            socket_close($sock);

            echo $read;
            echo $devcmd;
        }
    }
    catch(Exception $e) {
        //$ERROR = sprintf('Error sending message at line %d', $e->getLine()) . $e->getMessage();
        echo 'offline';
        return(false);
    }

?>
