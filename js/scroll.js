window.onload = function() {
	//var oSection = $("#run");

	var oPullUp = $("#pull-up"),
		oScroll = null;

	oScroll = new iScroll("con", {
		hScrollbar: false,
		vScrollbar: false,
		onScrollMove: function() {
			console.log(this.y)
			console.log(this.maxScrollY);
			if(this.y < this.maxScrollY && !oPullUp.hasClass("up")) {
				oPullUp.addClass("up").html('放开手加载数据 ');
			} else if(this.y >= this.maxScrollY && oPullUp.hasClass("up")) {
				oPullUp.removeClass("up").html('上拉加载');
			} else if(this.y < -10) {
				$('header').css({
					display: 'none'
				});
			} else if(this.y > -10) {
				$('header').css({
					display: 'block'
				});
			}
		},
		onScrollEnd: function() {
			if(oPullUp.hasClass('up')) {
				oPullUp.html('Loading');
				pullUpData();
			}
		},
		onRefresh: function() {
			if(oPullUp.hasClass("up")) {
				oPullUp.removeClass("up").html("上拉加载");
			}
		},
	});
	console.log(oScroll);
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
					$(".list").append('<a href="javascript:;" class="goods-item fl"><div class="goods-img"><img src='+arr[k].img+' class="con-icon"></div><div class="goods-info"><div class="name-box"><p class="goods-name">'+arr[k].title+'</p></div><div class="bot-box"><p class="p-price fl">￥'+arr[k].price+'</p><p class="p-feed fr">'+arr[k].cfav+'</p></div></div></a>')
				});
				 oScroll.refresh();
			}
		})
	}

}