<?php
	require_once __DIR__. '/autoload/autoload.php';
	$data = 
	[
		'email' => postInput("email"),
		'password' => postInput("password")
	];

	if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        
        $error = [];
        if(postInput('email') == '')
        {
            $error['email'] = "Email không được để trống!!";
        }

        if(postInput('password') == '')
        {
            $error['password'] = "Mật khẩu không được để trống!!";
        }
        else
        {
        	$data['password'] = MD5(postInput('password'));
        }

        //dang nhap thanh cong
        
        if(empty($error))
        {     

            $isset = $db->fetchOne("users","email = '".$data['email']."' AND password = '".$data['password']."' ");
            if($isset > 0)
            {
                $path = getInput("path");
                $_SESSION['name_user'] = $isset['name'];
                $_SESSION['name_id'] = $isset['id'];
                echo "<script>alert('Đăng nhập thành công'); location.href='http://".$path."'</script>";
            }
            else
            {
            	$_SESSION['error'] = "Đăng nhập thất bại";
            }
        }
    }
?>
<?php require_once __DIR__. '/layouts/header.php'; ?>

 <div class="col-md-12 bor">
 	 <section class="box-main1">
        <h3 class="title-main" style="text-align: center;"><a href="javascript:void(0)"> Đăng nhập </a> </h3>

        <div class="clearfix"></div>
            <?php if(isset($_SESSION['success'])) :?>
                <div class="alert alert-success" role="alert">
                    <?php echo $_SESSION['success'];unset($_SESSION['success']); ?>
                </div>
            <?php endif; ?>

            <?php if(isset($_SESSION['error'])) :?>
                <div class="alert alert-danger" role="alert">
                    <?php echo $_SESSION['error'];unset($_SESSION['error']); ?>
                </div>
            <?php endif; ?>
        
        <form action="" method="POST" style="margin-top: 30px;margin-left: 15%;margin-bottom: 30px; background: #e3e3e354" class="col-sm-8 bor">
            <div class="form-group row" style="text-align: center">
                <img style="height: 100px;border:2px solid black;border-radius: 50%" src="images/logo.png">
            </div>

            <div class="form-group row">
                <label class="col-sm-3 text-right" style="margin-top: 10px">Email</label>
                <div class="col-sm-6">
                  <input type="email" class="form-control" name="email" required>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-3 text-right" style="margin-top: 10px">Mật khẩu</label>
                <div class="col-sm-6">
                  <input type="password" class="form-control" name="password" required>
                </div>
            </div>

            <div class="form-group row">
                <div class="col-sm-6 col-sm-offset-3 container-fluid" style="vertical-align: middle; margin-left:40%">
                  <button type="submit" class="btn btn-success">Đăng nhập</button>
                </div>
            </div>
        </form>
       
    </section>

</div>


<?php require_once __DIR__. '/layouts/footer.php'; ?>