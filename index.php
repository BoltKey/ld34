<head>
<meta charset="utf-8" />
<title>Upright</title>
<link rel="shortcut icon" href="/boltlogo.png">
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="bootstrap/css/bootstrap-theme.min.css" rel="stylesheet">
<script src="bootstrap/js/bootstrap.min.js"></script>
<script>var levels = [];</script>

<?php
$i = 0;
foreach (glob("game/*.js") as $filename)
{
    echo '<script type="text/javascript" src='.$filename.'></script>
';
}

?>
<script>
window.onload = main;
$(document).keydown(keypush);
$(document).keyup(keyrelease);
</script>
</head>

<body style="margin: 0;">
<canvas id="canvas"></canvas>

</body>