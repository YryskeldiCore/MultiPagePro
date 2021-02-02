export default class Form {
    constructor(forms){
        this.forms = document.querySelectorAll(forms);
        this.messages = {
            loading: 'Loading...',
            success: 'Your details is succesfully sent',
            failure: 'Fail...Maybe some problems with connection'
        };
        this.url = 'assets/question.php';
        this.inputs = document.querySelectorAll('input');
    }

    async postData(url, data){
        const res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    clearInputs(){
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    maskNum(){
        let setCursorPos = (pos, elem) => {
            elem.focus();
            
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function mask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');

            if(def.length >= val.length){
                val = def;
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++): i >= val.length ? '' : a;
            });

            if(event.type === 'blur'){
                if(this.value.length == 2){
                    this.value = '';
                } 
            } else {
                setCursorPos(this.value.length, this);
            }
        }
        
        let inputs = document.querySelectorAll('[name="phone"]');
        
        inputs.forEach(input => {
            input.addEventListener('mouseup', mask, (e) => {
                e.preventDefault();
                input.setSelectionRange(4); // At this code I solve this problem with event 'mouseup' 
            });                             // when we hover the cursor its automatically put after musk
            input.addEventListener('keyup', mask, (e) => { // if we move cursor with key its back to 4 pos 
                if(e.code === 'ArrowLeft'){
                    e.preventDefault();
                    input.setSelectionRange(4);
                }
            });
            input.addEventListener('input', mask);
            input.addEventListener('focus', mask);
            input.addEventListener('blur', mask);
        });
    }

    validateLang(){
        const inputs = document.querySelectorAll('[type="email"]');
        inputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if(e.key.match(/[^a-z 0-9 @ \.]/ig)){
                    e.preventDefault();
                }
            });
        });
    }

    init(){
        this.validateLang();
        this.maskNum();
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 10px;
                    color: silver;
                    font-size: 18px;
                    line-height: 18px;
                `;
                statusMessage.textContent = this.messages.loading;
                form.parentNode.appendChild(statusMessage);

                const formData = new FormData(form);

                this.postData(this.url, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.messages.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.messages.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 4000);
                    });
            });
        });
    }
}