<?php

$owner = trim($_POST['owner'] ?? '');
$pet = trim($_POST['pet'] ?? '');
$petName = trim($_POST['petName'] ?? '');
$city = trim($_POST['city'] ?? '');
$contact = trim($_POST['contact'] ?? '');
$description = trim($_POST['description'] ?? '');

$errors = [];

if ($owner === '') {
  $errors['owner'] = 'Имя владельца не может быть пустым';
}

if ($pet === '') {
  $errors['pet'] = 'Вид питомца не может быть пустым';
}

if ($petName === '') {
  $errors['petName'] = 'Имя питомца не может быть пустым';
}

if ($city === '') {
  $errors['city'] = 'Город не может быть пустым';
}

if ($contact === '') {
  $errors['contact'] = 'Контакты не могут быть пустым';
}

if ($description === '') {
  $errors['description'] = 'Описание не может быть пустым';
}

if (!empty($errors)) {
  echo json_encode([
    'success' => false,
    'errors' => $errors
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

$data = [
  'owner' => $owner,
  'pet' => $pet,
  'petName' => $petName,
  'city' => $city,
  'contact' => $contact,
  'description' => $description
];

echo json_encode([
    'success' => true,
    'data' => $data
  ], JSON_UNESCAPED_UNICODE);
  exit;