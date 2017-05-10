<!DOCTYPE html>
<html>
<body>
<!-- FOund items php server -->
<!-- Tutorial: http://php.net/manual/en/intro-whatis.php -->
<!-- Tutorial for php and forms: https://www.w3schools.com/php/php_forms.asp -->
Item Name: <?php echo $_GET["item_Name"]; ?>
<br>
Description: <?php echo $_GET["description"];?>
<br>
If you lost this item, please contact:
<br>
Name:<?php echo $_GET["full_name"];?>
<br>
Phone Number: <?php echo $_GET["phone_number"];?>
<br>
Email: <?php echo $_GET["email"];?>

</body>
</html>