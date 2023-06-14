/* GRAFICO DE BARRAS*/
let proximaAtualizacao;
function grafico_barra_comentario() {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }
    fetch(`/admin/grafico_comentario`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`data recebidos: ${JSON.stringify(resposta)}`);
                resposta.sort();

                plotarGraficoComentario(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos data p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGraficoComentario* usa os data capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGraficoComentario* também invoca a função *atualizarGrafico*
function plotarGraficoComentario(resposta) {

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - data
    /* -- graficoBarras -- */
    let dados = {
        labels: labels,
        datasets: [{
            data: [],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };


    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "grafico_barra_usuario" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.titulo);
        /*para ver temperature basta trocar para umidade ex dados.datasets[0].data.push(registro.umidade);*/
        dados.datasets[0].data.push(registro.estrelas);

    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                    text: 'Value'
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'COMENTÁRIOS COM MAIS CURTIDA',
                    color: '#FFFFFF',
                },
                legend: {
                    display: false,
                },
            }
        }
    };


    // Adicionando gráfico criado em div na tela
    var graficoBarrasComentario = document.getElementById('myChartComentario').getContext('2d');
    graficoBarrasComentario.canvas.width = 200;
    graficoBarrasComentario.canvas.height = 100;
    var graficoBarrasComentario = new Chart(document.getElementById('myChartComentario').getContext('2d'),
        config
    );
}


/* GRAFICO DE BARRAS*/
function grafico_barra_usuario() {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }
    fetch(`/admin/grafico_users`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`data recebidos: ${JSON.stringify(resposta)}`);
                resposta.sort();

                plotarGrafico(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos data p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os data capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta) {

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - data
    /* -- graficoBarras -- */
    let dados = {
        labels: labels,
        datasets: [{
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };


    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "grafico_barra_usuario" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.email);
        /*para ver temperature basta trocar para umidade ex dados.datasets[0].data.push(registro.umidade);*/
        dados.datasets[0].data.push(registro.contar);

    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                    text: 'Value'
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'USUÁRIOS QUE MAIS COMENTAM',
                    color: '#FFFFFF',
                },
                legend: {
                    display: false,
                },
            }
        }
    };


    // Adicionando gráfico criado em div na tela
    var graficoBarras = document.getElementById('myChart').getContext('2d');
    graficoBarras.canvas.width = 200;
    graficoBarras.canvas.height = 100;
    var graficoBarras = new Chart(document.getElementById('myChart').getContext('2d'),
        config
    );
}

/* grafico de pizza */

function grafico_linhas_linguagem() {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }
    fetch(`/admin/grafico_linguagem`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`data recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarLinguagem(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos data p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarLinguagem* usa os data capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarLinguagem* também invoca a função *atualizarGrafico*
function plotarLinguagem(resposta) {

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - data
    /* -- graficoBarras -- */
    let dados = {
        labels: labels,
        datasets: [{
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 12, 16, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 12, 16)',
            ],
            hoverOffset: 4
        }]
    };


    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "grafico_barra_usuario" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.linguagem);
        /*para ver temperature basta trocar para umidade ex dados.datasets[0].data.push(registro.umidade);*/
        dados.datasets[0].data.push(registro.contar);

    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'doughnut',
        data: dados,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'LINGUAGENS MAIS UTILIZADAS',
                    color: '#FFFFFF',
                    padding: {
                        top: 30,
                        bottom: 30,
                    }
                },
                legend: {
                    display: false,
                }
            }
        }
    };


    // Adicionando gráfico criado em div na tela
    var graficoPizza = document.getElementById('myChartPizza').getContext('2d');
    graficoPizza.canvas.width = 200;
    graficoPizza.canvas.height = 100;
    var graficoPizza = new Chart(document.getElementById('myChartPizza').getContext('2d'),
        config
    );
}