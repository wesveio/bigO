// Functions (linearSearch, binarySearch, performSearch, initChart, updateChart)

// O(1) - Constant Search
function constantSearch(arr, item) {
    return arr[item]; // Return always the first element, example of O(1)
}

// O(n log n) - Merge Sort
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(
        mergeSort(left),
        mergeSort(right)
    );
}

function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}

// O(n²) - Bubble Sort
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// Linear Search
// Example: linearSearch([1, 2, 3, 4, 5], 3) return 2
function linearSearch(arr, item) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            return i; // Returns the index of the item, if found
        }
    }
    return -1; // Returns -1 if the item is not found
}

// Binary Search
// Example: binarySearch([1, 2, 3, 4, 5], 3) return 2
function binarySearch(arr, item) {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let guess = arr[mid];
        if (guess == item) {
            return mid; // Returns the index of the item, if found
        }
        if (guess > item) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1; // Returns -1 if the item is not found
}

// Function to process the search
self.addEventListener('message', function (e) {
    const { data, searchType, item } = e.data;
    let result;
    let startTime = performance.now();

    switch (searchType) {
        case 'constant':
            result = constantSearch(data, item);
            break;
        case 'linear':
            result = linearSearch(data, item);
            break;
        case 'binary':
            data.sort((a, b) => a - b);
            result = binarySearch(data, item);
            break;
        case 'mergeSort':
            result = mergeSort(data);
            break;
        case 'bubbleSort':
            result = bubbleSort(data);
            break;
    }

    let endTime = performance.now();
    self.postMessage({ dataSize: data.length, processingTime: endTime - startTime, searchType });
});
