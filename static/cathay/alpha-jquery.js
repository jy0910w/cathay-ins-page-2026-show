
function initial_iframe() {
	var showTimeOutID;
	var closeTimeOutId;
	var ssoToken = $('#uniquePageNo').val();
	// console.log('123='+ssoToken);
	
	setTimeout(function() {
		$('.smart_say').css('display', 'none')
	}, 5000);
	
	//2020-07-08 停滯60秒 會自動say hi
	function showHelp(){
		clearTimeout(closeTimeOutId);
		clearTimeout(showTimeOutID);
		if($('.smart_box').css('display') === 'none'){
			showTimeOutID = setTimeout(function(){
				$('#helpINS').css('display', 'block');
				closeHelp();
			},60000)
		}
	}
	
	function closeHelp(){
		closeTimeOutId = setTimeout(function() {
			$('#helpINS').css('display', 'none');
			showHelp();
		}, 10000);
	}
	
	setTimeout(function(){$('#hiINS').css('display','none'); showHelp();},10000);
	
	$('.smart_alpha').on('mouseover', function() {	
		clearTimeout(closeTimeOutId);
		clearTimeout(showTimeOutID);
		$('#hiINS').css('display', 'none');
		$('#helpINS').css('display', 'none');
		//2020-07-08 判斷阿發是否有開對話框,沒開show hi
		if($('.smart_box').css('display') === 'none'){
			$('#helpINS').css('display', 'block');
		}
	});
	
	$('.smart_alpha').on('mouseleave', function() {
		$('#helpINS').css('display', 'none');
		showHelp();
	});
	
	
	$('.smart_alpha').click(function() {
						var protocol = window.location.protocol;
						var host = window.location.hostname;
						var $this = $(this);
						var iframe_src = $('.smart_box iframe').attr('src');
						var ssoToken1 = $('#uniquePageNo').val();
						
						//判斷開啟方式
						var isSameOrigin = false;
						if ('swww.cathay-ins.com.tw' == host || 'www.cathay-ins.com.tw' == host || 'localhost' == host) {
							isSameOrigin = true;
						}
						
						//判斷阿發網址
						var alphahost = 'www.cathay-ins.com.tw';
						var hostIp = host.substring(0, 8);
						if ('swww.cathay-ins.com.tw' == host || 'smi.cathay-ins.com.tw' == host || '88.8.143' == hostIp || '88.8.111' == hostIp || '10.175.2' == hostIp || '10.176.1' == hostIp) {
							alphahost = 'swww.cathay-ins.com.tw';
						}
						
						var cathayUrl = "https://" + alphahost +'/ChatWeb/chat?TOKEN='+ssoToken1;
						console.log('456='+ssoToken1);
						
						//國泰產險文字客服
						//var cathayUrl = "https://" + alphahost +'/ChatWeb/chatLiveService';
						
						
						if (document.body.clientWidth < 450 || ! isSameOrigin || document.body.clientHeight < 750) {
							window.open(cathayUrl)
						} else {
							if (iframe_src == '') {
								$('.smart_box iframe').attr('src', cathayUrl);
							}
							$this.hasClass('shut') ? $this.addClass('end') : $this.removeClass('end');
							$('.smart_box').toggle();
							$this.toggleClass('shut');
							$('.smart_say').css('display', 'none');
							$('.smart_all').css('z-index', '1100')
						}
					})
}