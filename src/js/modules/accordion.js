export default class Accordion {
    constructor (triggers){
        this.btns = document.querySelectorAll(triggers);
    }

    init(){
        this.btns.forEach(btn => {
            btn.addEventListener('click', function(){
                const content = this.closest('.module__info-show').nextElementSibling;
                content.classList.add('blink');
                content.classList.toggle('show');
            });
        });
    }
}