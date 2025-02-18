let valorTotal = document.getElementById("int-valor");
let quantidade = document.getElementById("int-quanti");
let botoesDesconto = document.querySelectorAll(".select-tip button");
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

botoesDesconto.forEach(button => {
    button.addEventListener("click", (e) => {
        let tipValue = e.target.innerText;
        tipValue = tipValue.slice(0, -1);

        if (valorTotal.value === "") {
            console.error("Valor total não pode estar vazio!");
            return;
        }

        if (quantidade.value === "" || isNaN(quantidade.value)) {
            quantidade.value = 1;
        }

        calcularDesconto(parseFloat(valorTotal.value), parseFloat(tipValue), parseInt(quantidade.value));
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