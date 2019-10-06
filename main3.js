function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

function getTableHeaders(obj){
    var tableHeaders = [];
    Object.keys(obj).forEach(function(key){
        // <td> creates a new table cell.
        // Using Backtick here, this is called a template literal, which allows us to interpolate variables and strings like this
        tableHeaders.push(`<td>${key}</td>`);
    });
    // <tr> adds the value to a row
    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, previous){
    if (next && previous){
        return `<button onclick="writeToDocument('${previous}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !previous){
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (previous && !next){
        return `<button onclick="writeToDocument('${previous}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    var tableRows = [];
    // This clears the HTML data element each time a button is clicked
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(url, function(data) {
        // to this point we only see 10 rows of data, in order to see the rest we implement pagination function
        var pagination;
        if(data.next || data.previous){
            pagination = generatePaginationButtons(data.next, data.previous);
        }

        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item){
            var dataRow = [];

            Object.keys(item).forEach(function(key){
                // to tidy things up a little, we just show the truncated data to limit the space taken up on screen
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);

                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });
        //el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;
        //We have a display bug in that there are commas present at the top of the window. To remove these we use the replace method. /g means find all, then replace with empty string
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
}

