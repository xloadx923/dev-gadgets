function picturesListener(cibleImg, classImage, imgtabPrincipal, buttons){
    let i = 0, slide = [];
    const imgPrincipal = document.querySelector(classImage);
    const imgForPrincipal = imgtabPrincipal;
    const img = document.querySelectorAll(cibleImg);
    img.forEach(picture => { slide.push(picture.src) })
    const final = slide.length;

    img.forEach(picture => {
        picture.addEventListener('mouseover', function(event){
            imgPrincipal.src = this.src;
        });
    });

    if(window.innerWidth < 768){
        imgPrincipal.src = imgForPrincipal[0];
        slide.push(imgForPrincipal[0]);
    }
    else{
        imgPrincipal.src = imgForPrincipal[1];
        slide.push(imgForPrincipal[1]);
    }
    console.log(slide.length)
    document.querySelector(buttons[0]).addEventListener('click', function(e) {
        if(i > 0){
            i--;
            imgPrincipal.src = slide[i];
        }
        else if(i == 0){
            i = final-1;
            imgPrincipal.src = slide[i];
        }
    });
    document.querySelector(buttons[1]).addEventListener('click', function(e) {
        if(i < final-1){
            i++;
            imgPrincipal.src = slide[i];
        }
        else if(i == final-1){
            i = 0;
            imgPrincipal.src = slide[i];
        }
    });
}

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

function persistanceProducts(){
    const buttonsH2 = document.querySelectorAll('.product-acrd-lnk');
    const productAdvantages     = document.querySelector('.product-advantages');
    const productCaractristic   = document.querySelector('.product-car');

    if(localStorage.getItem('product-advantages') === null) localStorage.setItem('product-advantages','[]');
    else if( localStorage.getItem('product-advantages') !== null && JSON.parse(localStorage.getItem('product-advantages')).length == 2){
        console.log(typeof JSON.parse(localStorage.getItem('product-advantages'))[0])
        productAdvantages.previousElementSibling.classList.add( JSON.parse(localStorage.getItem('product-advantages'))[0] );
        productAdvantages.classList.add( JSON.parse(localStorage.getItem('product-advantages'))[1] );
    }
    if(localStorage.getItem('product-car') === null) localStorage.setItem('product-car','[]');
    else if( localStorage.getItem('product-car') !== null && JSON.parse(localStorage.getItem('product-car')).length == 2){
        productCaractristic.previousElementSibling.classList.add( JSON.parse(localStorage.getItem('product-car'))[0] );
        productCaractristic.classList.add( JSON.parse(localStorage.getItem('product-car'))[1] );
    }

    buttonsH2.forEach(h2 => {
        h2.addEventListener('click', function(event){
            if(this.nextElementSibling.classList.contains('active')){
                this.classList.remove("closed");
                this.nextElementSibling.classList.remove('active');
                localStorage.setItem(this.nextElementSibling.className,'[]');
            }
            else{
                localStorage.setItem(this.nextElementSibling.className, JSON.stringify(['closed', 'active']));
                this.classList.add("closed");
                this.nextElementSibling.classList.add('active');
            }
        });
    });
}

picturesListener('.thumbs li img', '.pictures-img',["img/canard-jaune-1-s.png", "img/canard-jaune-1-l.png"], ['.pictures-prev', '.pictures-next']);
addCta.addEventListener('click', addCart);
persistanceProducts();

const similarPrev = document.querySelector('.similar-buttons .pictures-prev');
const similarNext = document.querySelector('.similar-buttons .pictures-next');

similarPrev.addEventListener('click', function(event){

});

similarNext.addEventListener('click', function(event){

});