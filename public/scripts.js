const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const trackList = document.getElementById('track-list');

let isPlaying = false;
let tracks = [];
let currentTrackIndex = 0;

async function fetchTracks() {
    const response = await fetch('/api/tracks');
    tracks = await response.json();
    displayTracks();
}

function togglePlayPauseIcon(button, isPlaying) {
    if (isPlaying) {
        button.innerHTML = '&#10074;&#10074;'; // Pause icon
    } else {
        button.innerHTML = '&#9658;'; // Play icon
    }
}

function displayTracks() {
    trackList.innerHTML = '';
    tracks.forEach((track, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'track-item';
        const trackButton = document.createElement('button');
        const trackInfo = document.createElement('span');
        togglePlayPauseIcon(trackButton, false); // Set initial icon to play icon
        trackButton.addEventListener('click', () => {
            if (currentTrackIndex === index) {
                // Toggle between play and pause for the current track
                isPlaying ? audio.pause() : audio.play();
                togglePlayPauseIcon(trackButton, isPlaying);
            } else {
                // Play the selected track
                currentTrackIndex = index;
                playTrack();
                // Update all buttons to show the correct icons
                const allTrackButtons = document.querySelectorAll('.track-item button');
                allTrackButtons.forEach((btn, btnIndex) => {
                    togglePlayPauseIcon(btn, btnIndex === currentTrackIndex && isPlaying);
                });
            }
        });
        trackInfo.textContent = `${track.track_name} - ${track.track_artist}`;
        listItem.appendChild(trackButton);
        listItem.appendChild(trackInfo);
        trackList.appendChild(listItem);
    });
}

function playTrack() {
    // Update all buttons to show the play icon
    const allTrackButtons = document.querySelectorAll('.track-item button');
    allTrackButtons.forEach((btn) => {
        togglePlayPauseIcon(btn, false);
    });

    // Set the source of the audio element to the current track file
    audio.src = tracks[currentTrackIndex].file;
    // Play the audio
    audio.play();
    isPlaying = true; // Update isPlaying variable
    // Update the play/pause icon of the current track to show the pause icon
    togglePlayPauseIcon(allTrackButtons[currentTrackIndex], true);
}



playBtn.addEventListener('click', () => {
    isPlaying ? audio.pause() : audio.play();
});

// Additional event listeners to ensure the play/pause icon is updated correctly
audio.addEventListener('play', () => {
    isPlaying = true;
    playBtn.textContent = 'Pause';
    togglePlayPauseIcon(document.querySelectorAll('.track-item button')[currentTrackIndex], true);
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    playBtn.textContent = 'Play';
    togglePlayPauseIcon(document.querySelectorAll('.track-item button')[currentTrackIndex], false);
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack();
    isPlaying = true; // Update isPlaying variable
});

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack();
    isPlaying = true; // Update isPlaying variable
});

fetchTracks();
