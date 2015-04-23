# ngAudio
to overcome angular audio bugs

ngAudio: [url source of audio]

audioOff: [in init, if 'true'(String) then stop to load audio resource]

It can be binded to any element. And it will add three classes of status to the current element, such as 'audio-play', 'audio-pause', and 'audio-end'. You may use them to create the interface of your player.

It based on other notice plugin which should implement '$.warn()' and '$.greet()'.