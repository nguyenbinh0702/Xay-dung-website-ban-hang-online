<?php 
    require_once __DIR__. '/../autoload/autoload.php';
    $name = getInput('keywork');
    
    if(getInput('keywork') != '')
        {
            $name = to_slug($name);
            $item = $db->fetchOne('product',"slug LIKE '%".$name."%' ");
            if(isset($item) && count($item)>0)
            {
                $cate = $db->fetchOne('category',"id ='".$item['category_id']."'");
                if($cate['level'] == 0)
                {
                header("location:dienthoai.php?the=".$name);
                }
                else
                {
                header("location:phukien.php?the=".$name); 
                }
            }
            else
            {
                $_SESSION['error_s']="Không tìm thấy sản phẩm!";
            }
        }
 ?>
<!DOCTYPE html>
<html>
    <head>
        <title>Web bán hàng online</title>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>public/frontend/css/font-awesome.min.css">
         <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>public/frontend/css/chitietsanpham.css">
        <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>public/frontend/css/bootstrap.min.css">
         
        <!-- Jquery -->

    <script  src="<?php echo base_url() ?>public/frontend/js/jquery-3.2.1.min.js"></script>

        <script  src="<?php echo base_url() ?>public/frontend/js/bootstrap.min.js"></script>
        <!---->
        <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>public/frontend/css/slick.css"/>
        <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>public/frontend/css/slick-theme.css"/>
        <!--slide-->
        <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>public/frontend/css/style.css">

                <!-- owl carousel libraries -->
    <link rel="stylesheet" href="<?php echo base_url() ?>public/frontend/lib/owlcarousel/owl.carousel.min.css">
    <link rel="stylesheet" href="<?php echo base_url() ?>public/frontend/lib/owlcarousel/owl.theme.default.min.css">
    <script src="<?php echo base_url() ?>public/frontend/lib/owlcarousel/owl.carousel.min.js"></script>
 
    </head>
    <body>
        <div id="wrapper">
            <!---->
            <!--HEADER-->
            <div id="header">
                <div id="header-top">
                    <div class="container">
                        <div class="row clearfix">
                            
                            <div class="col-md-6" style="float: right;">
                                <nav id="header-nav-top">
                                    <ul class="list-inline pull-right" id="headermenu">

                                        <?php if (isset($_SESSION['name_user'])): ?>
                                            Xin chào <?php echo $_SESSION['name_user'] ?>
                                            <li>
                                                <a href=""><i class="fa fa-user"></i> Tài khoản <i class="fa fa-caret-down"></i></a>
                                                <ul id="header-submenu">
                                                    <li><a href="thong-tin.php"><i class="fa fa-info"></i> Thông tin</a></li>
                                                    <li><a href="giohang.php"><i class="fa fa-shopping-cart"></i> Giỏ hàng</a></li>
                                                    <li><a href="dang-xuat.php"><i class="fa fa-sign-out"></i>Thoát</a></li>
                                                </ul>
                                            </li>
                                        <?php else: ?>

                                            <li>
                                                <a href="dang-ki.php"><i class="fa fa-user"></i> Đăng kí</a>
                                            </li>
                                            <li>
                                                <a href="dang-nhap.php?path=<?php echo $_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'] ?>"><i class="fa fa-unlock"></i> Đăng nhập</a>
                                            </li>

                                        <?php endif ?>
                                        
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row" id="header-main">
                        <div class="col-md-1">
                            <a href="index.php">
                                <img src="images/logo.png" height=90px>
                            </a>
                        </div>
                        <div class="col-md-3" style="margin: 30px 0">
                            <form class="form-inline">
                                <div class="form-group">
                                    <!-- 
                                    <label>
                                        <select name="category" class="form-control">
                                            <option> All Category</option>
                                            <option> Dell </option>
                                            <option> Hp </option>
                                            <option> Asuc </option>
                                            <option> Apper </option>
                                        </select>
                                        
                                    </label>
-->
                                    <input type="text" name="keywork" placeholder=" Bạn tìm gì ..." class="form-control">
                                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                                </div>
                                <?php if(isset($_SESSION['error_s'])) :?>
                                          <div style="color: red">
                                              <?php echo $_SESSION['error_s'];unset($_SESSION['error_s']); ?>
                                          </div>
                                    <?php endif; ?>
                            </form>
                        </div>

                        <div class="col-md-4" style="text-align: center;margin: 30px 0">
                            <a href="index.php">
                                <img src="images/logo2.png">
                            </a>
                        </div>
                        
                        <div class="col-md-4" style="margin: 30px 0" id="header-right">
                            <div class="pull-right">
                                <div class="pull-right" id="main-shopping">
                                <a href="giohang.php"><i class="fa fa-shopping-basket"></i> Giỏ hàng </a>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--END HEADER-->


            <!--MENUNAV-->
            <div id="menunav">
                <div class="container">
                    <nav>
                        <div class="home pull-left">
                            <a href="index.php">Trang chủ</a>
                        </div>
                        <!--menu main-->
                        <ul id="menu-main">
                            <li>
                                <a href="dienthoai.php?the=hot">Điện thoại</a>
                            </li>
                            <li>
                                <a href="phukien.php">Phụ kiện</a>
                            </li>
                        </ul>
                        <!-- end menu main-->

                        <!--Shopping
                        <ul class="pull-right" id="main-shopping">
                            <li>
                                <a href=""><i class="fa fa-shopping-basket"></i> My Cart </a>
                            </li>
                        </ul>
                        end Shopping-->
                    </nav>
                </div>
            </div>
            <!--ENDMENUNAV-->
            
            <div id="maincontent">
                <div class="container">
                    