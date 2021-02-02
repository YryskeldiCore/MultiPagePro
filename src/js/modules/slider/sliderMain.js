import Slider from './slider';

export default class SliderMain extends Slider {
    constructor(triggers){
        super(triggers);
    }
    
    showSlides(n) {
        if(n > this.slides.length){
            this.slideIndex = 1;
        }
        
        if(n < 1){
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = '0';
            this.hanson.classList.add('animated');
            if(n === 3){
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch (error) {}

        this.slides.forEach(slide => {
            slide.classList.add('hide');
            slide.classList.remove('show','animated', 'fadeIn');
        });
        this.slides[this.slideIndex - 1].classList.add('show', 'animated', 'fadeIn');
        this.slides[this.slideIndex - 1].classList.remove('hide');
    }

    plusSlides(n){
        this.showSlides(this.slideIndex +=n);
    }

    switchSlides(){
        document.querySelectorAll('.prevmodule').forEach(prevArr => {
            prevArr.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });

        this.btn.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            });
            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });
    }

    render(){
       if(this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            }catch(e){}

            this.switchSlides();
            this.showSlides(this.slideIndex);
       } 
    }
}