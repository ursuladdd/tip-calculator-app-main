document.addEventListener("DOMContentLoaded", () => {
let valorTotal = document.getElementById("int-valor");
let quantidade = document.getElementById("int-quanti");
let botoesDesconto = document.querySelectorAll(".btn-desc");
let personalizaCustom = document.getElementById("int-custom");
const resetButton = document.getElementById("reset");
const tippersonOutput = document.getElementById('tip_person');
const totalPersonOutput = document.getElementById('total_person');

function calcularDesconto(valor, porcentagem, quantidade) {
    if (isNaN(valor) || isNaN(porcentagem) || isNaN(quantidade) || quantidade <= 0) {
        console.error("Valores inválidos!");
        return;
    }

    let valorDaGorjeta = valor * porcentagem / 100;
    let totalPorPessoa = (valor + valorDaGorjeta) / quantidade;
    let porPessoa = valorDaGorjeta / quantidade;

    totalPersonOutput.textContent = `$${totalPorPessoa.toFixed(2)}`;
    tippersonOutput.textContent = `$${porPessoa.toFixed(2)}`;
}
console.log(botoesDesconto);
botoesDesconto.forEach(button => {
    button.addEventListener("click", (e) => {
      console.log("Botão clicado");
      
        let descValue = e.target.innerText;
        console.log("Valor do botão (com %):", descValue);
        
        descValue = descValue.slice(0, -1);
        console.log("Valor do desconto (sem %):", descValue);

        if (valorTotal.value === "") {
            console.error("Valor total não pode estar vazio!");
            return;
        }

        if (quantidade.value === "" || isNaN(quantidade.value)) {
          console.warn("Quantidade inválida ou vazia. Definindo como 1.");
            quantidade.value = 1;
        }

        console.log("Valor total:" , valorTotal.value);
        console.log("Quantidade:", quantidade.value);
        
        const valorTotalNumerico = parseFloat(valorTotal.value);
        const descValueNumerico = parseFloat(descValue);
        const quantidadeNumerica = parseInt(quantidade.value);

        console.log("Valores convertidos:", {
            valorTotal: valorTotalNumerico,
            desconto: descValueNumerico,
            quantidade: quantidadeNumerica
        });

        calcularDesconto(parseFloat(valorTotal.value), parseFloat(descValue), parseInt(quantidade.value));
    });
});

personalizaCustom.addEventListener("blur", (e) => {
    const customPercent = parseFloat(e.target.value);

    if (isNaN(customPercent)) {
        alert("Por favor, insira um número válido para a porcentagem de gorjeta personalizada.");
        e.target.value = "";
        return;
    }

    if (valorTotal.value === "") {
        console.error("Valor total não pode estar vazio!");
        return;
    }

    if (quantidade.value === "" || isNaN(quantidade.value)) {
        quantidade.value = 1;
    }

    calcularDesconto(parseFloat(valorTotal.value), customPercent, parseInt(quantidade.value));
});

resetButton.addEventListener("click", resetEverything);

function resetEverything() {
    totalPersonOutput.textContent = "$0.00";
    tippersonOutput.textContent = "$0.00";
  valorTotal.value = "";
  quantidade.value = "";
  personalizaCustom.value = "";
}
});