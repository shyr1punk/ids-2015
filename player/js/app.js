(function (AudioPlayer) {
    'use strict';

    /**
     * Create an audio buffer from passed file
     *
     * @param {File} file
     */
    function createAudioBufferFromFile(file) {
        var reader = new FileReader();
        reader.onload = function (ev) {
            AudioPlayer.audioContext.decodeAudioData(ev.target.result, function (buffer) {
                AudioPlayer.createBufferSourse(buffer);
                AudioPlayer.bufferSource.start(0);
            });
        };
        reader.readAsArrayBuffer(file);
        document.getElementById('filename').innerHTML = file.name;
    }

    /**
     * When page is loaded initialize WebAudioAPI
     */
    window.addEventListener('load', function init() {
        try {
            window.AudioContext = window.AudioContext;
            AudioPlayer.audioContext = new AudioContext();
            console.info('Web Audio API AudioContext created successfully');
        } catch (e) {
            alert('Web Audio API is not supported in this browser');
        }
    }, false);

    /**
     * Load file from input as array buffer
     */
    document.getElementById('input').addEventListener('change', function handleFiles() {
        createAudioBufferFromFile(this.files[0]);
    }, false);

    /**
     * Handle click Play button
     */
    document.getElementById('play').addEventListener('click', function handlePlay() {
        AudioPlayer.play();
    }, false);

    /**
     * Handle click Pause button
     */
    document.getElementById('pause').addEventListener('click', function handlePause() {
        AudioPlayer.pause();
    }, false);

    /**
     * Handle click Stop button
     */
    document.getElementById('stop').addEventListener('click', function handleStop() {
        AudioPlayer.stop();
    }, false);

    var dropZone = document.getElementById('drop-zone');
    /**
     * Drag files over drop-zone
     */
    dropZone.addEventListener('dragover', function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }, false);

    /**
     * Drop files
     */
    dropZone.addEventListener('drop', function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.dataTransfer.files;
        createAudioBufferFromFile(files[0]);
    }, false);

})(window.AudioPlayer);
