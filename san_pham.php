<?php 
	require_once __DIR__. '/autoload/autoload.php';
	$id = intval(getInput('id'));
	$item = $db->fetchId("product",$id);
     $accessories = $db->fetchID("category",$item['category_id']);
     $catelv = intval($accessories['level']);
    if($catelv == 0)
    {
         $item2 = $db->fetchId("phone",$id);
    }
    else 
    {
         $item2 = $db->fetchId("accessories",$id);
    }
    $sql = "SELECT users.name,rated.comment,rated.rated,rated.created_at FROM rated LEFT JOIN users ON rated.id_users = users.id WHERE id_product = $id";
    $rated = $db->fetchsql($sql);
    $accessories = $db->fetchID("category",$item['category_id']);
?>
<?php require_once __DIR__. '/layouts/header.php'; ?>

<div class="col-md-12 bor">

    <div class="chitietSanpham" style="min-height: 85vh">
        <h1> <?php if ($catelv == 0): ?>
            Điện thoại
        <?php endif ?> <?php echo $item['name'] ?></h1>
        <div class="rowdetail group">
            <div class="picture">
                <img src="<?php echo uploads() ?>product/<?php echo $item['thundar'] ?>">
            </div>
            <div class="price_sale">
                <div class="area_price"><strong><?php echo formatPrice(formatSale($item['price'],$item['sale'])) ?>₫</strong>
                    <?php if ($item['sale'] > 0): ?>
                        <span><?php echo formatPrice($item['price']) ?>đ </span>
                    <?php endif ?>
                </div>
                <div class="ship" style="display: none;">
                    <i class="fa fa-clock-o"></i>
                    <div>NHẬN HÀNG TRONG 1 GIỜ</div>
                </div>
                <div class="area_promo">
                    <strong>khuyến mãi</strong>
                    <div class="promo">
                        <i class="fa fa-check-circle"></i>
                        <div id="detailPromo">Cơ hội trúng <span style="font-weight: bold">61 xe Wave Alpha</span> khi trả góp Home Credit</div>
                    </div>
                </div>
                <div class="policy">
                    <div>
                        <i class="fa fa-archive"></i>
                        <?php if ($catelv == 0): ?>
                            <p>Trong hộp có: Sạc, Tai nghe, Sách hướng dẫn, Cây lấy sim, Ốp lưng </p>
                        <?php endif ?>
                        
                    </div>
                    <div>
                        <i class="fa fa-star"></i>
                        <p>Bảo hành chính hãng 12 tháng.</p>
                    </div>
                    <div class="last">
                        <i class="fa fa-retweet"></i>
                        <p>1 đổi 1 trong 1 tháng nếu lỗi, đổi sản phẩm tại nhà trong 1 ngày.</p>
                    </div>
                </div>
                <div>
                        <?php if($item['number'] <= 5 && $item['number'] > 0) :?>
                            <span style="color: #ff376c; font-size: 16px;
                            font-weight:600; padding-left: 10px;">Chỉ còn lại <?php echo $item['number'] ?> sản phẩm</span>
                        <?php elseif($item['number'] == 0): ?>
                            <span style="color: #ff376c; font-size: 16px;
                            font-weight:600; padding-left: 10px;">Đã hết hàng, chờ cập nhật</span>
                        <?php endif ?>
                    </div>
                <div class="area_order">
                    <!-- nameProduct là biến toàn cục được khởi tạo giá trị trong phanTich_URL_chiTietSanPham -->
                    <a class="buy_now" href="cart.php?id=<?php echo $item['id'] ?>">
                        <h3><i class="fa fa-plus" style="color: white"></i> Thêm vào giỏ hàng</h3>
                    </a>
                </div>
            </div>
            <div class="info_product">
                <h2>Thông số kỹ thuật</h2>
                <ul class="info">
                    <?php if ($catelv == 0): ?>
                        <li>
                            <p>Màn hình</p>
                            <div><?php echo $item2["ManHinh"] ?></div>
                        </li>
                        <li>
                            <p>Hệ điều hành</p>
                            <div><div><?php echo $item2["HDH"] ?></div>
                        </li>
                        <li>
                            <p>Camara sau</p>
                            <div><div><?php echo $item2["Camsau"] ?></div>
                        </li>
                        <li>
                            <p>Camara trước</p>
                            <div><div><?php echo $item2["Camtruoc"] ?></div>
                        </li>
                        <li>
                            <p>CPU</p>
                            <div><div><?php echo $item2["CPU"] ?></div>
                        </li>
                        <li>
                            <p>RAM</p>
                            <div><div><?php echo $item2["RAM"] ?></div>
                        </li>
                        <li>
                            <p>Bộ nhớ trong</p>
                            <div><div><?php echo $item2["ROM"] ?></div>
                        </li>
                        <li>
                            <p>Thẻ nhớ</p>
                            <div><div><?php echo $item2["SDCar"] ?></div>
                        </li>
                        <li>
                            <p>Dung lượng pin</p>
                            <div><div><?php echo $item2["Pin"] ?></div>
                        </li>

                    <?php endif ?>

                     <?php if (intval($accessories['level']) == 1): ?>

                    <?php if ($accessories['slug'] == "sac-du-phong"): ?>
                        <li>
                            <p>Hiệu suất</p> 
                             <div><div><?php echo $item2["performance"] ?></div>
                        </li>  
                    <?php endif ?>

                    <?php if ($accessories['slug'] == "sac-du-phong" || $accessories['slug'] == "the-nho"): ?>
                        <li>
                        <p>Dung lượng</p>
                            <div><div><?php echo $item2["capacity"] ?></div>
                        </li>
                    <?php endif ?>

                    <?php if ($accessories['slug'] == "sac-du-phong"): ?>
                        <li>
                        <p>Đầu vào</p>
                        <div><div><?php echo $item2["input"] ?></div>
                        </li>

                    <?php endif ?>

                    <?php if ($accessories['slug'] == "sac-du-phong" || $accessories['slug'] == "adapter-sac" || $accessories['slug'] == "cap-sac"): ?>
                        <li>
                        <p>Đầu ra</p>
                        <div><div><?php echo $item2["output"] ?></div>
                        </li>

                    <?php endif ?>

                    <?php if ($accessories['slug'] == "tai-nghe"): ?>
                        <li>
                        <p>Đầu cắm/Cổng</p>
                        <div><div><?php echo $item2["slot"] ?></div>
                        </li>
                    <?php endif ?>

                    <?php if ($accessories['slug'] == "cap-sac"): ?>
                        <li>
                        <p>Độ dài dây</p>
                        <div><div><?php echo $item2["longs"] ?></div>
                        </li>
                    <?php endif ?>

                    <?php if ($accessories['slug'] == "the-nho"): ?>
                        <li>
                        <p>Tốc độ chuẩn</p>
                        <div><div><?php echo $item2["speed"] ?></div>
                        </li>
                    <?php endif ?>

                    <?php if ($accessories['slug'] == "the-nho"): ?>
                        <li>
                        <p>Tốc độ đọc</p>
                        <div><div><?php echo $item2["rs"] ?></div>
                        </li>
                    <?php endif ?>

                    <?php if ($accessories['slug'] == "the-nho"): ?>
                        <li>
                        <p>Tốc độ ghi</p>
                        <div><div><?php echo $item2["ws"] ?></div>
                        </li>
                    <?php endif ?>

                    <?php if ($accessories['slug'] == "tai-nghe"): ?>
                        <li>
                        <p>Tương thích</p>
                        <div><div><?php echo $item2["compatible"] ?></div>
                        </li>
                    <?php endif ?>

                    <?php if ($accessories['slug'] == "sac-du-phong"): ?>
                        <li>
                        <p>Lõi</p>
                        <div><div><?php echo $item2["core"] ?></div>
                        </li>
                    <?php endif ?>

                    <?php if ($accessories['slug'] == "sac-du-phong" && $accessories['slug'] == "adapter-sac"): ?>
                        <li>
                        <p>Tiện ích</p>
                        <div><div><?php echo $item2["extensions"] ?></div>
                        </li>
                  
                    <?php endif ?>

                    <?php if ($accessories['slug'] == "sac-du-phong"): ?>
                        <li>
                        <p>Kích thước</p>
                        <div><div><?php echo $item2["size"] ?></div>
                        </li>
                    <?php endif ?>

                    <?php if ($accessories['slug'] == "sac-du-phong"): ?>
                        <li>
                        <p>Trọng lượng</p>
                        <div><div><?php echo $item2["weight"] ?></div>
                        </li>
                    <?php endif ?>
                        <li>
                        <p>Sản xuất</p>
                        <div><div><?php echo $item2["made"] ?></div>
                        </li>
                    
                    <?php endif ?>
                </ul>
            </div>
        </div>
        <hr>
        <div class="comment-area">
            <div class="guiBinhLuan">
                <form action="danh-gia.php?">
                    <div class="stars">
                        <input type="hidden" name="id" value="<?php echo $id ?>">
                        <input class="star star-5" id="star-5" value="5" type="radio" name="star">
                        <label class="star star-5" for="star-5" title="Tuyệt vời"></label>

                        <input class="star star-4" id="star-4" value="4" type="radio" name="star">
                        <label class="star star-4" for="star-4" title="Tốt"></label>

                        <input class="star star-3" id="star-3" value="3" type="radio" name="star">
                        <label class="star star-3" for="star-3" title="Tạm"></label>

                        <input class="star star-2" id="star-2" value="2" type="radio" name="star">
                        <label class="star star-2" for="star-2" title="Khá"></label>

                        <input class="star star-1" id="star-1" value="1" type="radio" name="star">
                        <label class="star star-1" for="star-1" title="Tệ"></label>
                    </div>
                        <input type="textarea" maxlength="250" id="inpBinhLuan" name="comment" placeholder="Viết suy nghĩ của bạn vào đây...">
                    <input id="btnBinhLuan" type="submit" value="GỬI BÌNH LUẬN">
                </form>
            </div>
            
            <?php if(isset($_SESSION['success'])) :?>
                    <div class="alert alert-success" role="alert">
                        <?php echo $_SESSION['success'];unset($_SESSION['success']); ?>
                    </div>
                <?php endif; ?>

                <?php if(isset($_SESSION['error_cm'])) :?>
                    <div class="alert alert-danger" role="alert">
                        <?php echo $_SESSION['error_cm'];unset($_SESSION['error_cm']); ?>
                    </div>
                <?php endif; ?>   

            <?php $star=0;$count=0; foreach ($rated as $item2): ?>

            <?php $star+=$item2['rated'];$count+=1; ?>
                
            <?php endforeach;?>
            <?php if ($count>0):
              $star /= $count;
              $data = 
                [
                    'rated' => $star,
                    'comment' => $count
                ];
              $id_update = $db->update("product",$data,array("id" => $id));
               ?>
                <?php endif ?>	

            <div class="rating">
                <i class="fa fa-star<?php if ($star<1): ?>-o<?php endif ?>"></i>
                <i class="fa fa-star<?php if ($star<2): ?>-o<?php endif ?>"></i>
                <i class="fa fa-star<?php if ($star<3): ?>-o<?php endif ?>"></i>
                <i class="fa fa-star<?php if ($star<4): ?>-o<?php endif ?>"></i>
                <i class="fa fa-star<?php if ($star<5): ?>-o<?php endif ?>"></i>
                <span> <?php echo $count ?> đánh giá </span>
            </div>
            
            <div class="comment-content">
                <?php foreach ($rated as $it): ?>

                    <div class="comment">
                    <i class="fa fa-user-circle"> </i>
                    <h4><?php echo $it['name'] ?>
                    <span>
                        <i class="fa fa-star<?php if ($it['rated']<1): ?>-o<?php endif ?>"></i>
                        <i class="fa fa-star<?php if ($it['rated']<2): ?>-o<?php endif ?>"></i>
                        <i class="fa fa-star<?php if ($it['rated']<3): ?>-o<?php endif ?>"></i>
                        <i class="fa fa-star<?php if ($it['rated']<4): ?>-o<?php endif ?>"></i>
                        <i class="fa fa-star<?php if ($it['rated']<5): ?>-o<?php endif ?>"></i>
                    </span>
                    </h4>
                    <p><?php echo $it['comment'] ?></p>
                    <span class="time"><?php echo $it['created_at'] ?></span>
                </div>
                    
                <?php endforeach ?>
                
            </div>
        </div>
    </div>


<?php require_once __DIR__. '/layouts/footer.php'; ?>