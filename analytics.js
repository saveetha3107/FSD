const ctx = document.getElementById("qualityChart");

const labels = [
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00"
];

const phData = [7.1, 7.2, 7.0, 7.3, 7.2, 7.4, 7.2];

const turbidityData = [2.4, 2.1, 2.5, 2.2, 2.3, 2.0, 2.1];

const qualityChart = new Chart(ctx, {
    type: "line",

    data: {
        labels: labels,

        datasets: [
            {
                label: "pH",
                data: phData,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4
            },

            {
                label: "Turbidity (NTU)",
                data: turbidityData,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4
            }
        ]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "top"
            }
        },

        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});


function updateChart() {
    const period = document.getElementById("periodSelect").value;

    if (period === "7") {
        qualityChart.data.labels = [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ];

        qualityChart.data.datasets[0].data =
            [7.1, 7.2, 7.3, 7.1, 7.4, 7.2, 7.2];

        qualityChart.data.datasets[1].data =
            [2.4, 2.2, 2.1, 2.5, 2.3, 2.0, 2.1];
    }

    else if (period === "30") {
        qualityChart.data.labels =
            ["Week 1", "Week 2", "Week 3", "Week 4"];

        qualityChart.data.datasets[0].data =
            [7.1, 7.3, 7.2, 7.2];

        qualityChart.data.datasets[1].data =
            [2.5, 2.3, 2.2, 2.1];
    }

    else {
        qualityChart.data.labels = labels;

        qualityChart.data.datasets[0].data = phData;

        qualityChart.data.datasets[1].data =
            turbidityData;
    }

    qualityChart.update();
}


function logout() {
    window.location.href = "index.html";
}