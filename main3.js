const baseURL = "https://swapi.co/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL + type + "/");
    xhr.send();
}

function writeToDocument(type) {
    var tableRows = [];
    // This clears the HTML data element each time a button is clicked
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(type, function(data) {
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item){
            var dataRow = [];
            Object.keys(item).forEach(function(key){
                dataRow.push(`<td>{$item[key]}</td>`);
            });
            tableRows.push(dataRow);
        });
        el.innerHTML = `<table${tableHeaders}${tableRows}</table>`
    });
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