function move(e) {

  var elem = document.getElementById(e.target.id);
  var zindex = document.getElementById('z');

  elem.onmousemove = function(e) {
    var coords = getCoords(elem);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;

    if (shiftX > (e.target.clientWidth-30) && shiftY > (e.target.clientHeight-30)) { //resize image
      elem.style.cursor = 'nw-resize';

      elem.onmousedown = function(e) {

        document.onmousemove = function(e) {
          elem.style.width = e.pageX - coords.left + 'px';
        };

        document.onmouseup = function(e) {
          document.onmousemove = null;
          document.onmouseup = null;
        }
      };
    }
    else if (shiftY < 20) { //change z-index
      elem.style.cursor = 'row-resize';

      elem.onmousedown = function(e) {
        var start = e.pageY;

        document.onmousemove = function(e) {
          document.body.style.cursor = 'row-resize';
          elem.style.cursor = 'row-resize';
          elem.style.zIndex = start - e.pageY;
          zindex.innerHTML = 'z-index: ' + (start - e.pageY);
          zindex.style.top = e.pageY-15 + 'px';
          zindex.style.left = e.pageX+10 + 'px';
          zindex.style.display = 'inline';
        }

        document.onmouseup = function(e) {
          document.body.style.cursor = 'default';
          document.onmousemove = null;
          document.onmouseup = null;
          zindex.style.display = 'none';
        }
      }
    }
    else { //move image
      elem.style.cursor = 'move';

      elem.onmousedown = function(e) {

        elem.style.position = 'absolute';

        function moveAt(e) {
          elem.style.left = e.pageX - shiftX + 'px';
          elem.style.top = e.pageY - shiftY + 'px';
        };

        document.onmousemove = function(e) {
          moveAt(e);
        };

        elem.onmouseup = function() {
          document.onmousemove = null;
          elem.onmouseup = null;
        };
      };

      elem.ondragstart = function() {
        return false;
      };
    };
  }
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
