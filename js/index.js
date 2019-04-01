$(function () {

    var $prize = $(".play li").not("#btn"),//含谢谢参与的所有奖品
        $change = $("#change"),//显示剩余机会
        $btn = $("#btn"),//开始抽奖按钮
        length = $prize.length,//奖品总数
        data = {count: 99},//次数
        bool = true,//判断是否可点击,true为可点击
        mark = 0,//标记当前位置，区间为0-7
        mark_text,//0-7对应的奖品
        $prize_btn = $("#prize_btn"),//我的奖品按钮
        recordArr = [],//获得的奖品存入数组，我的奖品页需要显示
        $mask_btn = $("#mask_btn"), //抽奖完成之后的提交按钮 : 必须提交信息之后才可以存入奖品列表
        timer;//定时器

    init();

    //默认动画效果
    function init() {
        timer = setInterval(function () {
            //不能调用animate函数，不然标记会有问题
            //九宫格动画
            length++;
            length %= 8;
            $prize.eq(length - 1).removeClass("select");
            $prize.eq(length).addClass("select");

            //位置标记的改变
            mark++;
            mark %= 8;
        }, 1000);
    }

    //点击抽奖次数-1
    $btn.click(function () {
        if (bool) {
            bool = false;
            if (data.count > 0) {//若还有次数
                data.count--;
                $change.html(data.count);
                clickFn();
            } else {
                alert("您剩余抽奖次数为0，不能抽奖~");
            }
        }
    });

    //点击抽奖！！！
    function clickFn() {
        clearInterval(timer);//点击抽奖时清除定时器
        var random = [1, 2, 3, 4, 5, 6, 7, 8];//抽奖概率  和switch对应着看 数字<=>奖品

        //举个栗子：
        // var random = [0, 0, 0, 0, 1, 1, 1, 1];// 此对应概率为 么么哒一个50% 拥抱一个50% 一半一半

        // data为随机出来的结果，根据概率后的结果
        random = random[Math.floor(Math.random() * random.length)]; //1-8的随机数
        mark = random;
        mark %= 8;

        switch (mark) {
            case 0:
                mark_text = "么么哒一个";
                break;
            case 1:
                mark_text = "拥抱一个";
                break;
            case 2:
                mark_text = "2019祝福一条";
                break;
            case 3:
                mark_text = "2020女朋友一枚";
                break;
            case 4:
                mark_text = "比心三次";
                break;
            case 5:
                mark_text = "远程安慰一次";
                break;
            case 6:
                mark_text = "撒娇五枚";
                break;
            case 7:
                mark_text = "《爱的魔力转圈圈》一首";
                break;
            default:
        }

        //默认先转4圈
        random += 32;//圈数 * 奖品总数
        //调用旋转动画
        for (var i = 1; i <= random; i++) {
            setTimeout(animate(), 2 * i * i);//第二个值越大，慢速旋转时间越长
        }
        //停止旋转动画
        setTimeout(function () {
            $(".play li[data-id=" + mark + "]").addClass("select").siblings().removeClass("select"); //奖品显示
            $(".mask_prize").text(mark_text); //遮罩 奖品显示
            setTimeout(function () {
                bool = true;
                $("#mask").fadeIn(); //遮罩层显示
            }, 1000);
        }, 2 * random * random);
    }

    //动画效果
    function animate() {
        return function () {
            //九宫格动画
            length++;
            length %= 8;
            $prize.eq(length - 1).removeClass("select");
            $prize.eq(length).addClass("select");
        }
    }

    //中奖信息提示
    $("#close").click(function () {
        clearInterval(timer);//关闭弹出时清除定时器
        init();
    });

    //手机验证提交信息 存奖品
    $mask_btn.on("click", function () {
        //验证暂时关掉啦 毕竟是测试嘛
        /*if ($('.mask_name').val() == '') {
            alert('请填写您的姓名')
            return false;
        }
        if ($('.mask_phone').val() == '') {
            alert('请输入您的手机号')
            return false;
        } else {
            if (!/^1[34578]\d{9}$/.test($('.mask_phone').val())) {
                alert('手机号格式错误');
                return false
            }
        }*/
        recordArr.push(mark_text); //提交信息之后 吧 奖品 push到 奖品列表
        $('#mask').fadeOut();
        $('#success').fadeIn();
        return true;
    });

    /* 我的奖品显示 */
    // var recordArr = ["么么哒一个","比心三次"];  //中奖纪录
    $prize_btn.on('click', function () {
        var myDate = new Date();
        // var today = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
        var today = myDate.getFullYear() + "-" + (myDate.getMonth() + 1);  //时间定为四月份 仅四月活动
        /* 抽奖记录存取 */
        if (recordArr.length == 0) {
            $("#go").text('小乖乖，快去抽奖玩耍呀！').show();
        } else {
            $("#recordTxt").empty();
            //渲染奖品
            recordArr.forEach(function (item, index) {
                var str = "<p><span>" + item + "</span><span>" + today + "</span></p>";
                $("#recordTxt").append(str);
            })
        }

        $("#record").fadeIn();
    });


});






