var canvas;
var pointCanvas;
var ctx;

var colorPickerWidth;// it equals canvas width, setting on html
var smallRaudis;// the small raudis of wheel
var bigRaudis; // the big raudis of wheel
var imgSequ = 60;// setting the sequ of the event img. (Ori value is 107)
var smallerImgSequ = 60;
var bigImgSequ = 80; // setting the
var msSpan = 300; // setting time span to request, unit is millisecond
var drawed;

$(window).load(function () {
    if (!drawed) {
        drawColorPicker();
    }
});

// initial the color picker, draw the wheel color picker and bind the click event
// click event: 1. bind val on #Color; 2. call function controlColor; 3. redraw the wheel event img
function initColorPicker() {
    canvas = document.getElementById("myCanvas");
    pointCanvas = document.getElementById("pointCanvas");
    colorPickerWidth = canvas.width;
    smallRaudis = colorPickerWidth * 34 / 528;
    bigRaudis = colorPickerWidth * 252 / 528;
    if (canvas == undefined) {
        return;
    }
    ctx = canvas.getContext("2d");
    // IE
    if ((navigator.userAgent.match(/msie/i))) {
        drawColorPicker();
        if (!drawed) {
            $("#tulip").load(function () {
                drawColorPicker();
            });
        }
    } else {
        $("#tulip").load(function () {
            if (this.complete || this.readyState == "complete") {
                drawColorPicker();
            }
        });
    }

    pointCanvas.onclick = function (evt) {
        //  get mouse coordinates from event parameter
        var eventPos = getIntOffset(evt);
        updateColor(eventPos.X, eventPos.Y);
    };

    if ('ontouchmove' in document.documentElement) {
        pointCanvas.ontouchstart = canvasTouchStartHandler;
        pointCanvas.ontouchend = canvasTouchEndHandler;
    } else {
        pointCanvas.onmousedown = canvasMouseDownHandler;
        pointCanvas.onmouseup = canvasMouseUpHandler;
    }

}

function markPoint(colorvalue) {
    ctx = canvas.getContext("2d");
    var h1 = colorvalue.substr(0, 2);
    var h2 = colorvalue.substr(2, 2);
    var h3 = colorvalue.substr(4, 2);

    var r = parseInt(h1, 16);
    var g = parseInt(h2, 16);
    var b = parseInt(h3, 16);

    var shadowSequ = 15;
    var imagedata = ctx.getImageData(shadowSequ, shadowSequ, canvas.width - shadowSequ * 2, canvas.height - shadowSequ * 2);
    var data = imagedata.data;
    var index;
    for (var i = 0; i < data.length ; i += 4) {
        if (data[i]== r && data[i + 1] == g && data[i + 2] == b) {
            index = i / 4;
            var x = index % canvas.width + shadowSequ;
            var y = index / canvas.width + shadowSequ;
            console.info("X=" + x + "  Y=" + y);

            if (pointInWheel(x, y)) {
                reDrawEventImg(x, y);
                break;
            }
        }
    }
}

// draw the wheel color picker on canvas
function drawColorPicker() {
    drawed = true;
    var img = document.getElementById("tulip");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.width);
}

// draw the wheel event img on canvas
var eventImg = { X: -1, Y: 0 };
function reDrawEventImg(mouseX, mouseY) {
    if (!pointInWheel(mouseX, mouseY)) {
        return;
    }
    var pointCtx = pointCanvas.getContext("2d");
    eventImg = { X: mouseX - imgSequ / 2, Y: mouseY - imgSequ / 2 };
    pointCtx.clearRect(0, 0, pointCanvas.width, pointCanvas.height);
    var img = document.getElementById("imgMark");
    pointCtx.drawImage(img, eventImg.X, eventImg.Y, imgSequ, imgSequ);
}

function bigEventImg() {
    imgSequ = bigImgSequ;
}

function smallerEventImg() {
    imgSequ = smallerImgSequ;
}

// 1. bind val on #Color; 2. call function controlColor; 3. redraw the wheel event img
function updateColor(mouseX, mouseY) {
    if (pointInWheel(mouseX, mouseY) == false) {
        // Not in the wheel
        return;
    }

    //  get imageData object from canvas
    var imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // 3. redraw the wheel event img
    reDrawEventImg(mouseX, mouseY);

    //  get pixelArray from imagedata object
    var data = imagedata.data;
    //  calculate offset into array for pixel at mouseX/mouseY
    var i = ((mouseY * canvas.width) + mouseX) * 4;
    //  get RGBA values
    var hexVal = (d2Hex(data [i]) + d2Hex(data[i + 1]) + d2Hex(data[i + 2]));
}

function canvasMouseDownHandler(event) {
    var eventPos = getIntOffset(event);
    pointCanvas.onmousemove = canvasMouseMoveHandler;
    bigEventImg();
    reDrawEventImg(eventPos.X, eventPos.Y);
}

// move image follow the event when move
function canvasMouseMoveHandler(event) {
    event.preventDefault();
    var eventPos = getIntOffset(event);
    updateColor(eventPos.X, eventPos.Y);
}

function canvasMouseUpHandler(event) {
    pointCanvas.onmousemove = null;
    var eventPos = getIntOffset(event);
    reDrawEventImg(eventPos.X, eventPos.Y);
    smallerEventImg();
}

function canvasTouchStartHandler(event) {
    var eventPos = getOtherToucchIntOffset(event);
    pointCanvas.ontouchmove = canvasTouchMoveHandler;
    bigEventImg();
    reDrawEventImg(eventPos.X, eventPos.Y);
}

// move image follow the event when move
function canvasTouchMoveHandler(event) {
    event.preventDefault();
    var eventPos = getOtherToucchIntOffset(event);
    updateColor(eventPos.X, eventPos.Y);
}

function canvasTouchEndHandler(event) {
    pointCanvas.ontouchmove = null;
    var eventPos = getToucchEndIntOffset(event);

    smallerEventImg();
    reDrawEventImg(eventPos.X, eventPos.Y);
}

// get offset of event for all of the browsers, and parseInt it.
function getIntOffset(event) {
    var evt = event || window.event;
    var srcObj = evt.target || evt.srcElement;
    if (evt.offsetX) {
        return { X: parseInt(evt.offsetX), Y: parseInt(evt.offsetY) };
    } else {
        var rect = srcObj.getBoundingClientRect();
        return { X: parseInt(evt.clientX - rect.left), Y: parseInt(evt.clientY - rect.top) };
    }
}

function getOtherToucchIntOffset(event) {
    return getToucchIntOffset(event.touches[0]);
}

function getToucchEndIntOffset(event) {
    return getToucchIntOffset(event.changedTouches[0]);
}

function getToucchIntOffset(touch) {
    var pageX = Number(touch.pageX);
    var pageY = Number(touch.pageY);
    var divCanvas = $("#divCanvas");
    return { X: pageX - divCanvas[0].offsetLeft, Y: pageY - divCanvas[0].offsetTop };
}

function pointInWheel(mouseX, mouseY) {
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    var xdiff = centerX - mouseX;
    var ydiff = centerX - mouseY;
    var distance = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
    return distance > smallRaudis && distance < bigRaudis - bigImgSequ / 4 - 12 * 400 / 528;
}

// converts a decimal number to a two digit Hex value
function d2Hex(d) {
    var hex = Number(d).toString(16);
    while (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex.toUpperCase();
}