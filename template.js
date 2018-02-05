var url = false;
var BASE64_MARKER = ';base64,';
var link = 'http://customizer.prolook.com/index';
var images = [
	{ front_thumbnail: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/921fb2227ff4a134b98c05d07d3bc7e5.png' },
	{ back_thumbnail: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/cb5f64487dd2542087fef52e9b531226.png' },
	{ left_thumbnail: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/c7625b7efb76906f372d26b6e4bee712.png' },
	{ right_thumbnail: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/af4c5c38cd1e855a526947082e67ea7e.png' }
];
var dataUrls = [{}];

function showURL() {
	if(url){
		console.log('true');
	}
}
showURL();

// extract text inside double quotes
function extractText( str ){
  var ret = "";

  if ( /"/.test( str ) ){
    ret = str.match( /"(.*?)"/ )[1];
  } else {
    ret = str;
  }

  return ret;
}

// convert data uri to binary
function convertDataURIToBinary(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for(var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

// convert to dataURL via canvas
function convertImgToDataURLviaCanvas(url, key, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
}

// convert to dataURL via filereader
function convertFileToDataURLviaFileReader(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

// loop to the images array
for (var i = 0; i < images.length; i++) {

	var objImgVal = images[i];

	(function (i) {

		// get property value and keys from images array object
		for (var [objKey, objUrl] of Object.entries(objImgVal)) {  

	        // convert and push to dataUrls array with keys
			convertImgToDataURLviaCanvas(objUrl, objKey, function(dataUrl) {
				 //var imgDataUrl = {[objKey]: dataUrl};
		  		 //dataUrls.push(imgDataUrl);
		  		 //console.log(imgDataUrl);

		  		 dataUrls[objKey] = dataUrl;
			})

		}

	}).call(this, i);	
	   	
}

// pass dataUrls to documentDefiniti`on function with setTimeout of 1 sec for convert
setTimeout(function(){ 
	console.log(dataUrls);
	documentDefinition(dataUrls); 
}, 1000);





// documentDefinition function
function documentDefinition(dataUrl) {
	//document definition
	var dd = {
		pageSize: 'letter',
		pageOrientation: 'landscape',
		pageMargins : [20, 20, 20, 20],
		content: [
			{
				columns: [
					{
						image: 'logo',
						width: 150
					},
					[
						{
							text: 'PRODUCT NAME' + '\n',
							style: ['medium', 'red'],
							margin: [30, 0, 0, 2]
						},
						{
							columns: [
								{
									text: [
										{
											text: [
												{
													text: 'Title:' + ' ',
													style: ['bold','black']
												},
												{
													text: 'text value here' + '\n'
												}
											]
										},
										{
											text: [
												{
													text: 'Title:' + ' ',
													style: ['bold','black']
												},
												{
													text: 'text value here' + '\n',
												}
											]
										},
										{
											text: [
												{
													text: 'Title:' + ' ',
													style: ['bold','black']
												},
												{
													text: 'text value here' + '\n',
												}
											]
										}
									],
									style: ['small', 'gray'],
									margin: [30, 0, 0, 0]
								},
								{
									text: [
										{
											text: [
												{
													text: 'Title:' + ' ',
													style: ['bold','black']
												},
												{
													text: 'text value here' + '\n',
												}
											]
										},
										{
											text: [
												{
													text: 'Title:' + ' ',
													style: ['bold','black']
												},
												{
													text: 'text value here' + '\n',
												}
											]
										},
										{
											text: [
												{
													text: 'Title:' + ' ',
													style: ['bold','black']
												},
												{
													text: 'text value here' + '\n',
												}
											]
										}
									],
									style: ['small', 'gray'],
									margin: [30, 0, 0, 0]
								},
								{
									text: [
										{
											text: [
												{
													text: 'CUSTOMER:' + ' ',
													style: ['bold','black']
												},
												{
													text: 'text value here' + '\n',
												}
											]
										},
										{
											text: [
												{
													text: 'DATE:' + ' ',
													style: ['bold','black']
												},
												{
													text: 'text value here' + '\n',
												}
											]
										},
										{
											text: [
												{
													text: 'Title:' + ' ',
													style: ['bold','black']
												},
												{
													text: 'text value here' + '\n',
												}
											]
										}
									],
									style: ['small', 'gray'],
									margin: [30, 0, 0, 0]
								},
							]
						}
					]
				]
			},
			{canvas: [{ type: 'line', x1: 0, y1: 5, x2: 1095-2*40, y2: 5, lineWidth: 1, lineColor: 'gray', }], margin: [0, 5, 0, 0],},
			{
				text: [
					{
						text:'URLS',
						style: ['small','black','black','bold']
					}
				],
				margin: [0, 10, 0, 0]
			},
			{
				text: [
					{
						text:'BUILDER URL', 
						link: link,
						style: ['small','blue','underline']
					},
					{ 	
						text: '   |   ',
						style: ['small','black']
					},
					{
						text:'PDF URL', 
						link: link,
						style: ['small','blue','underline']
					},
					{ 	
						text: '   |   ',
						style: ['small','black']
					},
					{
						text:'Cut URL', 
						link: link,
						style: ['small','blue','underline']
					},
					{ 	
						text: '   |   ',
						style: ['small','black']
					},
					{
						text:'STYLE PDF URL', 
						link: link,
						style: ['small','blue','underline']
					}
				],
				margin: [0, 0, 0, 20]
			},
			{
				columns: [
					{
						text: [
							{
								text: 'DETAILS' + '\n',
							    style: ['large','red','bold']
					    	},
							{
								text: [
									{
										text: 'Title:' + ' ',
										style: ['medium','bold','black']
									},
									{
										text: 'text value here' + '\n',
									}
								]
							},
							{
								text: [
									{
										text: 'Title:' + ' ',
										style: ['medium','bold','black']
									},
									{
										text: 'text value here' + '\n',
									}
								]
							},
							{
								text: [
									{
										text: 'Title:' + ' ',
										style: ['medium','bold','black']
									},
									{
										text: 'text value here' + '\n',
									}
								]
							},
							{
								text: [
									{
										text: 'Title:' + ' ',
										style: ['medium','bold','black']
									},
									{
										text: 'text value here' + '\n',
									}
								]
							},
							{
								text: [
									{
										text: 'Title:' + ' ',
										style: ['medium','bold','black']
									},
									{
										text: 'text value here' + '\n',
									}
								]
							}
						],
						width: 150
					},
					{
						image: dataUrls.front_thumbnail,
						width: 150				
					},
					{
						image: dataUrls.back_thumbnail,
						width: 150				
					},
					{
						image: dataUrls.left_thumbnail,
						width: 150				
					},
					{
						image: dataUrls.right_thumbnail,
						width: 150				
					}
				],
				style: ['medium','gray'],
				margin: [0, 0, 0, 20]
			},
			{
				style: 'tableStandard',
				alignment: 'center',
				table: {
					widths: ['25%', '25%', '25%', '25%'],
					body: [
						[
							{text: 'FRONT', style: 'tableHeader'}, 
							{text: 'BACK', style: 'tableHeader'}, 
							{text: 'LEFT', style: 'tableHeader'},
							{text: 'RIGHT', style: 'tableHeader'},	
						],		
						[
							'Lorem ipsum dolor sit amet',
							'Lorem ipsum dolor sit amet',
							'Lorem ipsum dolor sit amet',
						    'Lorem ipsum dolor sit amet'
						]
					]
				}
			},
			{
				text: 'ROSTER',
			    style: ['large','red','bold']
			},
			{
				style: 'tableStandard',
				alignment: 'center',
				table: {
					widths: ['25%', '25%', '25%', '25%'],
					body: [
						[
							{text: 'SIZE', style: 'tableHeader'}, 
							{text: 'QUANTITY', style: 'tableHeader'}, 
							{text: 'NUMBER', style: 'tableHeader'},
							{text: 'LASTNAME', style: 'tableHeader'},	
						],	
						['24-34', '1', '1', 'DOE'],
						['24-34', '1', '1', 'DOE'],
						['24-34', '1', '1', 'DOE'],
						['24-34', '1', '1', 'DOE'],
						['24-34', '1', '1', 'DOE'],
						['24-34', '1', '1', 'DOE'],
						['24-34', '1', '1', 'DOE'],
						['24-34', '1', '1', 'DOE'],
						['24-34', '1', '1', 'DOE'],
						['24-34', '1', '1', 'DOE'],
						['24-34', '1', '1', 'DOE'],
						['24-34', '1', '1', 'DOE'],
					]
				},
				layout: {
					fillColor: function (i, node) {
						return (i % 2 === 1) ? '#e1e1e1' : null;
					},
					hLineWidth: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 1 : 1;
					},
					vLineWidth: function (i, node) {
						return (i === 0 || i === node.table.widths.length) ? 1 : 1;
					},
					hLineColor: function (i, node) {
						return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
					},
					vLineColor: function (i, node) {
						return (i === 0 || i === node.table.widths.length) ? 'gray' : 'black';
					},
					// paddingLeft: function(i, node) { return 4; },
					// paddingRight: function(i, node) { return 4; },
					// paddingTop: function(i, node) { return 2; },
					// paddingBottom: function(i, node) { return 2; },
					// fillColor: function (i, node) { return null; }
					}
			},
			// {
			//     columns: [
			//         { width: '*', text: '' },
			//         {
			//             width: 'auto',
			//                 table: {
			//                         body: [
			//                                 ['Column 1', 'Column 2', 'Column 3', 'Column 4'],
			//                                 ['One value goes here', 'Another one here', 'Another one here', 'Another one here']
			//                         ]
			//                 }
			//         },
			//         { width: '*', text: '' },
			//     ]
			// },
		],

		styles: {
			tableStandard: {
				fontSize: 10,
				margin: [0, 5, 0, 15]
			},
			tableHeader: {
				bold: true,
				fontSize: 10,
				color: 'black'
			},
			underline: { decoration: 'underline' },
			small: { fontSize: 8 },
			medium: { fontSize: 10 },
			large: { fontSize: 12 },
			black: { color: 'black' },
			blue: { color: '#0074c1' },
			gray: { color: '#616366' },
		    red: { color: '#e11a38' },
			bold: { bold: true }
		},
		images: {
			logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAegAAACFCAIAAAAfL/xrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAIf2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDEtMjlUMTU6NTA6MjMrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDEtMjlUMTU6NTA6MzYrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTAxLTI5VDE1OjUwOjM2KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MjQzNjcyOC05ZmJlLWU1NGUtOGVkNi1mMzMxMDc3MjNmZTgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozNzJiMzE0YS1hMjE0LTVmNDUtYTBmNy1iZTIwYWVhYjFhMjMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNWNkMzQ0MS01YTA4LTAxNDQtOTk5OC04OTAwYmIwOTFjYzciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjA1Y2QzNDQxLTVhMDgtMDE0NC05OTk4LTg5MDBiYjA5MWNjNyIgc3RFdnQ6d2hlbj0iMjAxOC0wMS0yOVQxNTo1MDoyMyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDg0NTNjYWItZTU3Yy1iNTQ4LWJkZTgtM2Q1ZjVkZTk2OWY1IiBzdEV2dDp3aGVuPSIyMDE4LTAxLTI5VDE1OjUwOjM2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MjQzNjcyOC05ZmJlLWU1NGUtOGVk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',

		}
		
	}

	// pdfMake.createPdf(dd).getBase64(function(encodedString) {
	// 	console.log(encodedString);
	// 	//decode encodedString
 //    	//var pdfData = atob(encodedString);
 //    	//console.log(pdfData);

 //    	//openPDF(pdfData);
	// });

	// get dataURL from pdfmake
	// pdfMake.createPdf(dd).getDataUrl(function(pdfAsDataUri) {
	// 	// convert to binary
 //    	var pdfAsArray = convertDataURIToBinary(pdfAsDataUri);

 //    	// use in pdfjs
 //    	//PDFJS.getDocument(pdfAsArray)

 //    	console.log(pdfAsArray);
 //    	renderPDF(pdfAsArray);
	// });

	// open the PDF in a new window
	//console.log(pdfMake.createPdf(dd));
	 pdfMake.createPdf(dd).open();
	// var win = window.open('', '_blank');
	// $http.post('/someUrl', data).then(function(response) {
	//     // pass the "win" argument
	//     pdfMake.createPdf(docDefinition).open({}, win);
 //    });

	// print the PDF
	// pdfMake.createPdf(docDefinition).print();

	// download the PDF
	// pdfMake.createPdf(docDefinition).download('optionalName.pdf');

	// Get the PDF as base64 data
	// var pdfDocGenerator = pdfMake.createPdf(dd);
	// pdfDocGenerator.getBase64((data) => {
	// 	console.log(data);
	// });

	// Get the PDF as buffer
	// var pdfDocGenerator = pdfMake.createPdf(dd);
	// pdfDocGenerator.getBuffer((buffer) => {
	// 	// ...
	// });

	// Get the PDF as Blob
	// var pdfDocGenerator = pdfMake.createPdf(dd);
	// pdfDocGenerator.getBlob((blob) => {
	// 	// ...
	// });
}

function renderPDF(pdfData) {
	// Disable workers to avoid yet another cross-origin issue (workers need
	// the URL of the script to be loaded, and dynamically loading a cross-origin
	// script does not work).
	// PDFJS.disableWorker = true;

	// The workerSrc property shall be specified.
	PDFJS.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

	// Using DocumentInitParameters object to load binary data.
	var loadingTask = PDFJS.getDocument({data: pdfData});
	loadingTask.promise.then(function(pdf) {
	  console.log('PDF loaded');
	  
	  // Fetch the first page
	  var pageNumber = 1;
	  pdf.getPage(pageNumber).then(function(page) {
	    console.log('Page loaded');
	    
	    var scale = 1.5;
	    var viewport = page.getViewport(scale);

	    // Prepare canvas using PDF page dimensions
	    var canvas = document.getElementById('the-canvas');
	    var context = canvas.getContext('2d');
	    canvas.height = viewport.height;
	    canvas.width = viewport.width;

	    // Render PDF page into canvas context
	    var renderContext = {
	      canvasContext: context,
	      viewport: viewport
	    };
	    var renderTask = page.render(renderContext);
	    renderTask.then(function () {
	      console.log('Page rendered');
	    });
	  });
	}, function (reason) {
	  // PDF loading error
	  console.error(reason);
	});
}