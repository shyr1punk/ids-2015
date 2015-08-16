(function () {
    'use strict';
    var inputElement = document.getElementById('input');
    var context;
    var audio_player;
    window.addEventListener('load', init, false);
    function init() {
        try {
            window.AudioContext = window.AudioContext;
            context = new AudioContext();
            console.info('Web Audio API AudioContext created successfully');
        } catch (e) {
            alert('Web Audio API is not supported in this browser');
        }
    }
    inputElement.addEventListener('change', handleFiles, false);
    document.getElementById('play').addEventListener('click', function () {
        audio_player.play();
    }, false);
    document.getElementById('pause').addEventListener('click', function () {
        audio_player.pause();
    }, false);
    // TODO: check selecting file
    function handleFiles() {
        var fileList = this.files;
        console.log(fileList);
        var file = URL.createObjectURL(fileList[0]);
        audio_player.src = file;
        audio_player.play();
    }
})();
