//Aguarda o navegador terminar de carregar a página antes de qualquer coisa
document.addEventListener("DOMContentLoaded", function () {

    // Pegando a tabela com todas as suas tags e colocando em uma variável
    const tabela = document.getElementById("tabela-rifa");

    ///console.log(tabela);

    // Número total de bilhetes
    const totalNumeros = 200;

    // Número de colunas desejado
    const colunas = 20;

    // Calcula o número de linhas necessárias
    const linhas = Math.ceil(totalNumeros / colunas);

    // Inicializando os números da Rifa
    let numero = 0;

    let numeroClicado = 0;

    const numerosClicados = new Set(); 


    //------------------------------CRIA TABELA---------------------------------//
    // Cria as linhas e células da tabela
    for (let i = 0; i < linhas; i++) {
        const row = tabela.insertRow();

        for (let j = 0; j < colunas; j++) {
            // Cria uma nova celula
            const cell = row.insertCell();
            // Coloca um número na celula
            cell.textContent = numero++;
            // Se passar da quantidade total de números parametrizado acima, break
            if (numero > totalNumeros) break;
        }
    }

    //------------------------------CLICAR NA CELULA---------------------------------//

    // Adiciona um evento de clique a cada célula da tabela
    tabela.addEventListener("click", function (event) {
        // Verifica se o elemento clicado é uma célula da tabela
        if (event.target.tagName === "TD") {
            
            // Obtém o número da célula clicada    
            numeroClicado = parseInt(event.target.textContent); 

            numerosClicados.add(numeroClicado);

            // Altera a cor de fundo da célula clicada
            event.target.style.backgroundColor = "yellow";
        }
    });

    //------------------------------BOTÃO SORTEAR---------------------------------//
    // Pegando o botão Sortear
    const sortearBtn = document.getElementById("sortearBtn");
    // Criando um conjunto para armazenar os números sorteados
    const numerosSorteados = new Set(); 

    // Adiciona um evento de clique ao botão "Sortear"
    sortearBtn.addEventListener("click", function () {
        // Gera um número aleatório de 0 até o total de números escolhidos
        // Math.floor --> Arredonda para baixo
        const numeroSorteado = Math.floor(Math.random() * (totalNumeros + 1));


        // Verifica se o número sorteado já foi clicado
        if (numerosSorteados.has(numeroSorteado)) {
            console.log("Este número já foi sorteado. Vamos tentar novamente.");
            alert("Este número já foi sorteado. Vamos tentar novamente");
            return; // Sai da função se o número já foi sorteado
        }
     
        if (numerosClicados.has(numeroSorteado)) {
            console.log("Ganhou !!!");
            alert("Ganhou !!!")
            

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

});

