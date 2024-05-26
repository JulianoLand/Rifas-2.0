// variaveis modal
const numParou = document.querySelector("#nParou");
const avisoNum = document.querySelector(".avisoN");
const avisoQdt = document.querySelector(".avisoQdt");
const qtdRifas = document.querySelector("#qtdRifas");

// variáveis dos números
const numCanhotoPeq = document.querySelector(".numCanP");
const numCanhoto = document.querySelector(".numCan");

// variáveis da imagem
const container = document.querySelector(".container");
const imgTam = document.querySelector("#imgFundo");
// testando - Variáveis para carregamento de imagem
const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "Escolha uma imagem";
const inputBox = document.querySelector(".picture");

// variaveis apresentação
const pagMain = document.querySelector("#pageMain");
const modal = document.querySelector(".modal");

// variavel gerador de PDF
const btnGenerate = document.querySelector("#generate-pdf");

// vizualizando imagem do input
inputFile.addEventListener("change", (event) => {
    const inputTarget = event.target;
    const file = inputTarget.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", (event) => {
            const readerTarget = event.target;

            const img = document.createElement("img");
            img.src = readerTarget.result;
            imgTam.src = readerTarget.result;
            img.classList.add("picture__img");

            pictureImage.innerHTML = "";
            pictureImage.appendChild(img);

            // alterando altura da div container
            alturaImg = img.clientHeight;
            console.log('altura da img: ', alturaImg);
            inputBox.style.cssText = 'height: ' + alturaImg + 'px';
        });
        reader.readAsDataURL(file);
    } else {
        pictureImage.innerHTML = pictureImageTxt;
    }
});


// Gerando PDF
btnGenerate.addEventListener("click", () => {
    
    var content = document.getElementById('content');
    const options = {
        margin: [5, 5, 5, 5],
        filename: 'rifas.pdf',
        html2canvas: {scale: 2},
        jsPDF: {unit: "mm", format: "a4", oritation: "portrait"},
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };
    

    html2pdf().set(options).from(content).save();
});

// Altenticando entradas
numParou.addEventListener("input", (event) => {
    let numParouValue = event.target.value;
    
    if (numParouValue !== ""){
        numParou.classList.remove("border");
        avisoNum.classList.add("hidden");
    }
});

qtdRifas.addEventListener("input", (event) => {
    let qtdRifasValue = event.target.value;
    if (qtdRifasValue !== ""){
        qtdRifas.classList.remove("border");
        avisoQdt.classList.add("hidden");
    }
});

// botao modal
btnModal.addEventListener("click", () => {
    
    if (numParou.value === "") {
        avisoNum.classList.remove("hidden");
        numParou.classList.add("border");
        return;
    }

    if (qtdRifas.value === "") {
        avisoQdt.classList.remove("hidden");
        qtdRifas.classList.add("border");
        return;
    }

    // variaveis para montagem da rifa
    numInicial = parseInt(numParou.value) + 1;
    numFinal = parseInt(numInicial) + parseInt(qtdRifas.value);

    numCanhotoPeq.innerHTML = formatNumber(numInicial);
    numCanhoto.innerHTML = formatNumber(numInicial);

    pagMain.classList.remove("hidden");
    modal.classList.add("hidden");

    for (i = numInicial; i < (numFinal - 1); i++) {
        
        // alterando altura da div container
        alturaImg = imgTam.clientHeight;
        // console.log('altura da img: ', alturaImg);
        container.style.cssText = 'height: ' + alturaImg + 'px';

        // Clonando as divs
        let divs = document.querySelector(".container").cloneNode(true);
        document.querySelector(".container").after(divs);
        numSequencia = formatNumber(parseInt(i) + 1);

        numCanhotoPeq.innerHTML = numSequencia;
        numCanhoto.innerHTML = numSequencia;
    };
});

// Formatando numeros a ser impresso
function formatNumber (n) {
    switch(n.toString().length) {
        case 1:
            n = "000" + n;
            break
        case 2:
            n = "00" + n;
            break
        case 3:
            n = "0" + n;
    };

    return n;
}