document.addEventListener("DOMContentLoaded", () => {
let valorTotal = document.getElementById("int-valor");
let quantidade = document.getElementById("int-quanti");
let estilizacaoinput = document.getElementById("int-quanti");
const mensagem = document.getElementById('erro');
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
            alert("(Português): Valor total não pode estar vazio!. (English): Total value cannot be empty!");
            return;
        }

        if (quantidade.value === "" || !(quantidade.value)) {
          console.warn("Quantidade inválida ou vazia. Definindo como 1.");
            quantidade.value = 0;
            estilizacaoinput.style.border = "2px solid #ff5263";
            mensagem.textContent = "Can't be zero";
        }

        else {
          estilizacaoinput.style.border = "";
          mensagem.textContent = "";
    
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
        alert("(Português): Por favor, insira um número válido para a porcentagem de gorjeta personalizada. (English): Please enter a valid number for the custom tip percentage.");
        e.target.value = "";
        return;
    }

    if (valorTotal.value === "") {
        alert("(Português): Valor total não pode estar vazio!. (English): Total value cannot be empty!");
        return;
    }

    if (quantidade.value === "" || !(quantidade.value)) {
        quantidade.value = 0;
        estilizacaoinput.style.border = "2px solid #ff5263";
        mensagem.textContent = "Can't be zero";

    }

    else {
      estilizacaoinput.style.border = "";
      mensagem.textContent = "";

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
  estilizacaoinput.style.border = "";
  mensagem.textContent = "";
}
});