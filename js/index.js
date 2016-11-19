window.onload = function() {
	//banner轮播图
	//下拉刷新
	var oScroll = null;
	var oPullDown = null;
	var oPullUp = null;
	var oScrollContainer = null;
	var oPullData = null;

	setTimeout(function() {
		oPullDown = $("#pull-down");
		oPullUp = $("#pull-up");
		oScrollContainer = $("#scroll-continer");
		oPullData = $("#pull-data");
		//新建scroll对象
		oScroll = new iScroll("running", {
			hScrollbar: false,
			vScrollbar: false,
			topOffset: oPullDown.height(),
			onScrollMove: function() {
				if(this.y > 5 && !oPullDown.hasClass("active")) {
					oPullDown.addClass("active").html("松手刷新页面！");
					this.minScrollY = 0; //初始minScrollY = -20，因为topOffset = oPullDown.height()
				} else if(this.y < 5 && oPullDown.hasClass("active")) {
					oPullDown.removeClass("active").html("下拉刷新");
				} else if(this.y < this.maxScrollY && !oPullUp.hasClass("active")) {
					oPullUp.addClass("active").html("松手加载数据");
				} else if(this.y < this.maxScrollY && oPullUp.hasClass("active")) {
					oPullUp.removeClass("active").html("上拉加载");
				}
				return false;
			},
			onScrollEnd: function() {
				if(oPullDown.hasClass("active")) {
					oPullDown.html("Loading....");
					 pullDownData();
				} else if(oPullUp.hasClass("active")) {
					oPullUp.html("Loading....");
					//pullUpData();
				}
				return false;
			},
			onRefresh: function() {
				if(oPullDown.hasClass("active")) {
					oPullDown.removeClass("active").html("下拉刷新");
					console.log(1);
				} else if(oPullUp.hasClass("active")) {
					oPullUp.removeClass("active").html("上拉加载");
					console.log(2);
				}
				return false;
			}

		});
		//console.log(oScroll);
		/*setTimeout(function () {
		    oScrollContainer.css({left:0});
		    console.log(oScroll);
		},200);*/

		function pullUpData() {
		$.ajax({
			type: 'get',
			url: 'http://list.mogujie.com/search?cKey=h5-shopping&fcid=&pid=9750&searchTag=&sort=pop&page=2&ratio=3%3A4&_version=1&_=1478610876280&callback=?',
			async:true,
			dataType:'JSONP',
			jsonp:'callback',
			success: function(data) {
				console.log(data);
				var arr = data.result.wall.docs;
				console.log(arr);
				$.each(arr, function(k,v) {
					$(".list").append('<a href="javascript:;" class="goods-item fl"><div class="goods-img"><img src="../img/double11.png" class="top-icon"><img src='+arr[k].img+' class="con-icon"></div><div class="goods-info"><div class="name-box"><p class="goods-name">'+arr[k].title+'</p></div><div class="bot-box"><p class="p-price fl">￥'+arr[k].price+'</p><p class="p-feed fr">'+arr[k].cfav+'</p></div></div></a>')
				});
				 oScroll.refresh();
			}
			
		})
	}, 100);

}