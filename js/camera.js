window.onload = function (){
	    document.addEventListener('plusready', function() {
				//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
				$("#btn").click(function() {
					var myCam = plus.camera.getCamera();
					console.log(myCam);
					var myFormat = myCam.supportedImageFormats;
					$("#showDiv").append(myCam.supportedImageResolutions);
					myCam.captureImage(function(capturedFile) {
						console.log(capturedFile);
						// 					$("#showImg").attr("src",capturedFile);
						plus.io.resolveLocalFileSystemURL(capturedFile, function(entry) {
							$("#showImg").attr("src", entry.fullPath);

						}, function(error) {

						});

					}, function(error) {
						var code = error.code; // 错误编码
						var message = error.message; // 错误描述信息

					}, {
						format: myFormat,
						index: "1",
					});
				});
			});
}
