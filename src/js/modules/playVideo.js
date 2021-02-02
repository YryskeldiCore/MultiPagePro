export default 
    class Video {
    constructor(triggers, modal){
        this.btns = document.querySelectorAll(triggers);
        this.modal = document.querySelector(modal);
        this.close = this.modal.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers(){
        this.btns.forEach((btn, i) => {
            try {
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;

                if(i % 2 == 0){
                    blockedElem.setAttribute('data-block', 'true');
                }
            } catch (error) {}

            btn.addEventListener('click', () => {
                if(!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-block') !== 'true'){
                    this.activeBtn = btn;
                    if(document.querySelector('iframe#frame')){
                        this.modal.style.display = 'flex';
                        if(this.path !== btn.getAttribute('data-url')){
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});
                        }
                    } else {
                        const path = btn.getAttribute('data-url');
                        this.createVideo(path);
                    }
                }
            });
        });
    }

    bindCloseBtn(){
        this.close.addEventListener('click', () => {
            this.modal.style.display = 'none';
            this.player.stopVideo();
        });
    }

    createVideo(url){
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
              }
          });

        this.modal.style.display = 'flex';
    }

    onPlayerStateChange(state){
        try {
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
            const playBtnActive = this.activeBtn.querySelector('svg').cloneNode(true);

        if(state.data === 0){
            if(blockedElem.querySelector('.play__circle').classList.contains('closed')){
                blockedElem.querySelector('.play__circle').classList.remove('closed');
                blockedElem.querySelector('svg').remove();
                blockedElem.querySelector('.play__circle').appendChild(playBtnActive);
                blockedElem.querySelector('.play__text').classList.remove('attention');
                blockedElem.querySelector('.play__text').textContent = 'play video';
                blockedElem.style.opacity = '1';
                blockedElem.style.filter = 'none';

                blockedElem.setAttribute('data-block', 'false');
            }
        }
        } catch (error) {}
    }

    init(){
        if (this.btns.length > 0){
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}