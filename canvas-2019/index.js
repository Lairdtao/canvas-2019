var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')
var lineWidth = 5



autosetcanvas(yyy)

listenToMouse(yyy)

var eraserEnabled = false //控制橡皮擦是否开启

pen.onclick = function() {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function() {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = function() {
    context.clearRect(0, 0, yyy.width, yyy.height); //用等同于页面大小的空白填充页面达到清空的效果
}
save.onclick = function() {
    var url = yyy.toDataURL("img/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.save = '我的画'
    a.target = '_blank'
    a.click()
}

black.onclick = function() {
    context.strokeStyle = 'black'
    black.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    red.classList.remove('active')
}

red.onclick = function() {
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
green.onclick = function() {
    context.strokeStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function() {
    context.strokeStyle = 'blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
    black.classList.remove('active')
}

thin.onclick = function() {
    lineWidth = 5
    thin.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick = function() {
    lineWidth = 10
    thin.classList.remove('active')
    thick.classList.add('active')
}

// eraser.onclick = function() {
//     eraserEnabled = true
//     actions.className = 'actions x'

// }
// brush.onclick = function() {
//     eraserEnabled = false
//     actions.className = 'actions'

// }

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
    context.lineWidth = lineWidth
    context.moveTo(x1, y1)
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

    //特性检测
    if (document.body.ontouchstart !== undefined) { //监听是否可以使用ontouchstart这个方法,如果不为undefined则为触屏设备
        //触屏设备
        canvas.ontouchstart = function(aaa) {
            console.log(aaa); //查看传递的内容找到x,y坐标
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            console.log(x, y);
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10) //如果点击橡皮擦则清除x,y
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.ontouchmove = function(aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY

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
        canvas.ontouchend = function() {
            using = false
        }
    } else {
        //非触屏设备
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
}