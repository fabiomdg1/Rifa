//Aguarda o navegador terminar de carregar a página antes de qualquer coisa
document.addEventListener("DOMContentLoaded", function () {

    //------------------------------VARIÁVEIS GLOBAIS---------------------------------//

    // Pegando a tabela com todas as suas tags e colocando em uma variável
    const tabela = document.getElementById("tabela-rifa");

    // Número total de bilhetes
    let totalNumeros = 0;


    // Número de colunas desejado
    let colunas = 20;

    // Inicializando os números da Rifa a partir de zero
    let numero = 0;

    let numeroClicado = 0;

    const numerosClicados = new Set(); 

    //------------------------------CRIA TABELA---------------------------------//
    function criarTabela(totalNumeros){

        // Calcula o número de linhas necessárias
        const linhas = Math.ceil(totalNumeros / colunas);
        
        // Cria as linhas e células da tabela
        for (let i = 0; i < linhas; i++) {
        const row = tabela.insertRow();

        for (let j = 0; j < colunas; j++) {

            // Cria uma nova celula
            const cell = row.insertCell();

            // Coloca um número na celula
            cell.textContent = numero++;

            // Se passar da quantidade total de números parametrizado acima, break
            if (numero >= totalNumeros) break;
        }
    }

    }

    //------------------------------BOTÃO GERAR RIFA---------------------------------//
    // Adiciona um evento de clique ao botão "Enviar"
    const enviarBtn = document.getElementById("enviarQuantidade");

    // Escutando botão Enviar
    enviarBtn.addEventListener("click", function () {

        // Obtém o valor inserido pelo usuário na caixa de texto
        const quantidade = document.getElementById("quantidadeNumeros").value;

        // Verifica se o valor é válido (número inteiro maior que zero)
        if (quantidade > 0 && Number.isInteger(Number(quantidade))) {

            totalNumeros = quantidade;

            criarTabela(totalNumeros);
            

        } else {
            // Caso o valor não seja válido, exiba uma mensagem de erro ou faça alguma outra ação adequada
            alert("Por favor, insira um número inteiro válido maior que zero.");
        }
    });


    
    //------------------------------CLICAR NA CELULA---------------------------------//

    // Adiciona um evento de clique a cada célula da tabela
    tabela.addEventListener("click", function (event) {
        // Verifica se o elemento clicado é uma célula da tabela
        if (event.target.tagName === "TD") {
            
            // Obtém o número da célula clicada    
            numeroClicado = parseInt(event.target.textContent);
            
            console.log("NumeroClicado: " + numeroClicado);

            numerosClicados.add(numeroClicado);

            // Altera a cor de fundo da célula clicada
            event.target.style.backgroundColor = "yellow";

            // Verifica se todos os números foram escolhidos
            if (numerosClicados.size == totalNumeros) {
        
                // Habilita o botão "Sortear"
                sortearBtn.disabled = false;
            }
        }
    });

    //------------------------------BOTÃO SORTEAR---------------------------------//
    // Pegando o botão Sortear
    const sortearBtn = document.getElementById("sortearBtn");

    // Pegando o botão Resetar
    const resetarBtn = document.getElementById("resetarBtn");

    // Desabilita o botão "Sortear" e "Resetar" inicialmente
    sortearBtn.disabled = true;
    resetarBtn.disabled = true;


    // Criando um conjunto para armazenar os números sorteados
    const numerosSorteados = new Set(); 

    // Adiciona um evento de clique ao botão "Sortear"
    sortearBtn.addEventListener("click", function () {
        // Gera um número aleatório de 0 até o total de números escolhidos
        // Math.floor --> Arredonda para baixo
        console.log("Total de Numeros para sorteio da rifa: " + totalNumeros);
        const numeroSorteado = Math.floor(Math.random() * totalNumeros);

        console.log("Número Sorteado: " + numeroSorteado);


        // Verifica se o número sorteado já foi clicado
        if (numerosSorteados.has(numeroSorteado)) {
            console.log("Este número já foi sorteado. Vamos tentar novamente.");
            alert("Este número já foi sorteado. Vamos tentar novamente");
            return; // Sai da função se o número já foi sorteado
        }
     
        if (numerosClicados.has(numeroSorteado)) {

            // Desabilita o botão "Sortear" - Depois de ser sorteado não poderá haver novo sorteio
            sortearBtn.disabled = true;
            resetarBtn.disabled = false;


            console.log("O número escolhido foi o " + numeroSorteado);         
            

            const cells = tabela.querySelectorAll("td");
            cells.forEach(cell => {
                // Verifica se o texto da célula corresponde ao número sorteado
                if (cell.textContent === numeroSorteado.toString()) {
                    // Altera a cor de fundo da célula clicada
                    cell.style.backgroundColor = "blue";

                }
            });            
            return; // Sai da função se o número já foi clicado
        }

        // Adiciona o número sorteado ao conjunto de números sorteados
        numerosSorteados.add(numeroSorteado);


        // Exibe o número sorteado no console
        console.log("Número sorteado:", numeroSorteado);
    });


    //------------------------------BOTÃO RESETAR---------------------------------//
    // Adiciona um evento de clique ao botão "Resetar"
    resetarBtn.addEventListener("click", function () {
        // Limpa o conjunto de números clicados
        numerosClicados.clear();

        // Obtém todas as células da tabela
        const cells = tabela.querySelectorAll("td");
        
        // Para cada célula, redefine a cor de fundo para a cor original
        cells.forEach(cell => {
            cell.style.backgroundColor = ""; // Define a cor de fundo para vazia, o que restaura a cor original
        });

        // Despois de utilizar, é desabilitado o botão reset novamente
        resetarBtn.disabled = true;

    });

});

