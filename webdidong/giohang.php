<?php require_once __DIR__. '/autoload/autoload.php';
	$id = intval(getInput('id'));
	$sl = intval(getInput('sl'));
	if($id != "" && isset($_SESSION['cart'][$id]) && $sl == 0)
	{
		$update = $db->update2("UPDATE `product` SET `number` = `number`+".$_SESSION['cart'][$id]['qty']." WHERE `id` = ".$id);
		unset($_SESSION['cart'][$id]);
	}
	else if($sl != 0 && isset($_SESSION['cart'][$id]))
	{
		$sql = "SELECT `number` FROM product WHERE ".$id." = `id`";
		$number = $db->total($sql);
		if($number['number'] == 0)
		{
			$_SESSION['error'] = "Hết hàng!";
		}
	   else
	   {
		$update = $db->update2("UPDATE `product` SET `number` = `number`-".$sl." WHERE `id` = ".$id);
		_debug($update);
		$_SESSION['cart'][$id]['qty'] += $sl;
		if($_SESSION['cart'][$id]['qty'] == 0)
		unset($_SESSION['cart'][$id]);
	   }
	}
 ?>
<?php require_once __DIR__. '/layouts/header.php'; ?>

 <div class="col-md-12 bor">
 	 <section class="box-main1">
        <h3 class="title-main" style="text-align: center;"><a href="javascript:void(0)"> Giỏ hàng </a> </h3>
        
        <table class="table table-striped">
		  <thead>
		    <tr>
		      <th scope="col">Stt</th>
		      <th scope="col">Tên sản phẩm</th>
		      <th scope="col">Hình ảnh</th>
		      <th scope="col">Giá</th>
		      <th scope="col">Số lượng</th>
		      <th scope="col">Thành tiền</th>
		      <th scope="col">Xóa</th>
		    </tr>
		  </thead>
		  <tbody>
		  	<?php if (isset($_SESSION['cart']) && count($_SESSION['cart'])>0): ?>
		  		<?php $stt=1;$sum=0 ;foreach ($_SESSION['cart'] as $item): ?>
			  		<tr>
			      	  <th scope="row"><?php echo $stt ?></th>
				      <td>
				      	<?php echo $item['name'] ?>
				      </td>
				      <td style="padding: 0">
				      	<img src="<?php echo uploads() ?>product/<?php echo $item['thundar'] ?>" width="80px" height="80px">
				      </td>
				      <td><?php echo formatPrice($item['price']) ?> đ</td>
				      <td style="padding-top: 20px">
				      	<button><a href="?sl=-1&id=<?php echo $item['id'] ?>"><i class="fa fa-minus"></i></a></button>
				      	<input value="<?php echo $item['qty'] ?>">
				      	<button><a href="?sl=1&id=<?php echo $item['id'] ?>"><i class="fa fa-plus"></i></a></button>
				      </td>
				      <td><?php echo formatPrice($item['price']*$item['qty']) ?> đ</td>
				      <td style="padding-top: 22px"><a href="giohang.php?id=<?php echo $item['id'] ?>"><i class="fa fa-trash"></i></a></td>
				    </tr>
		  		<?php $stt+=1;$sum+=$item['price']*$item['qty']; endforeach ; $_SESSION['amount']=$sum?>
		  </tbody>
		  <tfoot>
		  	<tr>
		      <th colspan="5" style="text-align: center">Tổng số tiền</th>
		      <th scope="col" style="color: red"><?php echo formatPrice($sum) ?> đ</th>
		      <th scope="col"></th>
		    </tr>
		    <tr>
		    	<td colspan="7">
		    		<a href="dathang.php" class="btn btn-primary">
					Đặt hàng</a>
					
		    	</td>
		    <tr>
		   </tfoot>
		   <?php else: ?>
		   	<tr>
		    	<td colspan="7" style="color:#4caf50; text-align:center; font-size: 30px; padding: 0">
					Giỏ hàng trống!!!!!!!
					<a href="http://localhost/webdidong/" class="buyother">Về trang chủ</a>
		    	</td>
		    <tr>
			
		   <?php endif ?>
		</table>
       
    </section>

</div>

<?php require_once __DIR__. '/layouts/footer.php'; ?>