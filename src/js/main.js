import SliderMain from './modules/slider/sliderMain';
import Video from './modules/playVideo';
import SliderMini from './modules/slider/sliderMini';
import Difference from './modules/difference';
import Form from './modules/forms';
import Accordion from './modules/accordion';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new SliderMain({container: ".page", triggers: ".next"});
    slider.render();

    const sliderPage2 = new SliderMain({container: ".moduleapp", triggers: ".next"});
    sliderPage2.render();

    new Video('.showup .play', '.overlay').init();
    new Video('.module__video .play', '.overlay').init();

    const showUpSlider = new SliderMini({
        container: '.showup__content-slider', 
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new SliderMini({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        auto: true
    });
    modulesSlider.init();

    const feedSlider = new SliderMini({
        container: '.feed__slider',
        prev: '.feed .slick-prev',
        next: '.feed .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    new Difference('.officerold', '.officernew', '.officer__card-item').init();
    new Form('.form').init();
    new Accordion('.module__info-show .plus').init();
    new Download('.download').init();
});















// class Milana {
//     constructor(tall, bigfoot){
//         this.tall = tall;
//         this.bigfoot = bigfoot;
//     }

//     run(){
//         console.log('Milana runs!!');
//     }

//     speak(){
//         console.log('Milana speaks!!');
//     }
// }

// const Milana1 = new Milana('180', '45');
// const Milana2 = new Milana('185', '54');

// console.log(Milana1.run());
// console.log(Milana2);