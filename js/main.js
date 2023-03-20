console.log ('js is wired')
const spanElements = document.querySelectorAll('.bubbles span');

spanElements.forEach(span => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  span.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
});


let puzzleBoard = document.querySelector(".puzzle-board"),
    puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
    dropZones = document.querySelectorAll('.dropZone'),
    puzzlePiece = document.querySelector(".puzzle-pieces"),
    loopButtons = document.querySelectorAll('.loopButton'),
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
      this.appendChild(draggedPiece);
    
      // this line is going to move the dragged piece from the left side of the board
      // into whatever drop zone we choose. appendChild means "add element to the container"

    }




// add the drag event handling to the puzzle pieces
puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

// add the dragover AND the drop event handling to the drop zones
dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));



// add the drop event handling
dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));