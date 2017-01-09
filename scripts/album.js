var createSongRow = function(songNumber, songName, songLength) {
    var template =
      '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;
    
    var $row = $(template);
    
    var clickHandler = function() {
    	var songNumber = parseInt($(this).attr('data-song-number'));
    
    	if (currentlyPlayingSongNumber !== null) {
    		var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
    		currentlyPlayingCell.html(currentlyPlayingSongNumber);
    	}
    	if (currentlyPlayingSongNumber !== songNumber) {
    		$(this).html(pauseButtonTemplate);
    		setSong(songNumber);
    	} else if (currentlyPlayingSongNumber === songNumber) {
    		$(this).html(playButtonTemplate);
    		$('.main-controls .play-pause').html(playerBarPlayButton);
    		currentlyPlayingSongNumber = null;
    		currentSongFromAlbum = null;
    	}
    	
    	updatePlayerBarSong();
    };
    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    $albumSongList.empty();
    
    for (var i=0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    var nextSongIndex;
    var prevSongIndex = parseInt(trackIndex(currentAlbum, currentSongFromAlbum));
    var $prevPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);

    if (currentlyPlayingSongNumber === currentAlbum.songs.length) {
        nextSongIndex = 0;
    }
    else {
        nextSongIndex = parseInt(trackIndex(currentAlbum, currentSongFromAlbum) + 1);
    }

    var $nextPlayingCell = getSongNumberCell(nextSongIndex + 1);
    
    setSong(nextSongIndex+1);
    updatePlayerBarSong();
    
    $prevPlayingCell.html($prevPlayingCell.attr('data-song-number'));
    $nextPlayingCell.html(pauseButtonTemplate);
};

var previousSong = function() {
    var nextSongIndex;
    var prevSongIndex = parseInt(trackIndex(currentAlbum, currentSongFromAlbum));
    var $prevPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);

    if (currentlyPlayingSongNumber === 1) {
        nextSongIndex = parseInt(currentAlbum.songs.length - 1);
    }
    else {
        nextSongIndex = parseInt(trackIndex(currentAlbum, currentSongFromAlbum) - 1);
    }

    var $nextPlayingCell = getSongNumberCell(nextSongIndex + 1);
    
    setSong(nextSongIndex+1);
    updatePlayerBarSong();
    
    $prevPlayingCell.html($prevPlayingCell.attr('data-song-number'));
    $nextPlayingCell.html(pauseButtonTemplate);
    
};

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);

    $('.main-controls .play-pause').html(playerBarPauseButton);
    
};

var setSong = function(songNumber) {
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[parseInt(songNumber)-1];
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]')
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});
