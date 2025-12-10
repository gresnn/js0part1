import {PieChart} from "./pie-chart.js";
export class MinePage {
    constructor() {
        this.init();
        this.init2();
    }
    // Вызов инициализации диаграммы
    init() {
        // Конфигурация для 1 круговой диаграммы
        const chartConfig = {
            type: 'pie',
            data: {
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets: [{
                    data: [40, 15, 15, 15, 15],
                    backgroundColor: [
                        'rgb(255, 0, 0)',
                        'rgb(255, 165, 0)',
                        'rgb(255, 255, 0)',
                        'rgb(0, 128, 0)',
                        'rgb(0, 0, 255)'
                    ],
                    hoverBackgroundColor: [
                        'rgb(255, 0, 0, 0.6)',
                        'rgb(255, 165, 0, 0.6)',
                        'rgb(255, 255, 0, 0.6)',
                        'rgb(0, 128, 0, 0.6)',
                        'rgb(0, 0, 255, 0.6)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1500
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Доходы'
                    }
                }
            }
        };


    // Создаём экземпляр диаграммы

    new PieChart('myPieChart', chartConfig);


    }
    init2() {
        // Конфигурация для 2 круговой диаграммы
        const chartConfig = {
            type: 'doughnut',
            data: {
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets: [{
                    data: [20, 15, 25, 5, 35],
                    backgroundColor: [
                        'rgb(255, 0, 0)',
                        'rgb(255, 165, 0)',
                        'rgb(255, 255, 0)',
                        'rgb(0, 128, 0)',
                        'rgb(0, 0, 255)'
                    ],
                    hoverBackgroundColor: [
                        'rgb(255, 0, 0, 0.6)',
                        'rgb(255, 165, 0, 0.6)',
                        'rgb(255, 255, 0, 0.6)',
                        'rgb(0, 128, 0, 0.6)',
                        'rgb(0, 0, 255, 0.6)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '20%', // процент «дырки» (от 0 до 100)
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1500
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Расходы'
                    }
                }
            }
        };

        // new PieChart2('myPieChart2', chartConfig2);
        new PieChart('myPieChart2', chartConfig);

    }
}
