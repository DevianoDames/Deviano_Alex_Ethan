console.log ('js is wired')
const spanElements = document.querySelectorAll('.bubbles span');

spanElements.forEach(span => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  span.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
});



let puzzleBoard = document.querySelector('.puzzle-board'),
    puzzlePieces = document.querySelectorAll('.puzzle-pieces img'),
    dropZones = document.querySelectorAll('.dropZone'),
    puzzlePiece = document.querySelector('.puzzle-pieces'),
    audioLoops = document.querySelectorAll('.audioLoops'),
    djAnimations = document.querySelectorAll('.djAnimation'),
    playButton = document.querySelector('#playButton'),
    pauseButton = document.querySelector('#pauseButton'),
    resetPuzzle = document.querySelector('#reset'),
    volumeControl = document.querySelector('#volumeControl'),
    masterAudio = null,
    draggedPiece;




    function handleStartDrag() { 
      console.log('started dragging this piece:', this);
      
      // store a reference to the puzzle piece image that we're dragging
      // so we can use it later and move it to a drop zone
      draggedPiece = this;
    }
    
    function handleDragOver(e) { 
      e.preventDefault(); // e is shorthand for event
      // this overrides the default dragover behaviour
      console.log('dragged over me'); 
    }
    
    function handleDrop(e) { 
      e.preventDefault();
      console.log('dropped something on me');
      // bug fix #1 should go here, and it's at most 3 lines of JS code
    
      if (this.children.length >= 1) {
        console.log('puzzle piece already here please change');
        return;
      }
      draggedPiece.style.width = "65px";
      draggedPiece.style.height = "65px";
      this.appendChild(draggedPiece);

    
      const audioKey = draggedPiece.getAttribute("data-key");
      const audioElement = document.querySelector(`audio[data-key="${audioKey}"]`);
      audioElement.currentTime = 0;
      playButton.addEventListener('click', function () {
        audioElement.play();
      });

      pauseButton.addEventListener('click', function () {
        audioElement.pause();
        pauseAnimation();
      });

      // The way that matches each audio, set the master audio first, and the next audio will  match the main based on the current time
      // Master audio = audio current time by using if this is master audio, else
      if (masterAudio === null) {
        masterAudio = audioElement;
      } else {
        audioElement.currentTime = masterAudio.currentTime;
      }

      audioElement.play();
      checkAnimations();
      
    
      // audioElement.play();
      // audioElement.addEventListener('loadedmetadata', function() {
      
      //   playButton.addEventListener('click', function() {
      //     audioElement.play();
      //   });
    
       
      //   pauseButton.addEventListener('click', function() {
      //     audioElement.pause();
      //   });
      // });
    
      // audioElement.load();
    
    }

    function playAnimation() {
      djAnimations.forEach(anim => anim.style.webkitAnimationPlayState = 'running');
    }
    
    function pauseAnimation() {
      djAnimations.forEach(anim => anim.style.webkitAnimationPlayState = 'paused');
    }

    // function pauseAnimation() {
    //   djAnimations.forEach(anim => anim.style.webkitAnimationPlayState = 'paused');
    // }
  
    // function runAnimation() {
    //   djAnimations.forEach(anim => anim.style.webkitAnimationPlayState = 'running');
    // }
  
    // function checkAnimations() {
    //   if (dropZones.children == 0) {
    //     pauseAnimation();
    //     return;
    //   } 
    //     runAnimation();
    //   }
    
    // control graphic animations by using both paly and pause buttons
    function checkAnimations() {
      let anyDropZoneFilled = false;
      dropZones.forEach(zone => {
        if (zone.children.length > 0) {
          anyDropZoneFilled = true;
        }
      });
    
      if (anyDropZoneFilled) {
        playAnimation();
      } else {
        pauseAnimation();
      }
    }

    function resetAll() {
      location.reload();
      console.log('reset all')
    }


    function setVolume() {
      const volume = volumeControl.value / 100;
      audioLoops.forEach(audio => {
        audio.volume = volume;
      });
    }
 
    // resetPuzzle.addEventListener('click', function() {
    //   location.reload();
    // });
    
 

    // function resetInstrument() {
    //   debugger
    //   dropZones.forEach((zone) => {
    //     while(zone.firstChild) {
    //     puzzlePieces.appendChild((zone.firstChild));
    //       }
    //     })
    //     console.log('Reset all puzzlePieces from puzzle board to left side');
      
    // }

  
    

    // function playAudio() {
    //   debugger
    //   const audioKey = draggedPiece.getAttribute("data-key");
    //   const audioElement = document.querySelector(`audio[data-key="${audioKey}"]`);
    //   audioElement.currentTime = 0;
    //   audioElement.play();
    // }
    // function pauseAudio() {
    //   debugger
    //   const audioKey = draggedPiece.getAttribute("data-key");
    //   const audioElement = document.querySelector(`audio[data-key="${audioKey}"]`);
    //   audioElement.currentTime = 0;
    //   audioElement.pause();
    // }


  // function playAudio() {audioLoops.play();}


// add the drag event handling to the puzzle pieces
puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

// add the dragover AND the drop event handling to the drop zones
dropZones.forEach(zone => {
  zone.addEventListener("dragover", handleDragOver);
  zone.addEventListener("drop", handleDrop);
});
// dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));



// add the drop event handling
dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));

// add the animation pause when the widow loads
djAnimations.forEach(controller => controller.style.webkitAnimationPlayState = 'paused');

// music button control
playButton.addEventListener('click', playAnimation);
pauseButton.addEventListener('click', pauseAnimation);
volumeControl.addEventListener('input', setVolume);

// reset button
// resetPuzzle.addEventListener('click', resetInstrument);
resetPuzzle.addEventListener('click', resetAll);


// window.addEventListener('load', pauseAnimation);



// playButton.addEventListener('click', playAudio);
// playButton.addEventListener('click', function () {
//   audioLoops.forEach(audio => audio.play());
// });

// pauseButton.addEventListener('click', pauseAudio);
// pauseButton.addEventListener('click', function () {
//   audioLoops.forEach(audio => audio.pause());
// });


// audioLoops.forEach(audios => audios.addEventListener("drop", loadAudio));
// audioLoops.forEach(audios => audios.addEventListener("click", loadAudio));