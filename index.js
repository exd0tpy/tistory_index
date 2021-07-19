var options = { 
	content: ".entry-content",
	header: "h2", 
	primaryColor: "#06D6A9", 
	secondaryColor: "#f0f0f0", 
	secondaryFontColor: "#999999",
	boxWidth: 200, 
	boxPadding: "5px", 
	boxFontSize: "15px", 
	boxBackgroundColor: "#e0e0e0",
	boxBorderRadius: "2px",
	boxMarginRight: 100,
} 

var entryWidth = 0;
var show = false;
var currentPos = -1; 
var headers = [];

function isUpside() {
    var docViewTop = $(window).scrollTop(); 
    var docViewBottom = docViewTop + $(window).height(); 
    var scrollHeight = document.body.scrollHeight;
    if(docViewTop < $(window).height()/4) return true;
    return false;
}

function createIndexBox(headers) { 
	var box = document.createElement('div'); 
	box.setAttribute("class", "IndexBox"); 
	box.style.width = options.boxWidth.toString() + "px"; 
	box.style.padding = options.boxPadding; 
	box.style.position = "fixed"; 
	box.style.backgroundColor = options.boxBackgroundColor; 
	box.style.left = (entryWidth - options.boxMarginRight).toString() + "px"; 
	box.style.top = "25%"; 
	box.style.zIndex = 100;
	box.style.borderRadius = options.boxBorderRadius;

	var indexList = document.createElement('div'); 
	indexList.setAttribute("class", "IndexList"); 

	for(let i =0; i< headers.length ; i++) { 
		var headerIndex = document.createElement('div'); 
		var headerText = document.createElement('a'); 
		headerText.textContent = headers[i].textContent; 
		headerText.onclick = function() {
			headers[i].scrollIntoView();
		};

		if(i == 0) headerText.style.color = options.primaryColor;
		else headerText.style.color = options.secondaryFontColor;
		headerText.style.paddingLeft = "5px"; 
		headerText.style.fontSize = options.fontSize;

		if(i == 0) headerText.style.borderLeft = "3px solid "+options.primaryColor; 
		else headerText.style.borderLeft = "3px solid "+options.secondaryColor; 
		headerText.style.float = "left"; 
		headerText.style.fontSize = options.boxFontSize; 

		headerText.setAttribute("class", "HeaderText"); 

		headerIndex.style.display = "inline-block"; 
		headerIndex.style.padding = "5px"; 
		headerIndex.append(headerText) 
		headerIndex.setAttribute("class", "HeaderIndex"); 
		indexList.append(headerIndex); 
	} 
	box.append(indexList); 

	return box; 
} 

function isScrolledIntoView(elem) 
{ 
    var docViewTop = $(window).scrollTop(); 
    var docViewBottom = docViewTop + $(window).height(); 

    var elemTop = $(elem).offset().top; 
    var elemBottom = elemTop + $(elem).height(); 

    return ((elemBottom + ($(window).height() / 2) <= docViewBottom) && (elemTop >= docViewTop + ($(window).height() / 3))); 
} 



function onscroll() { 
	for(let i =0; i<headers.length;i++) { 
		if(isScrolledIntoView(headers[i])) { 
			currentPos = i; 
			break; 
		} 
	} 

	if(show && isUpside()) {
		var box = document.querySelector(".IndexBox"); 
		box.remove();
		currentPos = -1;
		show = false;
	}

	if(currentPos != -1 && !show) {
		var content = document.querySelector(options.content); 
		content.append(createIndexBox(headers));
		currentPos = 0;
		show = true;
	}


	for(let i =0; i<headers.length;i++) { 
		if(show) {
			var headerText = document.querySelectorAll(".HeaderText")[i]; 
			if(i == currentPos){ 
				headerText.style.color = options.primaryColor;
				headerText.style.borderLeft = "3px solid "+options.primaryColor; 
			} 
			else { 
				headerText.style.color = options.secondaryFontColor;
				headerText.style.borderLeft = "3px solid "+options.secondaryColor; 
			} 
		}
		
	}


} 



window.addEventListener("DOMContentLoaded", function() {
	var styleElem = document.head.appendChild(document.createElement("style")); 

	styleElem.innerHTML = "#HeaderIndex:before { content: \"\"; position: absolute; bottom: 7px; left: 0; width: 2px; height: 100%; background-color: " + options.primaryColor + ";}"; 


	var entry = document.querySelector(options.content); 
	entryWidth = entry.offsetWidth;

	headers = entry.querySelectorAll(options.header); 

	window.addEventListener('scroll', onscroll);
}, false);
