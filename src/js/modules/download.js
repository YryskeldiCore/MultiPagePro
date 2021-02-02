export default class Download {
    constructor(triggers){
        this.btns = document.querySelectorAll(triggers);
        this.path = 'assets/img/evolve.jpg';
    }

    downloadFile(path){
        const elem = document.createElement('a');
        elem.setAttribute('href', path);
        elem.setAttribute('download', 'good__img');
        elem.style.display = 'none';
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }

    events(e){
        e.preventDefault();
        e.stopPropagation();
    }

    init(){
        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.downloadFile(this.path);
                this.events(e);
            });
        });
    }
}