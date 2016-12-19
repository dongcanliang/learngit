var getJSON = function(url) {
	var promise = new Promise(function(resolve, reject) {
		if(window.XMLHttpRequest) {
			var client = new XMLHttpRequest();
		} else {
			var client = new ActiveXObject("Microsoft.XMLHTTP");
		}
		client.open("GET", url, true);
		client.onreadystatechange = handler;
		client.responseType = "json";
		client.setRequestHeader("Accept", "application/json");
		client.send();

		function handler() {
			if (this.readyState !== 4) {
				return;
			}
			if (this.status === 200) {
				resolve(this.response);
			} else {
				reject(new Error(this.statusText));
			}
		};
	});

	return promise;
};

getJSON("/posts.json").then(function(json) {
	console.log('Contents: ' + json);
}, function(error) {
	console.error('出错了', error);
});

var postData = function(url, para) {
	var promise = new Promise(function(resolve, reject) {
		if(window.XMLHttpRequest) {
			var client = new XMLHttpRequest();
		} else {
			var client = new ActiveXObject("Microsoft.XMLHTTP");
		}
		client.open("POST", url, true);
		client.onreadystatechange = handler;
		client.responseType = "json";
		client.setRequestHeader("Accept", "application/json");
		client.send(para);

		function handler() {
			if (this.readyState !== 4) {
				return;
			}
			if (this.status === 200) {
				resolve(this.response);
			} else {
				reject(new Error(this.statusText));
			}
		};
	});

	return promise;
};