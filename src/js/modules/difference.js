export default class Difference {
    constructor(oldOfficer, newOfficer, items){
        this.old = document.querySelector(oldOfficer);
        this.new = document.querySelector(newOfficer);
        try {
            this.oldItems = this.old.querySelectorAll(items);
            this.newItems = this.new.querySelectorAll(items);
        } catch (error) {}
        this.oldCounter = 0;
        this.newCounter = 0;
    }

    bindTriggers(parent, counter, items){
        parent.querySelector('.plus').addEventListener('click', () => {
            if(counter !== items.length - 2){
                items[counter].classList.add('flex', 'animated', 'fadeIn');
                items[counter].classList.remove('hide');
                counter++;
            } else {
                items[counter].classList.add('flex', 'animated', 'fadeIn');
                items[counter].classList.remove('hide');
                items[items.length - 1].remove();
            }
        });
    }

    hideElems(elems){
        elems.forEach((item, i, arr) => {
            if(i !== arr.length - 1){
                item.classList.add('flex','hide');
                item.classList.remove('flex', 'animated', 'fadeIn');
            }
        });
    }

    init(){
        try {
            this.hideElems(this.oldItems);
            this.hideElems(this.newItems);
            this.bindTriggers(this.old, this.oldCounter, this.oldItems);
            this.bindTriggers(this.new, this.newCounter, this.newItems);
        } catch (error) {}
    }
}