window.addEventListener("DOMContentLoaded", ()=>{
    let allProd =document.querySelector('.allProd')
    let espace = document.querySelector(".espace");
    let takeProduct = document.querySelector(".takeProduct");
    let groupproduct = document.querySelector(".groupproduct");
    let total = document.querySelector(".total")
    

    allProd.addEventListener('click', (e)=>{
       
        espace.style.display = "none"
        groupproduct.style.display = "flex"
        let text = `
        <div class="col-12 justify-content-start">
        <button class="text-black-50 closed"  >X</button>
        </div>
        <div class="col-4 produit ">
            <div class="card">
                <img src="../assets/img/news-4.jpg" alt="" class="card-img">
                <div class="card-body">
                    <h6 class="card-text text-black-50   ">Meuble bureau</h6>
                    <p class="text-black-50">250 000 Fr</p>
                    <p class="text-black-50">AZB856544</p>
                </div>
            </div>
        </div>
        <div class="col-4 produit">
            <div class="card ">
                <img src="../assets/img/news-4.jpg" alt="" class="card-img">
                <div class="card-body">
                    <h6 class="card-text text-black-50   ">Meuble bureau</h6>
                    <p class="text-black-50">250 000 Fr</p>
                    <p class="text-black-50">AZB856544</p>
                </div>
            </div>
        </div>
        <div class="col-4 produit">
            <div class="card">
                <img src="../assets/img/news-4.jpg" alt="" class="card-img">
                <div class="card-body">
                    <h6 class="card-text text-black-50   ">Meuble bureau</h6>
                    <p class="text-black-50">250 000 Fr</p>
                    <p class="text-black-50">AZB856544</p>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card produit">
                <img src="../assets/img/news-4.jpg" alt="" class="card-img">
                <div class="card-body">
                    <h6 class="card-text text-black-50   ">Meuble bureau</h6>
                    <p class="text-black-50">250 000 Fr</p>
                    <p class="text-black-50">AZB856544</p>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card produit">
                <img src="../assets/img/news-4.jpg" alt="" class="card-img">
                <div class="card-body">
                    <h6 class="card-text text-black-50   ">Meuble bureau</h6>
                    <p class="text-black-50">250 000 Fr</p>
                    <p class="text-black-50">AZB856544</p>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card produit">
                <img src="../assets/img/news-4.jpg" alt="" class="card-img">
                <div class="card-body">
                    <h6 class="card-text text-black-50   ">Meuble bureau</h6>
                    <p class="text-black-50">250 000 Fr</p>
                    <p class="text-black-50">AZB856544</p>
                </div>
            </div>
        </div>
        <div class="col-4">
        <div class="card produit">
            <img src="../assets/img/news-4.jpg" alt="" class="card-img">
            <div class="card-body">
                <h6 class="card-text text-black-50   ">Meuble bureau</h6>
                <p class="text-black-50">250 000 Fr</p>
                <p class="text-black-50">AZB856544</p>
            </div>
        </div>
    </div>
       
        `
        groupproduct.innerHTML = text

        let closed = document.querySelector(".closed")
        console.log(closed)
        e.target.desabled = true

        closed.addEventListener("click", (e)=>{
            console.log(e)
            groupproduct.style.display ="none"
            espace.style.display = "block"
        })

    })

    function Clavier() {
        let btnCla = document.querySelectorAll(".btn-nbr");
        let montant = document.querySelector('.montant')

        btnCla.forEach(ele => ele.addEventListener("click",(e)=>{
            montant.focus();
            console.log(e.target.value)
            changeInput(e.target.value)
           
        }))

        
        function changeInput(event) {   
            montant.value += event 
            let content = total.textContent
            console.log(content)
            let recup = calcul(montant.value)
           total.textContent = recup

        }
        function calcul(values) {
            let somme =  eval(values)
            return somme
            
        }
        globalCal()
        function globalCal(){
            montant.addEventListener('input', ()=>{
                total.textContent = eval(montant.value)
            })
        }
        
    }
    Clavier();
   
})