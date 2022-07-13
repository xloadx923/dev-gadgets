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

const addCta = document.querySelector('.add-cta');
function addCart(){
    const cartNb = document.querySelector('.cart-nb');
    const inputNb = document.querySelector('.add-qty');
    let Qty = parseInt(inputNb.value);

    if( Qty > 99 ){
        cartNb.innerText = "99+";
    }
    else cartNb.innerText =  parseInt(cartNb.innerText) + Qty;
    disabledCart();
}
function disabledCart(){
    addCta.setAttribute('disabled','disabled');
    addCta.innerText = 'Déjà au panier';
    addCta.removeEventListener('click', addCart);
}
addCta.addEventListener('click', addCart);