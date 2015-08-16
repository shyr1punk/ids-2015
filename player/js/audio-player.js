(function (global) {
    'use strict';
    global.AudioPlayer = {
        audioContext: null,
        bufferSource: null,
        /**
         * Create source buffer from file buffer
         *
         * @param buffer
         */
        createBufferSourse: function (buffer) {
            this.bufferSource = this.audioContext.createBufferSource();
            this.bufferSource.loop = true;
            this.bufferSource.connect(this.audioContext.destination);
            AudioPlayer.bufferSource.buffer = buffer;
        },
        /**
         * Play action
         */
        play: function () {
            /**
             * Recreate Buffer Source
             *
             * @see http://stackoverflow.com/questions/9439585/play-an-audiobuffersourcenode-twice
             */
            this.createBufferSourse(this.bufferSource.buffer);
            this.bufferSource.start(0);
        },
        /**
         * Stop action
         */
        stop: function () {
            this.bufferSource.stop();
        },
        /**
         * Pause action
         */
        pause: function () {
            this.bufferSource.stop();
        }
    };
})(window);
