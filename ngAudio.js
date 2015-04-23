// ng-audio to overcome angular media bug
.directive('ngAudio', function(){
	return {
		scope: {
			ngAudio: "=",
			audioOff: "@"
		},
		link: function(scope, element, attr){
			if(attr.audioOff=='true'){
				return false;
			}
			var playing = false,
				canplay = false,
				loading = false,
				ending = false,
				error = false,
				html = document.getElementById("content-area"),
				// audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
				// audioElement = new Audio(scope.ngAudio);
				audioElement = document.createElement('audio');;
				// source = audioCtx.createBufferSource();

			audioElement.src = scope.ngAudio;
			element.addClass("audio-play");
			audioElement.preload = "auto";
			audioElement.loop = false;

			//出错了检测
			audioElement.addEventListener("error",function(){
				playing = false;
				error = true;
				element.removeClass("audio-play");
				element.removeClass("audio-pause");
				element.addClass("audio-end");
			});

			// 播放检测
			audioElement.addEventListener("canplay",function(){
				canplay = true;
			}, false);

			

			var addEnd = function(){
				audioElement.addEventListener("ended",function(){
					playing = false;
					element.removeClass("audio-play");
					element.removeClass("audio-pause");
					element.addClass("audio-end");
				}, false);
				addEnd = function(){};
			};
				

			// 点击事件，播放或者暂停
			element.on('click', function(event) {
				// Prevent default dragging of selected content
				// event.preventDefault();
				if(error)
				{

					$.warn("音频源错误");
					return false;
				}
				if(playing){
					$.greet("停止播放");
					audioElement.pause();
					playing = false;
					element.addClass("audio-play");
					element.removeClass("audio-pause");
					element.removeClass("audio-end");
				}
				else
				{
					// if(canplay){
					// 	$.greet("播放音频");
					// }
					// else{
					// 	$.greet("缓冲中，音频稍后自动播放");
					// }

					$.greet("缓冲，播放音频");

					audioElement.currentTime = 0.0;
					audioElement.play();

					//播完检测
					addEnd();
					
					playing = true;
					element.addClass("audio-pause");
					element.removeClass("audio-play");
					element.removeClass("audio-end");
				}
			});

			// 加入网页
			html.appendChild(audioElement);

			scope.$watch('ngAudio',function(){
				audioElement = new Audio(scope.ngAudio);
			});
		}
	}
})