var url = false;
var BASE64_MARKER = ';base64,';
var link = 'http://customizer.prolook.com/index';
var images = [
	{ front_thumbnail: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/3d4dc4646b97bf91a177c394b4697e4c.png' },
	{ back_thumbnail: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/0e1769f890fd28b7c82bf8a05163660e.png' },
	{ left_thumbnail: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/cc5798f275b3ccd21f0b11b8f437c713.png' },
	{ right_thumbnail: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/d2abd7b4922cecebf8ac74119e77eb00.png' }
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

//// convert data uri to binary
//function convertDataURIToBinary(dataURI) {
//  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
//  var base64 = dataURI.substring(base64Index);
//  var raw = window.atob(base64);
//  var rawLength = raw.length;
//  var array = new Uint8Array(new ArrayBuffer(rawLength));
//
//  for(var i = 0; i < rawLength; i++) {
//    array[i] = raw.charCodeAt(i);
//  }
//  return array;
//}

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

//// convert to dataURL via filereader
//function convertFileToDataURLviaFileReader(url, callback) {
//  var xhr = new XMLHttpRequest();
//  xhr.onload = function() {
//    var reader = new FileReader();
//    reader.onloadend = function() {
//      callback(reader.result);
//    }
//    reader.readAsDataURL(xhr.response);
//  };
//  xhr.open('GET', url);
//  xhr.responseType = 'blob';
//  xhr.send();
//}

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


var order_info = {
    width: '40%',
    columns:[
        {
            stack: [
                {
                    text: [
                        {
                            text: 'CLIENT NAME:'+' '
                        },
                        {
                            text: 'John Doe'
                        }
                    ]
                },
                {
                    text: [
                        {
                            text: 'Sport:'+' '
                        },
                        {
                            text: 'Football 2017'
                        }
                    ]
                }
            ]
        },
        {
            stack: [
                {
                    text: [
                        {
                            text: 'Date:'+' '
                        },
                        {
                            text: '00-00-00'
                        }
                    ]
                },
                {
                    text: [
                        {
                            text: 'Order Number:'+' '
                        },
                        {
                            text: '46948FCD'
                        }
                    ]
                }
            ]
        }
    ]
}

var header_info_blank =  {
    stack:[
        {
            style: ['fsz_small'],
            columns: [
                {
                    stack: [
                        {
                            image:'logo',
                            width: 70
                        }
                    ]

                }
            ]
        },
        {
            canvas: [
                {
                    type: 'line', x1: 0, y1: 5, x2: 832-2*40, y2: 5, lineWidth: 1, lineColor: 'gray', 
                }
            ],
            style:['gap_small_top','text_align_center']
        }
    ],
    margin: 20
}

var header_info_full =  {
    stack:[
        {
            style: ['fsz_small'],
            columns: [
                {
                    stack: [
                        {
                            image:'logo',
                            width: 70
                        }
                    ]

                },
                order_info
            ]
        },
        {
            canvas: [
                {
                    type: 'line', x1: 0, y1: 5, x2: 832-2*40, y2: 5, lineWidth: 1, lineColor: 'gray', 
                }
            ],
            style:['gap_small_top','text_align_center']
        }
    ],
    margin: 20
}

// documentDefinition function
function documentDefinition(dataUrl) {
    var dd = {
        pageSize: 'letter',
        pageOrientation: 'landscape',
        pageMargins : [20, 72],
        header: function(currenPage) {
            if (currenPage == 1) {
                return header_info_full;
            }
            else {
                return header_info_blank;
            }
        },
        
        
        content:[
            {
                style:['gap_medium_top'],
                columns: [
                    {
                        stack:[
                            {
                                    text:[
                                        {
                                            text:'ILLINI SUBLIMATED 17 JERSEY'+'\n',
                                            style: ['fc_red','fs_bold','fs_italic']
                                        },
                                        {
                                            text:'SUBLIMATED'
                                        }
                                    ],
                                    style:['fsz_medium']
                                },
                                {
                                    text:[
                                        {
                                            text:'URLS:'+'\n',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text:'BUILDER URL',
                                            link: link,
                                            style: ['fc_blue','fs_underline','fsz_small']
                                        },
                                        {
                                            text: '   |   '
                                        },
                                        {
                                            text:'PDF URL',
                                            link: link,
                                            style: ['fc_blue','fs_underline','fsz_small']
                                        },
                                        {
                                            text: '   |   '
                                        },
                                        {
                                            text:'PDF URL',
                                            link: link,
                                            style: ['fc_blue','fs_underline','fsz_small']
                                        },
                                        {
                                            text: '   |   '
                                        },
                                        {
                                            text:'CUT URL',
                                            link: link,
                                            style: ['fc_blue','fs_underline','fsz_small']
                                        },
                                        {
                                            text: '   |   '
                                        },
                                        {
                                            text:'STYLE PDF URL',
                                            link: link,
                                            style: ['fc_blue','fs_underline','fsz_small']
                                        }
                                    ],
                                    style:['gap_medium_top']
                                },
                                {
                                    text:[
                                        {
                                            text:'PART DETAILS',
                                            style: ['fc_red','fs_bold','fsz_medium']
                                        }
                                    ],
                                    style:['gap_large_top']
                                },
                                {
                                    text:[
                                        {
                                            text: 'FRONT BODY:'+' ',
                                            style: ['fsz_small'],
                                            margin: [ 5, 2, 10, 20 ]
                                        },
                                        {
                                            text: 'RED (R)'+'\n',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'BACK BODY:'+' ',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'RED (R)'+'\n',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'NECK TRIM:'+' ',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'RED (R)'+'\n',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'SLEEVES:'+' ',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'RED (R)'+'\n',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'ARM TRIM:'+' ',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'BLACK (B)'+'\n',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'SHOULDER INSERT 1:'+' ',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'GOLD (G)'+'\n',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'SHOULDER INSERT 2:'+' ',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'RED (D)'+'\n',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'SHOULDER INSERT 3:'+' ',
                                            style: ['fsz_small']
                                        },
                                        {
                                            text: 'BLACK (B)'+'\n',
                                            style: ['fsz_small']
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    stack:[
                                        {
                                            stack:[
                                                {
                                                    image: dataUrls.front_thumbnail,
                                                    width: 180,
                                                    style: ['fc_blue','fs_underline','fsz_small','text_align_center']
                                                },
                                                {
                                                    text:'FRONT',
                                                    link: link,
                                                    style: ['fc_blue','fs_underline','fsz_small','text_align_center']
                                                }
                                            ]
                                        },
                                        {
                                            stack:[
                                                {
                                                    image: dataUrls.left_thumbnail,
                                                    width: 180,
                                                    style: ['fc_blue','fs_underline','fsz_small','text_align_center']
                                                },
                                                {
                                                    text:'LEFT',
                                                    link: link,
                                                    style: ['fc_blue','fs_underline','fsz_small','text_align_center']
                                                }
                                            ],
                                            style:['gap_medium_top']
                                        }
                                    ]
                                },
                                {
                                    stack:[
                                        {
                                            stack:[
                                                {
                                                    image: dataUrls.back_thumbnail,
                                                    width: 180,
                                                    style: ['fc_blue','fs_underline','fsz_small','text_align_center']
                                                },
                                                {
                                                    text:'BACK',
                                                    link: link,
                                                    style: ['fc_blue','fs_underline','fsz_small','text_align_center']
                                                }
                                            ]
                                        },
                                        {
                                            stack:[
                                                {
                                                    image: dataUrls.right_thumbnail,
                                                    width: 180,
                                                    style: ['fc_blue','fs_underline','fsz_small','text_align_center']
                                                },
                                                {
                                                    text:'RIGHT',
                                                    link: link,
                                                    style: ['fc_blue','fs_underline','fsz_small','text_align_center']
                                                }
                                            ],
                                            style:['gap_medium_top']
                                        }
                                    ]
                                }
                            ]
                        }                        
                    ]
                },
            
            
            {
                pageBreak: 'before',
                style:['gap_medium_top'],
                table: {
                    widths: ['*', '*', '*', '*'],
                    pageBreak: 'before',
                    body: [
                        [
                            {
                                text: 'Title'
                         },
                            {
                                text: 'Title'
                         },
                            {
                                text: 'Title'
                         },
                            {
                                text: 'Title'
                         }
                        ],
                        [
                            {
                                text: ''
                            },
                            {
                                text: '#3 Player Name:',
                                style:['fsz_small','fc_gray']
                            },
                            {
                                text: ''
                            },
                            {
                                style:['fsz_small'],
                                stack: [
                                    {
                                        columns: [
                                            {
                                                text:'#6 Sleeve Numbers:',
                                                style:['fc_gray']
                                            },
                                            {
                                                text:'85',
                                                style:['fc_dark']
                                            }
                                        ]
                                    },
                                    {
                                        columns: [
                                            {
                                                text:'Colors:',
                                                style:['fc_gray']
                                            },
                                            {
                                                text:'W,G,B',
                                                style:['fc_dark']
                                            }
                                        ]
                                    },
                                    {
                                        columns: [
                                            {
                                                text:'Patern:',
                                                style:['fc_gray']
                                            },
                                            {
                                                text:'N/A',
                                                style:['fc_dark']
                                            }
                                        ]
                                    },
                                    {
                                        columns: [
                                            {
                                                text:'Front:',
                                                style:['fc_gray']
                                            },
                                            {
                                                text:'Brewer',
                                                style:['fc_dark']
                                            }
                                        ]
                                    },
                                    {
                                        columns: [
                                            {
                                                text:'Side:',
                                                style:['fc_gray']
                                            },
                                            {
                                                text:'10"',
                                                style:['fc_dark']
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        [
                            {
                                style:['fsz_small'],
                                stack: [
                                    {
                                        columns: [
                                            {
                                                text:'#2 Sleeve Numbers:',
                                                style:['fc_gray']
                                            },
                                            {
                                                text:'85',
                                                style:['fc_dark']
                                            }
                                        ]
                                    },
                                    {
                                        columns: [
                                            {
                                                text:'Colors:',
                                                style:['fc_gray']
                                            },
                                            {
                                                text:'W,G,B',
                                                style:['fc_dark']
                                            }
                                        ]
                                    },
                                    {
                                        columns: [
                                            {
                                                text:'Patern:',
                                                style:['fc_gray']
                                            },
                                            {
                                                text:'N/A',
                                                style:['fc_dark']
                                            }
                                        ]
                                    },
                                    {
                                        columns: [
                                            {
                                                text:'Front:',
                                                style:['fc_gray']
                                            },
                                            {
                                                text:'Brewer',
                                                style:['fc_dark']
                                            }
                                        ]
                                    },
                                    {
                                        columns: [
                                            {
                                                text:'Side:',
                                                style:['fc_gray']
                                            },
                                            {
                                                text:'8"',
                                                style:['fc_dark']
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                text: ''
                            },
                            {
                                text: ''
                            },
                            {
                                text: ''
                            }
                        ]
                    ]
                }
            }
        ],
                

            styles: {
                header: {
                    fontSize: 24,
                    bold:true,
                },
                text_content: {
                    color: '#666'
                },
                
                text_align_left: {
                    alignment: 'left'
                },
                text_align_center: {
                    alignment: 'center'
                },
                text_align_right: {
                    alignment: 'right'
                },
                
                fc_dark: {
                    color: '#222'
                },  
                fc_gray: {
                    color: '#666'
                },                
                fc_red: {
                    color:'#b71c1c'
                },      
                fc_blue: {
                    color:'#0d47a1'
                },
                
                fsz_small: {
                    fontSize: 8
                },
                fsz_medium: {
                    fontSize: 10
                },
                fsz_large: {
                    fontSize: 12
                },
                
                fs_bold: {
                    bold:true
                },
                fs_italic: {
                    italics: true
                },
                fs_underline: {
                    decoration: 'underline'
                },
                
                gap_small_top: {
                    margin: [0, 10, 0, 0]
                },
                gap_medium_top: {
                    margin: [0, 15, 0, 0]
                },
                gap_large_top: {
                    margin: [0, 20, 0, 0]
                }
                    
            },
        images: {
            logo: 'data:image/png;base64,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',
        }
    }
pdfMake.createPdf(dd).open();
}