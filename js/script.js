// Function for slide and carousel : bool == true for carousel / false for slide
function picturesListener(cibleImg, classImage, imgtabPrincipal, buttons, bool){

    let i = 0, slide = [];
    let imgPrincipal = document.querySelector(classImage);
    let imgForPrincipal = imgtabPrincipal;
    let img = document.querySelectorAll(cibleImg);
    if(!bool) img.forEach(picture => { slide.push(picture.src) });
    else{
        img.forEach(picture => {
            slide.push([picture.src, picture.parentElement.children[1].innerText]);
        });
    }
    let final = slide.length;

    //onWindowResize(slide,imgPrincipal,imgForPrincipal);

    if(!bool){
        img.forEach(picture => {
            picture.addEventListener('mouseover', function(event){
                imgPrincipal.src = this.src.replace(/s.png/g,'l.png');
            });
        });
        // Management of the page resizing
        window.onresize = function(){
            onWindowResize(slide,imgPrincipal,imgForPrincipal);
        }
    }
    // Listener Previous button
    document.querySelector(buttons[0]).addEventListener('click', function(e) {
        if(i > 0){
            i--;
            if(bool){
                imgPrincipal.src = slide[i][0];
                imgPrincipal.parentElement.children[1].innerText = slide[i][1];
            }
            else imgPrincipal.src = slide[i];
            document.querySelector(buttons[1]).classList.remove('active');
        }
        else if(i == 0){
            if(bool){
                imgPrincipal.src = slide[i][0];
                this.classList.add('active');
            }
            else{
                i = final-1;
                imgPrincipal.src = slide[i];
            }
        }
    });
    // Listener Next button
    document.querySelector(buttons[1]).addEventListener('click', function(e) {
        if(i < final-1){
            i++;
            document.querySelector(buttons[0]).classList.remove('active');
            if(bool){
                imgPrincipal.src = slide[i][0];
                imgPrincipal.parentElement.children[1].innerText = slide[i][1];
            }
            else  imgPrincipal.src = slide[i];
        }
        else if(i == final-1){
            if(bool){
                this.classList.add('active');
            }
            else{
                i = 0;
                imgPrincipal.src = slide[i];
            }
        }
    });
}

function onWindowResize(slide,imgPrincipal,imgForPrincipal){
    if(window.innerWidth < 768){
        imgPrincipal.src = imgForPrincipal[0];
        slide.push(imgForPrincipal[0]);
    }
    else{
        imgPrincipal.src = imgForPrincipal[1];
        slide.push(imgForPrincipal[1]);
    }
}
// Add to cart and refresh in header
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
// Disabling and renaming the cart button + removeListener
function disabledCart(){
    addCta.setAttribute('disabled','disabled');
    addCta.innerText = 'Déjà au panier';
    addCta.removeEventListener('click', addCart);
}

// Persistence of accordions
function persistanceProducts(){
    const buttonsH2 = document.querySelectorAll('.product-acrd-lnk');
    const productAdvantages     = document.querySelector('.product-advantages');
    const productCaractristic   = document.querySelector('.product-car');

    if(localStorage.getItem('product-advantages') === null) localStorage.setItem('product-advantages','[]');
    else if( localStorage.getItem('product-advantages') !== null && JSON.parse(localStorage.getItem('product-advantages')).length == 2){
        productAdvantages.previousElementSibling.classList.add( JSON.parse(localStorage.getItem('product-advantages'))[0] );
        productAdvantages.classList.add( JSON.parse(localStorage.getItem('product-advantages'))[1] );
    }
    if(localStorage.getItem('product-car') === null) localStorage.setItem('product-car','[]');
    else if( localStorage.getItem('product-car') !== null && JSON.parse(localStorage.getItem('product-car')).length == 2){
        productCaractristic.previousElementSibling.classList.add( JSON.parse(localStorage.getItem('product-car'))[0] );
        productCaractristic.classList.add( JSON.parse(localStorage.getItem('product-car'))[1] );
    }
    // Listener on 'Avantages' and 'Caractéristiques'
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

// Call 1st Listener at the top of the page with its own parameters for the infinite slide
picturesListener('.thumbs li img', '.pictures-img',["img/canard-jaune-1-s.png", "img/canard-jaune-1-l.png"], ['.pictures-prev', '.pictures-next'], false);
// Call 1st Listener at the bottom of the page with its own parameters for the carousel
picturesListener('.similar-lst li a img', '.similar-img',["img/canard-dragon.png"], ['.similar-prev', '.similar-next'], true);
// Add to cart
addCta.addEventListener('click', addCart);
// Persistence of accordions
persistanceProducts();