# Big O

## Description

This project includes a search functionality implemented with a Web Worker. The search operation's performance is visualized using a chart.

## Features

- Web Worker: The search operation is performed in a separate thread using a Web Worker (`searchWorker.js`), ensuring the UI remains responsive.
- Chart: The time taken for the search operation is visualized using a chart.
- Search Types: The application supports different types of search algorithms, selectable by the user.

## Usage

1. Enter the size of the data to be searched in the 'dataSizeInput' field.
2. Select the type of search algorithm to be used from the 'searchType' dropdown.
3. Enter the item to be searched for in the 'searchItem' field.
4. Click on the 'Search' button to perform the search. A processing message will be displayed while the search is in progress.

## Code Overview

- `performSearch()`: This function retrieves user inputs, generates an array of sequential numbers of the specified size, and sends the data to the Web Worker for processing.
- `showProcessingMessage()` and `hideProcessingMessage()`: These functions control the display of a processing message while the search is being performed.
- `initChart()`: This function initializes the chart that will display the search operation's performance.

## Future Enhancements

- Add more search algorithms to the 'searchType' dropdown.
- Improve the chart visualization with more details like average processing time, worst-case time, etc.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details