const cards = document.querySelectorAll('.gameCard');

let anyFlipped = false;
let first;
let second;
let state = true;

(function shuffle() {
    cards.forEach(card => {
        let rnd = Math.ceil(Math.random() * 12);
        card.style.order = rnd;
    });
})();

function flip() {

    if (!this.classList.contains('flip') && !anyFlipped && state) {
        this.classList.add('flip');
        first = this;
        anyFlipped = true;
    }
    else if (this.classList.contains('flip') && anyFlipped && state) {
        this.classList.remove('flip');
        reset();
    }
    else if (!this.classList.contains('flip') && first.dataset.value===this.dataset.value && state){
        second = this;
        second.classList.add('flip');
        state=false;
        setTimeout(() => {
            first.removeEventListener('click', flip);
            second.removeEventListener('click', flip);

            reset();
        }, 100);
    }
    else if(!this.classList.contains('flip') && anyFlipped && first.dataset.value!==this.dataset.value && state){
        state = false;
        second = this;
        second.classList.add('flip');
        setTimeout(() => {
            first.classList.remove('flip');
            second.classList.remove('flip');

            reset();
        }, 500);
    }

}


function reset(){
    first = null;
    second = null;
    anyFlipped = false;
    state=true;
}

cards.forEach(card => card.addEventListener('click', flip));