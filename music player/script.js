let playBtn = document.getElementById("play")
let nextBtn = document.getElementById("next")
let previousBtn = document.getElementById("previous")
let progressBar = document.getElementById("progress-bar")
let volumeControl = document.getElementById("volume")
let songTitle = document.getElementById("title")
let author = document.getElementById('author')
let cover = document.getElementById("cover")
let playAnim = document.getElementById("m-p-c")
let currentTime = document.getElementById("current-time")
let durationTime = document.getElementById("duration-time")
let volumeIcon = document.getElementById("volume-icon")
let songRepeat = document.getElementById("repeat-icon")
let songIndex = 0;

// Songs
let songs = [
    {songName: "Mortals (feat. Laura Brehm)", authorName: "Warriyo", songPath: "songs/1.mp3", songCover: "cover/1.jpg"},
    {songName: "Huma-Huma", authorName: "Cielo", songPath: "songs/2.mp3", songCover: "cover/2.jpg"},
    {songName: "Invincible", authorName: "DEAF KEV", songPath: "songs/3.mp3", songCover: "cover/3.jpg"},
    {songName: "My Heart", authorName: "Different Heaven & EH!DE", songPath: "songs/4.mp3", songCover: "cover/4.jpg"},
    {songName: "Heroes Tonight (feat. Johnning)", authorName: "Janji", songPath: "songs/5.mp3", songCover: "cover/5.jpg"},
]
let song = new Audio (songs[songIndex].songPath);

// Song Play Function
let songPlay = () => {
    if (song.paused || song.currentTime <= 0) {
        song.play()
        playBtn.classList.remove("fa-play")
        playBtn.classList.add("fa-pause")
        coverAnimStart()
    }
    else {
        song.pause();
        playBtn.classList.remove("fa-pause")
        playBtn.classList.add("fa-play")
        coverAnimStop()
    }
    infoUpdate()
}

// Next Function
let next = () => {
    if (songIndex >= 4) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    song.src = `songs/${songIndex + 1}.mp3`
    songPlay()
}

// Previous Function
let previous = () => {
    if (songIndex > 0) {
        songIndex -= 1
    }
    else {
        songIndex = songs.length - 1; 
    }
    song.src = `songs/${songIndex + 1}.mp3`
    songPlay()
}

// Play Button
playBtn.addEventListener('click', () => {
    songPlay()
} )

// Next Button
nextBtn.addEventListener('click', () => {
    next()
})

// Previous Button
previousBtn.addEventListener('click', () => {
    previous()
})

// Progressbar Update
song.addEventListener('timeupdate', () => {
    progressBar.value = song.currentTime / song.duration * 100;
})

// Progressbar Input Change
progressBar.addEventListener('input', (e) => {
    song.currentTime =  e.target.value * song.duration / 100;
    if (song.paused || song.currentTime <= 0) {
        song.play()
        playBtn.classList.remove("fa-play")
        playBtn.classList.add("fa-pause")
        coverAnimStart()
    }
    infoUpdate()
})

// Volume Control
volumeControl.addEventListener('input', (e) => {
    song.volume = e.target.value / 100
    if (song.volume <= 0) {
        volumeIcon.classList.remove("fa-volume-high")
        volumeIcon.classList.add("fa-volume-xmark")
    }
    else {
        volumeIcon.classList.remove("fa-volume-xmark")
        volumeIcon.classList.add("fa-volume-high")
    }
})

// Update Info
let infoUpdate = () => {
    songTitle.innerText = songs[songIndex].songName;
    author.innerText = songs[songIndex].authorName;
    cover.src = songs[songIndex].songCover;
}

// Cover Animation 
let coverAnimStart = () => {
    playAnim.classList.add("play-anim")
}
let coverAnimStop= () => {
    playAnim.classList.remove("play-anim")
}

// Song Next Or Repeat
song.addEventListener('ended', () => {
    if (song.loop) {
        song.loop()
    }
    else {
        next()
    }
})

// Song Ended Repeat Function
songRepeat.addEventListener('click', () => {
    if (!song.loop) {
        song.loop = true
        songRepeat.classList.add("repeat-active")
    }
    else {
        song.loop = false
        songRepeat.classList.remove("repeat-active")
    }

})

// Update Song Time
let timesUpdate = () => {
    let currMin = Math.floor(song.currentTime / 60)
    let currSec = Math.floor(song.currentTime - currMin * 60)
    let durarMin = Math.floor(song.duration / 60)
    let duraSec = Math.floor(song.duration - durarMin * 60)

    if (song.duration){
        if (currMin < 10) {
            currMin = `0${currMin}`
        }
        if (currSec < 10) {
            currSec = `0${currSec}`
        }
        if (durarMin < 10) {
            durarMin = `0${durarMin}`
        }
        if (duraSec < 10) {
            duraSec = `0${duraSec}`
        }

        currentTime.innerHTML = `${currMin}:${currSec}`
        durationTime.innerHTML = `${durarMin}:${duraSec}`    
    }
    else {
        currentTime.innerHTML = `00:00`
        durationTime.innerHTML = `00:00`
    }
}

// Song Time Update Function
song.addEventListener('timeupdate', timesUpdate)



