const img = document.querySelectorAll('.thumbs li img');
const imgPrincipal = document.querySelector('.pictures-img');
let i = 0, slide = [];

img.forEach(picture => { slide.push(picture.src) })
const final = slide.length;

img.forEach(picture => {
    picture.addEventListener('mouseover', function(event){
        imgPrincipal.src = this.src;
    });
});

function picturesListener(){
    const imgForPrincipal = ["img/canard-jaune-1-s.png","img/canard-jaune-1-l.png"];
    if(window.innerWidth < 768){
        imgPrincipal.src = imgForPrincipal[0];
        slide.push(imgForPrincipal[0]);
    }
    else{
        imgPrincipal.src = imgForPrincipal[1];
        slide.push(imgForPrincipal[1]);
    }
    document.querySelector('.pictures-prev').addEventListener('click', function(e) {
        if(i > 0){
            i--;
            imgPrincipal.src = slide[i];
        }
        if(i == 0){
            i = final-1;
            imgPrincipal.src = slide[i];
        }
    });
    document.querySelector('.pictures-next').addEventListener('click', function(e) {
        if(i < final-1){
            i++;
            imgPrincipal.src = slide[i];
        }
        if(i == final-1){
            imgPrincipal.src = slide[i];
            i = -1;
        }
    });
}
picturesListener();

const cartNb = document.querySelector('.cart-nb');
const addCta = document.querySelector('.add-cta');

function addcart(sens){
    let Qty = (sens == 1) ? parseInt(cartNb.innerText) + 1 : parseInt(cartNb.innerText) - 1;
    cartNb.innerTex = Qty;
}

addCta.addEventListener('click', function(event) { 
    addcart(1);
 });