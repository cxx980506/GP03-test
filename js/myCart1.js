$(function () {
    // 判断购物车是否有数据
    if (localStorage.getItem('goods')) {
        var goodsArr = JSON.parse(localStorage.getItem('goods'));
        $.ajax({
            url: 'data/goods.json',
            type: 'get',
            dataType: 'json',
            success: function (jsonArr) {
                $.each(goodsArr, function (index, item) {
                    $.each(jsonArr, function (i, obj) {
                        if (item.code === obj.code) {
                            var goodsDom = `<li>
                                <img src="${obj.imgurl}" alt="">
                                <h3>${obj.title}</h3>
                                <p>${obj.price}</p>
                                <div class="substract">-</div>
                                <span>${item.num}</span>
                                <div class="add">+</div>
                                <em code="${obj.code}">删除</em>
                            </li>`;
                            $('.list').append(goodsDom);
                        }
                    })
                })
            }
        })
        //点击删除
        $('.list').on('click', 'li em', function () {
            //当前商品的编号
            var code = $(this).attr('code');
            $.each(goodsArr, function (index, item) {
                if (item.code === code) {
                    goodsArr.splice(index, 1);
                    return false;
                }
            });
            if (goodsArr.length > 0) {
                // 把数据更新到本地存储
                localStorage.setItem('goods', JSON.stringify(goodsArr));
            } else {
                localStorage.clear();
                var newLi = '<li style="width:860px;line-height:80px;text-align:center">购物车暂无数据！</li>';
                $('.list').html(newLi);
            }

            $(this).parent().remove();
            alert('商品成功移出购物车');

        })

        $('.list').on('click', 'li .substract', function () {
            // var goodsArr = JSON.parse(localStorage.getItem('goods')) ;
            var code = $(this).parent().find('em').attr('code');
            // var num = $(this).next().text();
            // num = num - 1 < 1 ? 1 : num - 1;
            // $(this).parent().find('span').text(num);
            var $this=$(this);
            $.each(goodsArr, function (index, item) {  
                if (item.code === code) {
                    item.num--;
                    if(item.num<1){
                        item.num=1;
                    }
                    $this.next().text(item.num);
                    //item.num = num;
                }
            })
            localStorage.setItem('goods', JSON.stringify(goodsArr));
        });
        $('.list').on('click', 'li .add', function () {
            var code = $(this).parent().find('em').attr('code');
            var $this=$(this);
            $.each(goodsArr, function (index, item) {
                if (item.code === code) {
                    item.num++;
                    $this.prev().text(item.num);
                }
            })
            localStorage.setItem('goods', JSON.stringify(goodsArr));
        });
        

    } else {
        var newLi = '<li style="width:860px;line-height:80px;text-align:center">购物车暂无数据！</li>';
        $('.list').html(newLi);
    }

})