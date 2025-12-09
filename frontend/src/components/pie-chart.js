export class PieChart {
    constructor(canvasId, config) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.config = config;
        this.chart = null;
        this.init();
    }

    init() {
        this.chart = new Chart(this.ctx, this.config);
    }

    update(newData) {
        this.chart.data.datasets[0].data = newData;
        this.chart.update();
    }

    destroy() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
}
