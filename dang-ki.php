<?php
	require_once __DIR__. '/autoload/autoload.php';
	if(isset($_SESSION['name_id']))
	{
		echo "<script>location.href='index.php'</script>";
	}
	$data =
        [
            "name" => postInput('name'),
            "address" => postInput("address"),
            "email" => postInput('email'),
            "phone" => postInput('phone'),
            "password" => postInput('password')
        ];

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        
        $error = [];
        if(postInput('name') == '')
        {
            $error['name'] = "Mời nhập đầy đủ họ tên";
        }
        if(postInput('address') == '')
        {
            $error['address'] = "Mời địa chỉ";
        }
        if(postInput('email') == '')
        {
            $error['email'] = "Email không được để trống!!!";
        }
        if(postInput('phone') == '')
        {
            $error['phone'] = "Mời nhập số điện thoại";
        }

        if(postInput('password') == '')
        {
            $error['password'] = "Mời nhập mật khẩu";
        }
        else
        {
        	$data['password'] = MD5(postInput('password'));
        }

        //dang nhap thanh cong
        if(empty($error))
        {     
            $isset = $db->fetchOne("users","email = '".$data['email']."' ");
            if(count($isset) > 0)
            {
                $error['email'] = "Email đã đã tồn tại!";
            }
            else
            {

                $id_insert = $db->insert("users",$data);
                if($id_insert>0)
                {
                    $_SESSION['success'] = "Đăng kí thành công!";
                   	header("location: dang-nhap.php");
                }
                else
                {
                    $_SESSION['error'] = "Đăng kí thất bại!";
                   // redirectAdmin("admin");
                }
            }
        }
    }

?>
<?php require_once __DIR__. '/layouts/header.php'; ?>

 <div class="col-md-12 bor">
 	 <section class="box-main1">
        <h3 class="title-main" style="text-align: center;"><a href="javascript:void(0)"> Đăng kí thành viên </a> </h3>

        <form action="" method="POST" style="margin-top: 30px;margin-left: 15%;margin-bottom: 30px; background: #e3e3e354" class="col-sm-8 bor">
            <div class="form-group row" style="margin-top: 30px;">
                <label class="col-sm-3 text-right" style="margin-top: 10px">Tên thành viên</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" name="name" value="<?php echo $data['name'] ?>">
                  <?php if (isset($error['name'])): ?>
                	<br><p class="text-danger">Tên không được để trống!!!</p>
                <?php endif ?>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-3 text-right" style="margin-top: 10px">Email</label>
                <div class="col-sm-6">
                  <input type="email" class="form-control" name="email"value="<?php echo $data['email'] ?>">
                  <?php if (isset($error['email'])): ?>
                	<br><p class="text-danger"><?php echo $error['email'] ?></p>
                <?php endif ?>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-3 text-right" style="margin-top: 10px">Mật khẩu</label>
                <div class="col-sm-6">
                  <input type="password" class="form-control" name="password" value="<?php echo $data['password'] ?>">
                  <?php if (isset($error['password'])): ?>
                	<br><p class="text-danger">Mật khẩu không được để trống!!!</p>
                <?php endif ?>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-3 text-right" style="margin-top: 10px">Số điện thoại</label>
                <div class="col-sm-6">
                  <input type="tel" class="form-control" name="phone" value="<?php echo $data['phone'] ?>">
                  <?php if (isset($error['phone'])): ?>
                	<br><p class="text-danger">Số điện thoại không được để trống!!!</p>
                <?php endif ?>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-3 text-right" style="margin-top: 10px">Địa chỉ</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" name="address" value="<?php echo $data['address'] ?>">
                  <?php if (isset($error['address'])): ?>
                	<br><p class="text-danger">Địa chỉ không được để trống!!!</p>
                <?php endif ?>
                </div>
            </div>

            <div class="form-group row">
                <div class="col-sm-6 col-sm-offset-3 container-fluid" style="vertical-align: middle; margin-left:40%">
                  <button type="submit" class="btn btn-success">Đăng kí</button>
                </div>
            </div>
        </form>

        
       
    </section>

</div>


<?php require_once __DIR__. '/layouts/footer.php'; ?><p></p>