let worker = new Worker('./js/searchWorker.js');

worker.addEventListener('message', function (e) {
    const { dataSize, processingTime, searchType } = e.data;
    updateChart(dataSize, processingTime, searchType);
    hideProcessingMessage();
});

// Function to show the processing message
function showProcessingMessage() {
    document.getElementById('processingMessage').style.display = 'block';
}

// Function to hide the processing message
function hideProcessingMessage() {
    document.getElementById('processingMessage').style.display = 'none';
}

// Function to Execute the Search
function performSearch() {
    showProcessingMessage();
    let dataSize = Number(document.getElementById('dataSizeInput').value);
    let data = generateSequentialArray(dataSize);
    let searchType = document.getElementById('searchType').value;
    // let item = Math.floor(Math.random() * dataSize); // Generate a random number within the array range
    let item = Number(document.getElementById('searchItem').value); // Get the item to search for

    // Send the data to the Web Worker
    worker.postMessage({ data, searchType, item });
}

// Function to Initialize the Chart
function initChart() {
    let ctx = document.getElementById('timeChart').getContext('2d');
    timeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'O(1) - Constant Search',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'O(log n) - Binary Search',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'O(n) - Linear Search',
                    data: [],
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'O(n log n) - Merge Sort',
                    data: [],
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'O(n²) - Bubble Sort',
                    data: [],
                    backgroundColor: 'rgba(255, 159, 64, 0.5)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }
                // Add more datasets as needed
            ]
        },
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Processing Time (ms)'
                    },
                    beginAtZero: true
                },
                x: {
                    title: {
                        display: true,
                        text: 'Data Size'
                    },
                    // We can add specific settings for the X axis here if necessary
                }
            }
        }
    });
}


// Function to Update the Chart with New Data
function updateChart(dataSize, processingTime, type) {
    let datasetIndex;
    switch (type) {
        case 'constant':
            datasetIndex = 0;
            break;
        case 'binary':
            datasetIndex = 1;
            break;
        case 'linear':
            datasetIndex = 2;
            break;
        case 'mergeSort':
            datasetIndex = 3;
            break;
        case 'bubbleSort':
            datasetIndex = 4;
            break;
        // Adicione mais casos conforme necessário
    }

    // Checks if the data size already exists on the X axis
    let dataIndex = timeChart.data.labels.indexOf(dataSize);
    if (dataIndex === -1) {
        // If it doesn't exist, add a new data point
        timeChart.data.labels.push(dataSize);
        dataIndex = timeChart.data.labels.length - 1;
    }

    // Update processing time for the specific dataset and index
    timeChart.data.datasets[datasetIndex].data[dataIndex] = processingTime;
    timeChart.update();
}

// Function to generate an array increasing from 0 to the specified size
function generateSequentialArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(i); // Add current number to array
    }
    return arr;
}


// Function to Restart the Application
function resetApplication() {
    document.getElementById('dataSizeInput').value = '';
    document.getElementById('searchItem').value = '';
    timeChart.data.labels = [];
    timeChart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    timeChart.update();
}

window.onload = initChart;
