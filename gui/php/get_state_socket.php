<?php

    $host = '127.0.0.1';
    $port = 27099;

    // Get variables from POST
    $devname = $_POST['devname'];

    // Create socket to listen for a response
    $sock_in = socket_create(AF_INET, SOCK_STREAM, 0) or die("Could not create incoming socket");
    socket_bind($sock_in, $host) or die("Could not bind to socket");
    socket_getsockname($sock_in, $addr_in, $port_in) or die("Could not get port");
    socket_listen($sock_in) or die("Could not listen to socket");

    // Create outgoing message socket and connect to client
    $sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    $conn = socket_connect($sock, $host, $port);

    // Send
    if ($conn === true) {

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

        // Create Get Device State Message
        $msg .= ",";
        $msg .= $host;
        $msg .= ",";
        $msg .= "$port";
        $msg .= ",";
        $msg .= "127.0.0.1";
        $msg .= ",";
        $msg .= "$port_in";
        $msg .= ",";
        $msg .= "602";
        $msg .= ",";        
        $msg .= $devname;
        $msg .= ",";
        $msg .= ",";        
        $msg .= ",";
        $len = strlen($msg);

        // Send message and close socket
        socket_send($sock, $msg, $len, 0);
        socket_close($sock);
    }

    // Listen for response, receive, then close incoming socket
    $accept = socket_accept($sock_in) or die("Could not accept");
    $read = socket_read($accept, 1024) or die("Cound not read from socket");
    socket_close($sock_in);
    echo $read;

?>
