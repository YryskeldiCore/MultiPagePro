export default class Slider {
    constructor({container = null, 
                triggers = null, 
                next = null, 
                prev = null,
                activeClass = '',
                animate = false,
                auto = false
            } = {}){
        this.container = document.querySelector(container);
        try { this.slides = this.container.children;} catch (error) {}
        this.btn = document.querySelectorAll(triggers);
        this.slideIndex = 1;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.activeClass = activeClass;
        this.animate = animate;
        this.auto = auto;
    }
}