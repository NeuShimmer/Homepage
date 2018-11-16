import Swiper from 'swiper';
import $ from 'jquery';
import '../style/index.scss';

console.log("%c/* Powered by Shimmer Network Studio */", "color:green");
console.log("%c/* by Nekotora Ver.201809 */", "color:green");
console.log("%c( ´ ▽ ` )ﾉ 小小世界中的又一个Web组织，微光网络工作室，期待和你相遇！\n了解更多 -> https://shimmer.neusoft.edu.cn/", "color:blue");

$(function () {
  loadBlog();
  $('a[data-goto]').on('click', function () {
    $("html,body").animate({
      scrollTop: $("#" + $(this).data('goto')).offset().top
    }, 1000);
  })

  $('#subscribeButton').on('click',function () {
    var email = $('#subscribeEmail').val();
    if (email == '') {
      alert('请输入电子邮箱地址');
      $('#subscribeEmail').focus();
      return false;
    }
    var regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (!regExp.test(email)) {
      alert("看起来您输入的电子邮箱地址不太正确");
      $('#subscribeEmail').focus();
      return false;
    }
    $.ajax({
      method: "post",
      data: {
        "email": email,
      },
      dataType: 'json',
      url: "/blog/subscribe.php",
      success: function (data) {
        if (data.status == 'success') {
          $('.subarea').slideUp();
          $('.subsuccess').slideDown();
        } else {
          $('.subarea').slideUp();
          $('.suberror').slideDown();
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown)
        $('.subarea').slideUp();
        $('.suberror').slideDown();
      }
    })
  })

  function loadBlog(element) {
    $.ajax({
      url: "/blog/article.php",
      dataType: 'json',
      success: function (data) {
        data.forEach(item => {
          var time = new Date(parseInt(item.created) * 1000)
          var tpl = `<div class="item">
                    <h4><a href="${item.url}">${item.title}</a>
                    <div class="sub">
                      <a href="${item.author.url}">@${item.author.screenName}</a>
                      <a>${time.getFullYear()+'-'+(time.getMonth() + 1)+'-'+time.getDate()}</a>
                    </div></h4>
                  </div>`
          $('.blogbox .content').append($(tpl))
        });
        $('.feed .loadingbox').remove();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown)
        $('.feed .loadingbox').text('Oops! 加载失败');
      }
    })
  }

  var saysSwiper = new Swiper('.swiper-container', {
    speed: 2000,
    centeredSlides: true,
    grabCursor: true,
    parallax: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    }
  })

  var slogan = [
    '搞事情',
    '填坑',
    '咕咕咕',
    '吃顿好',
    '搞一个大新闻',
    '批判一番',
    '做不完美的设计',
    '改变世界',
    '写代码',
    'Change The World',
    '嘤嘤嘤',
    'Boom Shakalaka',
    '完成了不起的事情',
    'Make Neusoft Great Again',
  ];
  function random(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range);
    return num;
  }
  function randomWord() {
    return slogan[random(0, slogan.length - 1)];
  }
  function addWord() {
    var wordBox = $('.hello .slogan span');
    var wordElNow = $('.hello .slogan span b');
    var word = randomWord();
    while (word == wordElNow.text()) {
      word = randomWord();
    }
    var wordElNext = $('<b>' + word + '</b>')
    wordElNow.addClass('s-outing');
    wordElNext.addClass('s-entering');
    wordBox.append(wordElNext);
    wordBox.width(wordElNext.width());
    setTimeout(() => {
      wordElNext.removeClass('s-entering');
      wordElNow.remove();
    }, 1000);
  }
  setInterval(() => { addWord(); }, 4000)
  addWord();
})
