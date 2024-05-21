// variaveis modal
const nParou = document.querySelector("#nParou");
const avisoN = document.querySelector(".avisoN");
const avisoQdt = document.querySelector(".avisoQdt");
const qRifas = document.querySelector("#qtdRifas");

// variavel gerador de PDF
const btnGenerate = document.querySelector("#generate-pdf");

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
nParou.addEventListener("input", (event) => {
    let nParouValue = event.target.value;
    
    if (nParouValue !== ""){
        nParou.classList.remove("border");
        avisoN.classList.add("hidden");
    }
});

qRifas.addEventListener("input", (event) => {
    let qRifasValue = event.target.value;
    if (qRifasValue !== ""){
        qRifas.classList.remove("border");
        avisoQdt.classList.add("hidden");
    }
});

// botao modal
btnModal.addEventListener("click", () => {
    
    if (nParou.value === "") {
        avisoN.classList.remove("hidden");
        nParou.classList.add("border");
        return;
    }

    if (qRifas.value === "") {
        avisoQdt.classList.remove("hidden");
        qRifas.classList.add("border");
        return;
    }
});