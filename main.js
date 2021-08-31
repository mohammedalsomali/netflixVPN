let xval = [];
let yval = [];
const stock = document.querySelector('#stockcode');
const btn = document.querySelector('.searchbtn');
var container = document.querySelector('.newsdiv');
var stockcod = 0;
var myChart;
// const stocktype = document.querySelector('#subject');
var timeinterval;
// const historych = document.querySelector('#history');
// const personalAPIch = document.querySelector('#API');
var stockname;
var sear = '';
var interval = '';
var openor;
var chioce = 0;
var timeInt = 0;
var history1 = 0;
var Api_key = 'MOR0CI3PU3IZ43EN';


const daily = document.querySelector('.dailyBtn');
const hourly = document.querySelector('.hourlyBtn');
const stockb = document.querySelector('.stockBtn');
const crypto = document.querySelector('.cryptoBtn');







daily.addEventListener('click', function(){
	timeinterval = 'daily'
	// console.log(timeinterval);
	hourly.style.color = '';
	daily.style.color = 'white';
	change();
	// console.log(chioce);

})

hourly.addEventListener('click', function(){
	timeinterval = 'hourly'
	// console.log(timeinterval);
	hourly.style.color = 'white';
	daily.style.color = '';



	change();
	// console.log(chioce);

})



stockb.addEventListener('click', function(){
	chioce = 'stock'
	// console.log(chioce);
	crypto.style.color = '';
	stockb.style.color = 'white';
	change();
	// console.log(chioce);

})





crypto.addEventListener('click', function(){
	chioce = 'crypto'
	change();
	// console.log(chioce);
	crypto.style.color = 'white';
	stockb.style.color = '';

})



function change(){
	if (timeinterval == "daily"){ 
		if (chioce == 'stock'){
			timeInt = 'TIME_SERIES_DAILY';
			sear = 'Time Series (Daily)';
		}
		else if (chioce == 'crypto'){
			timeInt = 'DIGITAL_CURRENCY_DAILY';
			sear = 'Time Series (Digital Currency Daily)';
			openpr = '1b. open (USD)';
			

		}
		

	}
	else if (timeinterval == "hourly"){
		interval = '&interval=60min';
		if (chioce == 'stock'){
			timeInt = 'TIME_SERIES_INTRADAY';
			sear = 'Time Series (60min)';
		}
		else if (chioce == 'crypto'){
			timeInt = 'CRYPTO_INTRADAY';
			sear = 'Time Series Crypto (60min)';
			openpr = '1. open';

		}

		
	}
	// console.log(chioce);
}

// timeintervalch.addEventListener('change', function(){
// 	change();
	

// })


// historych.addEventListener('change', function(){
// 	if (historych.value == "full"){
// 		history1 = historych.value;
// 	}
// 	else {
// 		history1 = historych.value;

// 	}
// 	// console.log(history1);

// })



// personalAPIch.addEventListener('change', function(){
// 	Api_key = personalAPIch.value
// 	console.log(chioce);

// })



btn.addEventListener('click', function() {
	
	
	if( typeof myChart != 'undefined'){
		myChart.destroy();
		


	}




	if(stock.value == 0 || chioce == 0 || timeInt == 0 ){
		alert('inter stock code/ pick a stock market first/ a time interval/  history');

	}
	else {
		stockcod = stock.value;
		sketch();
		fetchnewsAPI();
	}
	// sketch();


} )



async function fetchstockAPI() {


	await fetch('https://www.alphavantage.co/query?function=' + timeInt + '&symbol=' + stockcod + interval + '&outputsize=' + 'combact' + '&apikey=' + Api_key ,
	)
		.then(response => {
			let x = response.json()
			let data = JSON.stringify(x);
			xval.length = 0;
			yval.length = 0;


			// console.log(x);
			return x
		})
		.then(data => {
			// console.log(data);
			stockname = stockcod;
			
			

		
			for (var key in data[sear]) {
				// console.log(0);
				xval.unshift(key);
				yval.unshift(data[sear][key]['1. open']);

			}
			// console.log(xval, yval);
		});

		// interval = '';
	

	


}

async function fetchcryptoAPI() {


	await fetch('https://www.alphavantage.co/query?function=' + timeInt + '&symbol=' + stockcod + '&market=USD' + interval + '&outputsize=' + 'combact' + '&apikey=' + Api_key,
	)
		.then(response => {
			let x = response.json()
			let data = JSON.stringify(x);
			xval.length = 0;
			yval.length = 0;

			// console.log(x);
			// console.log(data);
			return x
		})
		.then(data => {
			// console.log(data['Meta Data']['3. Digital Currency Name']);
			stockname = data['Meta Data']['3. Digital Currency Name'];
			for (var key in data[sear]) {
				// console.log(0);
				xval.unshift(key);
				yval.unshift(data[sear][key][openpr]);

			}
			
		});
		// console.log(xval, yval);

	

	


}







async function sketch() { 
	
	
	
	

	if (chioce == "crypto") {
		await fetchcryptoAPI();
	}
	else {

		await fetchstockAPI();

	}

	// console.log(xval, yval);
	const win = document.getElementById('chart');
	
	const ctx = win.getContext('2d');
	
	myChart = new Chart(ctx, {
		
		
	
		
		type: 'line',
		data: {
			labels: xval,
			datasets: [
			{
				label: 'stock data of :' + stockname,
				data: yval,
				backgroundColor: 'white',
				borderColor: 'rgb(75, 192, 192)',
				borderWidth: 1,
				responsive: true,
				maintainAspectRatio: false,
				tension: 0.1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			},
			// Container for pan options
			pan: {
				// Boolean to enable panning
				enabled: true,
	
				// Panning directions. Remove the appropriate direction to disable 
				// Eg. 'y' would only allow panning in the y direction
				mode: 'x',
	
				speed: 1
			},
	
			// Container for zoom options
			zoom: {
				// Boolean to enable zooming
				enabled: true,                      
				// Zooming directions. Remove the appropriate direction to disable 
				// Eg. 'y' would only allow zooming in the y direction
				mode: 'x',
			}
		}
		
	});
	
	
	

}






// 27ebb9c1d2d14584869cfe9184a24f6a


async function fetchnewsAPI() {


	await fetch('https://newsapi.org/v2/everything?q=' + stockcod + '&apiKey=27ebb9c1d2d14584869cfe9184a24f6a',
	)
		.then(response => {
			let x = response.json()
			let data = JSON.stringify(x);
			
			console.log(data);
			return x
		})
		.then(data => {
			console.log(data.articles);
			for (var i = 0; i < data.articles.length; ++i) {
				console.log(data.articles[i].title);
				var array_div = document.createElement("div");
				var array_ele1 = document.createElement("img");
				var array_title = document.createElement("h1");
				var array_title2 = document.createElement("h1");
				var array_a = document.createElement("p");

				var array_sum = document.createElement("p1");
				

				// array_ele.style.width = 10 + 'px';

				
				array_div.classList.add("block");
				array_ele1.classList.add("blockimg");
				array_a.innerText = data.articles[i].title;
				array_a.href = data.articles[i].url;
				array_sum.innerText = data.articles[i].description;
				array_ele1.src = data.articles[i].urlToImage;
				array_title2.innerHTML = 'Author: ' + data.articles[i].author;



				array_ele1.style.width = `${70}px`;
				array_ele1.style.height = `${70}px`;
				array_a.style.fontSize = `${20}px`;
				array_title2.style.fontSize = `${7}px`;
				// array_title.style.display = 'block';
				// array_a.style.float = 'right';


				// console.log(data.articles[i].url, typeof data.articles[i].url );
				array_title.appendChild(array_ele1);
				
				array_title.appendChild(array_title2);
				array_title.appendChild(array_a);

				array_div.appendChild(array_title);
				array_div.appendChild(array_sum);
				// array_div.appendChild(array_ele1);

				container.appendChild(array_div);
				// container.appendChild(array_ele);
				
			
			   
			  

			}
			
		});
		

	

	


}