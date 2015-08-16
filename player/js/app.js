(function () {
    'use strict';

    var AudioPlayer = {
        audioContext: null,
        bufferSource: null,
        createBufferSourse: function (buffer) {
            this.bufferSource = this.audioContext.createBufferSource();
            this.bufferSource.loop = true;
            this.bufferSource.connect(this.audioContext.destination);
            AudioPlayer.bufferSource.buffer = buffer;
        },
        play: function () {
            /**
             * Recreate Buffer Source
             *
             * @see http://stackoverflow.com/questions/9439585/play-an-audiobuffersourcenode-twice
             */
            this.createBufferSourse(this.bufferSource.buffer);
            this.bufferSource.start(0);
        },
        stop: function () {
            this.bufferSource.stop();
        },
        pause: function () {
            this.bufferSource.stop();
        }
    };

    window.addEventListener('load', function init() {
        try {
            window.AudioContext = window.AudioContext;
            AudioPlayer.audioContext = new AudioContext();
            console.info('Web Audio API AudioContext created successfully');
        } catch (e) {
            alert('Web Audio API is not supported in this browser');
        }
    }, false);

    document.getElementById('input').addEventListener('change', function handleFiles() {
        var reader = new FileReader();
        reader.onload = function (ev) {
            AudioPlayer.audioContext.decodeAudioData(ev.target.result, function (buffer) {
                AudioPlayer.createBufferSourse(buffer);
                AudioPlayer.bufferSource.start(0);
            });
        };
        reader.readAsArrayBuffer(this.files[0]);
        document.getElementById('filename').innerHTML = this.files[0].name;
    }, false);

    document.getElementById('play').addEventListener('click', function handlePlay() {
        AudioPlayer.play();
    }, false);

    document.getElementById('pause').addEventListener('click', function handlePause() {
        AudioPlayer.pause();
    }, false);

    document.getElementById('stop').addEventListener('click', function handleStop() {
        AudioPlayer.stop();
    }, false);
})();
