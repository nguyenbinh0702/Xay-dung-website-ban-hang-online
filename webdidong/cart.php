<?php 
	require_once __DIR__. '/autoload/autoload.php';

	$id = intval(getInput('id'));
	$error = [];
	$sql = "SELECT `number` FROM product WHERE ".$id." = `id`";
	$number = $db->total($sql);

	if($number['number'] == 0)
	{
		header("location:sanpham.php?id=".$id);
	}

	if(isset($_SESSION['cart'][$id]))
	{
		$update = $db->update2("UPDATE `product` SET `number` = `number`+ 1 WHERE `id` = ".$id);
		$_SESSION['cart'][$id]['qty'] += 1;
		
	}
	else
	{
		$item = $db->fetchID("product",$id);
		$_SESSION['cart'][$id]['id'] = $id;
		$_SESSION['cart'][$id]['qty'] = 1;
		$_SESSION['cart'][$id]['name'] = $item['name'];
		$_SESSION['cart'][$id]['thundar'] = $item['thundar'];
		$_SESSION['cart'][$id]['price'] = (100-$item['sale'])*$item['price']/100;
	}
	echo "<script>alert('Thêm vào giỏ thành công');history.go(-1)</script>";
 ?>