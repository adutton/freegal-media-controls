// ==UserScript==
// @name         Freegal Media Controls
// @namespace    https://github.com/adutton/
// @version      1.1
// @description  Adds media button (next, prev) and music metadata support to Freegal
// @author       Aaron Dutton (https://github.com/adutton)
// @updateURL    https://raw.githubusercontent.com/adutton/freegal-media-controls/main/freegal-media-controls.user.js
// @downloadURL  https://raw.githubusercontent.com/adutton/freegal-media-controls/main/freegal-media-controls.user.js
// @match        https://*.freegalmusic.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const updateDelayMilliseconds = 200;

    function isPlayerVisible() {
        return (document.querySelector('.fp-playbtn') !== null);
    }

    function isPlaying() {
        return (document.querySelector('.fp-playbtn[title=Pause]') !== null);
    }

    function updateMetadata() {
        if (!isPlayerVisible()) {
            return;
        }

        var newTitle = document.querySelector('.song-name').innerText + ' - ' + document.querySelector('.artist-name').innerText;
        if (document.title === newTitle) {
            return;
        }
        document.title = newTitle;
        navigator.mediaSession.metadata = new MediaMetadata({
            title: document.querySelector('.song-name').innerText,
            artist: document.querySelector('.artist-name').innerText,
            artwork: [
                { src: document.querySelector('.album-image img').src, sizes: '250x250', type: 'image/jpg' },
            ]
        });
    }

    function previousTrack() {
        if (document.getElementById('player-prev-btn')) {
            document.getElementById('player-prev-btn').click();
            window.setTimeout(updateMetadata, updateDelayMilliseconds);
        }
    }

    function nextTrack() {
        if (document.getElementById('player-next-btn')) {
            document.getElementById('player-next-btn').click();
            window.setTimeout(updateMetadata, updateDelayMilliseconds);
        }
    }

    var attacher = window.setInterval(function () {
        var videoEngine = document.getElementsByClassName('fp-engine')[0];
        if (videoEngine)
        {
            console.log("videoEngineInterval: attached");
            videoEngine.addEventListener('DOMSubtreeModified', () => { window.setTimeout(updateMetadata, 1000); });

            navigator.mediaSession.setActionHandler('previoustrack', previousTrack);
            navigator.mediaSession.setActionHandler('nexttrack', nextTrack);

            updateMetadata();
            window.clearInterval(attacher);
        }
    }, 1000);
})();
