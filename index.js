var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')


autosetcanvas(yyy)

listenToMouse(yyy)

var eraserEnabled = false //控制橡皮擦是否开启
eraser.onclick = function() {
    eraserEnabled = true
    actions.className = 'actions x'

}
brush.onclick = function() {
    eraserEnabled = false
    actions.className = 'actions'

}

//++++++++++++++++++++++++++++++++++++++++++++//

function drawcircle(x, y, radius) {
    context.beginPath()
    context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}


function drawline(x1, y1, x2, y2) {
    var context = xxx.getContext('2d')
    context.beginPath()
    context.strokeStyle = 'black'
    context.moveTo(x1, y1)
    context.lineWidth = 5
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}
//+++++++++++++++++++++++++++++设置canvas的宽高数值//
function autosetcanvas(canvas) { //
    setcanvas() //执行函数

    window.onresize = function() { //当页面大小变动时,执行函数
        setcanvas()
    }

    function setcanvas() { //函数获取页面的长度和宽度并赋值给xxx
        var pagewidth = document.documentElement.clientWidth
        var pageheight = document.documentElement.clientHeight

        canvas.width = pagewidth
        canvas.height = pageheight
    }
}
//++++++++++++++++++++++++++++++//
function listenToMouse(canvas) {


    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    canvas.onmousedown = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10) //如果点击橡皮擦则清除x,y
        } else {
            lastPoint = {
                "x": x,
                "y": y
            }
        }


        console.log(lastPoint)
            // drawcircle(x, y, 1)
    }
    canvas.onmousemove = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY

        if (!using) { //如果没有点击橡皮擦则直接return
            return
        }
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                    "x": x,
                    "y": y
                }
                // drawcircle(x, y, 1)
            drawline(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint //实时更新最后一个点
        }
    }
    canvas.onmouseup = function(aaa) {
        using = false
    }
}