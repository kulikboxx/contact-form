<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('en', 'phpmailer/language/');
	$mail->IsHTML(true);

	$mail->setFrom($_POST['email']);

	$mail->addAddress('kulikboxx@gmail.com'); 
	// --Change your email address here -^^^

	$mail->Subject = 'Message from your website www.domain.com';
	
	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Your name:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>Your email:</strong> '.$_POST['email'].'</p>';
	}
	if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Your phone:</strong> '.$_POST['phone'].'</p>';
	}
	if(trim(!empty($_POST['message']))){
		$body.='<p><strong>Your message:</strong> '.$_POST['message'].'</p>';
	}
	if(trim(!empty($_POST['agreement']))){
		$body.='<p><strong>Agreement:</strong> '.$_POST['agreement'].'</p>';
	}

	$mail->Body = $body;

	if (!$mail->send()) {
		$message = 'An error has occurred. Please reload the page and try again.';
	} else {
		$message = 'Your message was successfully sent! :)';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>