<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = strip_tags(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST['phone']));
    $project = strip_tags(trim($_POST['project']));
    $subject = strip_tags(trim($_POST['subject']));
    $message = trim($_POST['message']);

    // Validate input fields
    if (empty($name)) {
        echo json_encode(['message' => 'Please enter your name.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['message' => 'Please enter a valid email address.']);
        exit;
    }

    if (empty($phone)) {
        echo json_encode(['message' => 'Please enter your phone number.']);
        exit;
    } elseif (!preg_match('/^[0-9]{10,15}$/', $phone)) {  // Simple regex for phone numbers
        echo json_encode(['message' => 'Please enter a valid phone number.']);
        exit;
    }

    if (empty($message)) {
        echo json_encode(['message' => 'Please enter a message.']);
        exit;
    }

    // Email settings
    $recipient = "ali.dalipi@hr1systems.com"; // Your email
    $subject = "New contact from $name";
    $emailContent = "Name: $name\n";
    $emailContent .= "Email: $email\n";
    $emailContent .= "Phone: $phone\n";
    $emailContent .= "Project: $project\n";
    $emailContent .= "Subject: $subject\n";
    $emailContent .= "Message:\n$message\n";

    $headers = "From: $name <$email>";

    // Send email
    if (mail($recipient, $subject, $emailContent, $headers)) {
        echo json_encode(['message' => 'Message sent successfully.']);
    } else {
        echo json_encode(['message' => 'There was a problem sending your message.']);
    }
}
