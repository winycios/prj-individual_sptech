/* GRAFICO DE BARRAS*/

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            data: [65, 59, 80, 81, 56, 55, 40],
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
    },
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
});

/* grafico de pizza */

const ctxPizza = document.getElementById('myChartPizza');

new Chart(ctxPizza, {
    type: 'doughnut',
    data: {
        labels: [
            'Red',
            'Blue',
            'Yellow'
          ],
          datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
            ],
            hoverOffset: 4
          }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'USUÁRIOS CADASTRADOS',
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
});