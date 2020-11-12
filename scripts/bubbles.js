var bubblesDOM

class Bubbles {
    static createBubbles() {
        const createElement = document.createElement('span')
        var size = Math.random() * 50
        createElement.style.width = size + 'px'
        createElement.style.height = size + 'px'
        createElement.style.left = (Math.random() * ((innerWidth - 80) - 80)) + 'px'
        createElement.style.bottom = size + 'px'
        createElement.style.zIndex = -2;
        $(bubblesDOM).append(createElement)

        setTimeout(() => {
            $(createElement).remove()
        }, 5000)
    }
}

bubblesDOM = ".game__window"
if ($(bubblesDOM).length == 0) bubblesDOM = ".header" 
setInterval(Bubbles.createBubbles, 400)
