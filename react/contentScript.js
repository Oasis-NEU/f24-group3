console.log('Content script loaded');
const tbody = document.querySelector('tbody');

// Create a MutationObserver to monitor changes in the DOM
const observer = new MutationObserver((mutationsList, observer) => {
    const tbody = document.querySelector('tbody');

    // Check if <tbody> is now in the DOM
    if (tbody) {
        console.log('Tbody found, grabbing data:');
        // Loop through all rows and cells to extract information
        for (let row of tbody.rows) {
            for (let cell of row.cells) {
                console.log(cell.textContent);  // Do something with each cell's content
            }
        }
        // Once we have found the <tbody>, stop observing
        observer.disconnect();
    }
});

// Start observing the document's body for changes in child elements
observer.observe(document.body, { childList: true, subtree: true });

