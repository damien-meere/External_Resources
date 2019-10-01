// XMLHttpRequest object is an inbuilt object that JavaScript provides to allow us to consume APIs.
var xhr = new XMLHttpRequest();
var data;

xhr.open("GET", "https://swapi.co/api/");
xhr.send();

function setData(jsonData) {
    data = jsonData;
}

xhr.onreadystatechange = function() {
    // for information on the XHR Ready States - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
    // 4 = Operation is complete
    console.log(this.readyState);
    if (this.readyState == 4 && this.status == 200) {
        setData(JSON.parse(this.responseText));

        // Parse the JSON Object and log to the console
        //console.log(JSON.parse(this.responseText));
        //data = this.responseText;
        //retrieve data and place it in the index.html data placeholder
        //document.getElementById("data").innerHTML = this.responseText;
    }
};

// the setTimeout fuction takes 2 parameters, one a function and two the durationt to wait. This give the previous function time to complete
setTimeout(function(){
    console.log(data);
}, 5000);