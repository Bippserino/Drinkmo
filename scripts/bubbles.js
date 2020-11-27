var bubblesDOM
var bubbleInterval

class Bubbles {
    static createBubbles() {
        const createElement = document.createElement('span')
        var size = Math.random() * 50
        $(createElement).css("width",`${size + 'px'}` )
        $(createElement).css("height",`${size + 'px'}` )
        $(createElement).css("left",`${(Math.random() * ((innerWidth - 40))) + 'px'}` )
        createElement.style.bottom = 0
        createElement.style.zIndex = -2;
        $(bubblesDOM).append(createElement)

        setTimeout(() => {
            $(createElement).remove()
        }, 5000)
    }
}

bubblesDOM = ".game__window"
bubbleInterval = 400
if ($(bubblesDOM).length == 0) {
    bubblesDOM = ".header" 
    bubbleInterval = 300
}
setInterval(Bubbles.createBubbles, bubbleInterval)
