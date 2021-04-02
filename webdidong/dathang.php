<?php 
	require_once __DIR__. '/autoload/autoload.php';
	if(!isset($_SESSION['name_id']))
	{
		$_SESSION['error']="Vui lòng đăng nhập để thanh toán";
		header("location:dang-nhap.php?path=".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']);
	}

	$user = $db->fetchID('users',$_SESSION['name_id']);


	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$data =
        [
            "users_id" => $_SESSION['name_id'],
            "address" => postInput("address"),
            "name" => postInput('name'),
            "phone" => postInput('phone'),
            "amount" => $_SESSION['amount']
        ];
        $error = [];
        if(postInput('name') == '')
        {
            $error['name'] = "Bạn chưa nhập tên người nhận";
        }
        if(postInput('address') == '')
        {
            $error['address'] = "Bạn chưa nhập địa chỉ";
        }
        if(postInput('phone') == '')
        {
            $error['phone'] = "Bạn chưa nhập số điện thoại";
        }
        if(empty($error))
        {
			$insert = $db->insert("transaction",$data);
			if($insert>0)
                {
                    $_SESSION['success'] = "Đặt hàng thành công!";
                    foreach ($_SESSION['cart'] as $item) {
                    	$data2 =
                    	[
                    		'transaction_id' => $insert,
                    		'product_id' => $item['id'],
                    		'qty' => $item['qty'],
                    		'price' => $item['price']
                    	];
                    $insert2 = $db->insert("orders",$data2);
                    }
                    unset($_SESSION['cart']);
                     unset($_SESSION['amount']);
                   	header("location: thong-bao.php");
                }
                else
                {
                    $_SESSION['error'] = "Đặt hàng thất bại!";
                   // redirectAdmin("admin");
                }
        }
	}

 ?>
<?php require_once __DIR__. '/layouts/header.php'; ?>

 <div class="col-md-12 bor">
 	 <section class="box-main1">
        <h3 class="title-main" style="text-align: center;"><a href="javascript:void(0)"> Đặt hàng </a> </h3>

        <form action="" method="POST" style="margin-top: 30px">
            <div class="form-group row">
                <label class="col-sm-2 text-right" style="margin-top: 10px">Tên người nhận</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" name="name" value="<?php echo $user['name'] ?>">
                   <?php if (isset($error['name'])): ?>
                	<br><p class="text-danger">Tên không được để trống!!!</p>
                <?php endif ?>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-2 text-right" style="margin-top: 10px">Số điện thoại</label>
                <div class="col-sm-8">
                  <input type="tel" class="form-control" name="phone"value="<?php echo $user['phone'] ?>">
                   <?php if (isset($error['name'])): ?>
                	<br><p class="text-danger">Tên không được để trống!!!</p>
                <?php endif ?>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-2 text-right" style="margin-top: 10px">Địa chỉ</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" name="address" value="<?php echo $user['address'] ?>">
                   <?php if (isset($error['name'])): ?>
                	<br><p class="text-danger">Tên không được để trống!!!</p>
                <?php endif ?>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-2 text-right" style="margin-top: 10px">Tổng số tiền</label>
                <div class="col-sm-8">
                  <input type="text" readonly="" class="form-control" name="amount" value="<?php echo formatPrice($_SESSION['amount']) ?> đ">
             
                </div>
            </div>


            <div class="form-group row">
                <div class="col-sm-8 col-sm-offset-2 container-fluid">
                  <button type="submit" class="btn btn-success">Đặt hàng</button>
                </div>
            </div>
        </form>
        
       
    </section>

</div>


<?php require_once __DIR__. '/layouts/footer.php'; ?>