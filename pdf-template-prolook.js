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

// BLANK HEADER
var headerInfoBlank =  {
    style: ['fsz_small'],
    table: {
        widths: ['auto','*'],
        defaultBorder: false,
        body: [
        [
        {
            border: [false,false,true,true],
            image:'logo',
            width: 68
        },
        {
            border: [false,false,false,true],
            text:''
        }
        ]

        ]
    },
    layout: {
        hLineWidth: function(i, node) { return .5; },
        vLineWidth: function(i, node) { return .5; },
        hLineColor: function(i, node) { return '#444'; },
        vLineColor: function(i, node) { return '#444'; },

        paddingLeft: function(i, node) { return 20; },
        paddingRight: function(i, node) { return 20; },
        paddingTop: function(i, node) { return 14.5; },
        paddingBottom: function(i, node) { return 14.5; },
    }
}

// BLANK FULL HEADER
var headerInfoFull =  {
    style: ['fsz_small'],
    table: {
        widths: ['auto','*'],
        defaultBorder: false,
        body: [
        [
        {
            border: [false,false,true,true],
            image:'logo',
            width: 68
        },
        {
            border: [false,false,false,true],
            columns:[
            {
                width: '*',
                stack: [
                    {
                        text: [
                            {
                                text: 'CLIENT NAME:'+' '
                            },
                            {
                                text: 'John Doe',
                                style: ['fs_bold','fc_gray']
                            }
                        ]
                    },
                    {
                        text: [
                            {
                                text: 'Sport:'+' '
                            },
                            {
                                text: 'Football 2017',
                                style: ['fs_bold','fc_gray']
                            }
                        ]
                    },
                    {
                        text: [
                            {
                                text: 'Date:'+' '
                            },
                            {
                                text: '00-00-00',
                                style: ['fs_bold','fc_gray']
                            }
                        ]
                    }
                ]
            },
            {
                width: '*',
                stack: [
                    {
                        text: [
                            {
                                text: 'Order ID:'+' '
                            },
                            {
                                text: '2018-ABC',
                                style: ['fs_bold','fc_gray']
                            }
                        ]
                    },
                    {
                        text: [
                            {
                                text: 'RE-ORDER:'+' '
                            },
                            {
                                text: '',
                                style: ['fs_bold','fc_gray']
                            }
                        ]
                    },
                    {
                        text: [
                            {
                                text: 'FOID:'+' '
                            },
                            {
                                text: 'http://customizer.prolook.com',
                                link: link,
                                style: ['fs_underline', 'fc_blue'],
                            }
                        ]
                    }
                ]
            },
            {
                width: 'auto',
                stack: [
                    {
                        image:'qrcode',
                        width: 42
                    }
                ]
            }
            ]
        }
        ]

        ]
    },
    layout: {
        hLineWidth: function(i, node) { return .5; },
        vLineWidth: function(i, node) { return .5; },
        hLineColor: function(i, node) { return '#444'; },
        vLineColor: function(i, node) { return '#444'; },

        paddingLeft: function(i, node) { return 20; },
        paddingRight: function(i, node) { return 20; },
        paddingTop: function(i, node) { return 14.5; },
        paddingBottom: function(i, node) { return 14.5; },
    }
}

// Footer
function footerInfo (cp) {
    return {
    style: ['fsz_small','gap_large_top'],
    table: {
        widths: ['*','*'],
        defaultBorder: false,
        body: [
        [
        {
            border: [false,true,false,false],
            text: [
            {
                text: 'Source:  ',
                style: ['fs_bold','fc_gray',]
            },
            {
                text: 'Prolook Customizer'
            }
            ]
        },
        {
            border: [false,true,false,false],
            // style: ['fc_gray',],
            text: ' '
        }
        ],
        [
        {
            border: [false,false,false,false],
            text: [
            {
                text: 'Order Code / FOID:  ',
                style: ['fs_bold','fc_gray']
            },
            {
                text: 'P-M-FBGJ-SP17-10-F09-17'
            }
            ]
        },
        {
            border: [false,false,false,false],
            style: ['text_align_right'],
            text: [
            {
                text: 'Page:  ',
                style: ['fs_bold','fc_gray']
            },
            {
                text: cp
            }
            ]
        }
        ]

        ]
    },
    layout: {
        hLineWidth: function(i, node) { return .5; },
        vLineWidth: function(i, node) { return .5; },
        hLineColor: function(i, node) { return '#444'; },
        vLineColor: function(i, node) { return '#444'; },

        paddingLeft: function(i, node) { return 20; },
        paddingRight: function(i, node) { return 20; },
        paddingTop: function(i, node) {return (i === node.table.body.length - 1) ? null : 8;}
    }
}
}


// documentDefinition function
function documentDefinition(dataUrl) {

    // Fonts
    pdfMake.fonts = {
        AvenirNextCondensed: {
            normal: 'AvenirNextCondensed-Regular.ttf',
            italics: 'AvenirNextCondensed-Italic.ttf',
            medium: 'AvenirNextCondensed-Medium.ttf',
            mediumitalics: 'AvenirNextCondensed-MediumItalic.ttf',
            bold: 'AvenirNextCondensed-Bold.ttf',
            bolditalics: 'AvenirNextCondensed-BoldItalic.ttf'
        }
    }


    //document definition
    var dd = {

        // PDF PAGE SETUP
        defaultStyle: {
            font: 'AvenirNextCondensed'
        },
        pageSize: 'letter',
        pageOrientation: 'portrait',
        pageMargins : [20, 72],


        //HEADER
        header: function(currentPage) {
            if (currentPage == 1) {
                return headerInfoFull;
            }
            else {
                return headerInfoBlank;
            }
        },

        footer: function(currentPage, pageCount) {
            var pagec = currentPage.toString() + ' of ' + pageCount;
            return footerInfo(pagec);
        },

        
        // CONTENT
        content:[
            {
                style:['gap_small_top'],
                columns: [
                {
                    // Left side Details 
                    width:'40%',
                    stack:[
                    {
                        text:[
                        {
                            text:'SPEED 17 ALT 7 (MISSOURI) JERSEY'+'\n',
                            style: ['fc_red','fs_italic','fs_bold']
                        },
                        {
                            text:'P-M-FBGJ-SP17-10-F09-17',
                            style: ['fsz_small','fs_bold']
                        }
                        ]
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
                            text: '  |  '
                        },
                        {
                            text:'PDF URL',
                            link: link,
                            style: ['fc_blue','fs_underline','fsz_small']
                        },
                        {
                            text: '  |  '
                        },
                        {
                            text:'CUT URL',
                            link: link,
                            style: ['fc_blue','fs_underline','fsz_small']
                        },
                        {
                            text: '  |  '
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
                            style: ['fc_red','fs_bold','fsz_small']
                        }
                        ],
                        style:['gap_large_top']
                    },
                    {

                        style:['gap_small_top'],
                        text:[
                        {
                            text: 'GOLD (G)'+'\n',
                            style: ['fs_bold','fsz_small']
                        },
                        {
                            text: 'FRONT BODY'+', ',
                            style: ['fsz_small']
                        },
                        {
                            text: 'BACK BODY'+', ',
                            style: ['fsz_small']
                        },
                        {
                            text: 'BODY YOKE'+', ',
                            style: ['fsz_small']
                        },
                        {
                            text: 'COWL'+', ',
                            style: ['fsz_small']
                        },
                        {
                            text: 'MIDDLE PANEL'+', ',
                            style: ['fsz_small']
                        },
                        {
                            text: 'BOTTOM PANEL'+', ',
                            style: ['fsz_small']
                        },
                        {
                            text: 'UNDERARM PANEL'+', ',
                            style: ['fsz_small']
                        },
                        {
                            text: 'SLEEVE INSERT'+', ',
                            style: ['fsz_small']
                        }
                        ]
                    },
                    {

                        style:['gap_small_top'],
                        text:[
                        {
                            text: 'CHARCOAL GRAY (CG)'+'\n',
                            style: ['fs_bold','fsz_small']
                        },
                        {
                            text: 'SLEEVE ARM TRIM',
                            style: ['fsz_small']
                        }
                        ]
                    },
                    {

                        style:['gap_small_top'],
                        text:[
                        {
                            text: 'INFUSED (B,CG)'+'\n',
                            style: ['fs_bold','fsz_small']
                        },
                        {
                            text: 'SLEEVE',
                            style: ['fsz_small']
                        }
                        ]
                    },
                    {

                        style:['gap_small_top'],
                        stack:[
                        {
                            text: 'BLACK (B)'+'\n',
                            style: ['fs_bold','fsz_small']
                        },
                        {
                            image: 'brandlogo',
                            width: 30,
                            margin: [0,5,0,0]
                        }
                        ]
                    },



                
                    {
                        style:['gap_medium_top'],
                        text:[
                        {
                            text:'APPLICATION DETAILS',
                            style: ['fc_red','fs_bold','fsz_small']
                        }
                        ],
                    },




                    {
                        style:['gap_small_top'],
                        stack: [
                        {
                            text:[
                            {
                                text: '#1 TEAM NAME: ',
                                style: ['fsz_small']
                            },
                            {
                                text: '2"',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: 'B',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: 'SPARTANS',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: '"TIGERS"',
                                style: ['fsz_small','fs_bold']
                            }
                            ]
                        },
                        {
                            text:[
                            {
                                text: '#5 BACK #: ',
                                style: ['fsz_small']
                            },
                            {
                                text: '12"',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: 'INFUSED (B,CG)',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: 'SPARTAN',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            }
                            ]
                        },
                        {
                            text:[
                            {
                                text: '#6 PLAYER NAME: ',
                                style: ['fsz_small']
                            },
                            {
                                text: '2"',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: 'B',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: 'SPARTANS',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: '(PLAYER NAME)',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: '(NAMEPLATE)',
                                style: ['fsz_small','fs_bold']
                            }
                            ]
                        },
                        {
                            text:[
                            {
                                text: '#7 MASCOT: ',
                                style: ['fsz_small']
                            },
                            {
                                text: '3"',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: 'B',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: 'PAW_20',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: 'URL',
                                style: ['fsz_small','fs_bold','fc_blue','fs_underline'],
                                link: link
                            }
                            ]
                        },
                        {
                            text:[
                            {
                                text: '#33 , #34 SHOULDER: ',
                                style: ['fsz_small']
                            },
                            {
                                text: '3"',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: 'INFUSED (B,CG)',
                                style: ['fsz_small','fs_bold']
                            },
                            {
                                text: ' | '
                            },
                            {
                                text: 'SPARTANS',
                                style: ['fsz_small','fs_bold']
                            }
                            ]
                        },
                        ]
                    }
                    ]
                },

                {
                    // Image Thumbnail
                    columns: [
                    {
                        stack:[
                        {
                            stack:[
                            {
                                image: dataUrls.front_thumbnail,
                                width: 170,
                                    style: ['text_align_center']
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
                                width: 170,
                                style: ['text_align_center']
                            },
                            {
                                text:'LEFT',
                                link: link,
                                style: ['fc_blue','fs_underline','fsz_small','text_align_center']
                            }
                            ],
                            style:['gap_small_top']
                            }
                            ]
                        },
                        {
                        stack:[
                        {
                            stack:[
                            {
                                image: dataUrls.back_thumbnail,
                                width: 170,
                                style: ['text_align_center']
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
                                width: 170,
                                style: ['text_align_center']
                            },
                            {
                                text:'RIGHT',
                                link: link,
                                style: ['fc_blue','fs_underline','fsz_small','text_align_center']
                            }
                            ],
                            style:['gap_small_top']
                        }
                        ]
                    }
                    ]
                }                        
                ]
            },



            // MASCOT DETAILS
            {
                // style:['gap_small_top'],
                text:[
                {
                    text:'MASCOT DETAILS',
                    style: ['fc_red','fs_bold','fsz_small']
                }
                ]
            },
            {
                style: ['gap_small_top'],
                table: {
                    widths: ['*'],
                    body: [
                    [
                    {
                        columns: [
                        {
                            width: 'auto',
                            margin:[10, 10, 10, 0],
                            style: ['fsz_small','text_align_center'],


                            table: {
                                widths: ['auto'],
                                body: [

                                [
                                {image:'mascot', width: 42,}
                                ],

                                [
                                {text:'PAW_20', link: link, style: ['fc_blue','fs_underline','fsz_small','text_align_center']}
                                ]

                                ]
                            },

                            layout: {
                                defaultBorder: false,
                                fillColor: function (i, node) {
                                    return (i === node.table.body.length - 1) ? null : '#ffba00';
                                },
                                paddingLeft: function(i, node) { return 6; },
                                paddingRight: function(i, node) { return 6; },
                                paddingTop: function(i, node) { return 5; },
                                paddingBottom: function(i, node) { return 5; },
                            }
                        },
                        {
                            width: 'auto',
                            margin:[10, 10, 10, 0],
                            style: ['fsz_small','text_align_center'],


                            table: {
                                widths: ['auto'],
                                body: [

                                [
                                {image:'mascot', width: 42,}
                                ],

                                [
                                {text:'PAW_20', link: link, style: ['fc_blue','fs_underline','fsz_small','text_align_center']}
                                ]

                                ]
                            },

                            layout: {
                                defaultBorder: false,
                                fillColor: function (i, node) {
                                    return (i === node.table.body.length - 1) ? null : '#ffba00';
                                },
                                paddingLeft: function(i, node) { return 6; },
                                paddingRight: function(i, node) { return 6; },
                                paddingTop: function(i, node) { return 5; },
                                paddingBottom: function(i, node) { return 5; },
                            }
                        }

                        ]
                    }
                    ]

                    ]
                },
                layout: {
                    
                    hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ?.5 : .5;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? .5 : .5;
                    },
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? '#444' : '#444';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? '#444' : '#444';
                    },
                }
            },



            // LINE UP TOTAL
            {
                style:['gap_medium_top'],
                text:[
                {
                    text:'LINE UP TOTAL',
                    style: ['fc_red','fs_bold','fsz_small']
                }
                ]
            },
            {
                alignment: 'center',
                style: ['fsz_small','gap_small_top'],
                table: {
                    widths: ['*','*','85%'],
                    body: [
                        [
                            {text: 'SIZE', style:'fs_bold'}, 
                            {text: 'COUNT', style:'fs_bold'}, 
                            {text: 'NUMBER/S', style:'fs_bold'}
                        ],
                        ['S', '4', {text: '11,14,27,30', alignment: 'left'}],
                        ['M', '4', {text: '16,22,33,35', alignment: 'left'}],
                        ['L', '4', {text: '9,12,23,28', alignment: 'left'}],
                        [
                            {text: 'TOTAL', style:'fs_bold'}, 
                            {text: '12', style:'fs_bold'}, 
                            {text: ''}
                        ]
                    ]
                },
                layout: {
                    fillColor: function (i, node) {
                        return (i % 2 === 1) ? '#e1e1e1' : null;
                    },
                    hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ?.5 : .5;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? .5 : .5;
                    },
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? '#444' : '#444';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? '#444' : 'black';
                    },
                    paddingTop: function(i, node) { return 2; },
                    paddingBottom: function(i, node) { return 2; }
                }
            },



            // NOTES
            {
                style: ['fsz_small','gap_large_top'],
                table: {
                    widths: ['*'],
                    body: [
                    [
                    {
                        margin: [0, 0, 0, 5],
                        stack: [
                        {
                            text: 'NOTES',
                            style:['fs_bold','fsz_medium','fc_red'],
                        },
                        {
                            text: 'No notes...',
                        }
                        ]
                    }
                    ]

                    ]
                },
                layout: {
                    hLineWidth: function(i, node) { return .5; },
                    vLineWidth: function(i, node) { return .5; },
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? '#444' : '#444';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? '#444' : '#444';
                    },
                }
            },



            // LINE UP
            {
                style:['gap_large_top'],
                text:[
                {
                    text:'LINE UP',
                    style: ['fc_red','fs_bold','fsz_small']
                }
                ]
            },
            {
                alignment: 'center',
                style: ['fsz_small','gap_small_top'],
                table: {
                    widths: ['*','*','*','23%','23%','23%'],
                    body: [
                        [
                            {text: 'SIZE', style:'fs_bold'}, 
                            {text: 'QUANTITY', style:'fs_bold'}, 
                            {text: 'NUMBER', style:'fs_bold'},
                            {text: 'SLEEVE TYPE', style:'fs_bold'},   
                            {text: 'LASTNAME', style:'fs_bold'},   
                            {text: 'LASTNAME APPLICATION', style:'fs_bold'},
                        ],
                        ['S', '1', '11', 'MOTION CUT', 'SMITH', 'DIRECTLY ON JERSY'],
                        ['S', '1', '27', 'MOTION CUT', 'JACKSON', 'DIRECTLY ON JERSY'],
                        ['S', '1', '30', 'MOTION CUT', 'DAVID', 'DIRECTLY ON JERSY'],
                        ['S', '1', '34', 'MOTION CUT', 'WILIAMS', 'DIRECTLY ON JERSY'],
                        
                        ['M', '1', '20', 'QUARTERBACK CUT', 'CLARKE', 'DIRECTLY ON JERSY'],
                        ['M', '1', '22', 'QUARTERBACK CUT', 'FERN', 'DIRECTLY ON JERSY'],
                        ['M', '1', '31', 'QUARTERBACK CUT', 'ROCKWELL', 'DIRECTLY ON JERSY'],
                        ['M', '1', '40', 'LINEMAN CUT', 'RIVERS', 'NAMEPLATE'],

                        ['L', '1', '9', 'LINEMAN CUT', 'JOHNSON', 'NAMEPLATE'],
                        ['L', '1', '23', 'SPECIALIST CUT', 'JORDAN', 'NAMEPLATE'],
                        ['L', '1', '28', 'SPECIALIST CUT', 'JAMES', 'NAMEPLATE'],
                        ['L', '1', '50', 'SPECIALIST CUT', 'ROBINSON', 'NAMEPLATE'],
                    ]
                },
                layout: {
                    fillColor: function (i, node) {
                        return (i % 2 === 1) ? '#e1e1e1' : null;
                    },
                    hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ?.5 : .5;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? .5 : .5;
                    },
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? '#444' : '#444';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? '#444' : 'black';
                    },
                    paddingTop: function(i, node) { return 4; },
                    paddingBottom: function(i, node) { return 4; }
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
            fs_bolditalic: {
                bolditalics: true
            },
            fs_underline: {
                decoration: 'underline'
            },
            
                  
            bc_mascot: {
                background:'#ffba00'
            },

            gap_small_top: {
                margin: [0, 10, 0, 0]
            },
            gap_medium_top: {
                margin: [0, 15, 0, 0]
            },
            gap_large_top: {
                margin: [0, 30, 0, 0]
            }
                
        },
        images: {
            logo: 'data:image/png;base64,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',
            qrcode: 'data:image/jpeg;base64,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b25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQABAEgAAAABAAE4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAB44QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAE4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAA4QklNBAIAAAAAAAIAADhCSU0EMAAAAAAAAQEAOEJJTQQtAAAAAAAGAAEAAAACOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA08AAAAGAAAAAAAAAAAAAAGlAAABpQAAAA0AcQByAF8AYwBvAGQAZQBfAGEAcgB0ADIANwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAABpQAAAaUAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAaUAAAAAUmdodGxvbmcAAAGlAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpj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bnN0YW5jZUlEPSJ4bXAuaWlkOjQwMWE5YWViLTNlZGMtNjY0MC1iMDJmLWZmZjkxM2E1ZjY4MSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSIxOTA2RUFCMkRDRjlDRjlBREQxQTBBMzI0QTgyRDNENSIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNS0xMFQwODo1OTowMyswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDUtMTBUMDk6MTk6MDQrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDUtMTBUMDk6MTk6MDQrMDg6MDAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MDFhOWFlYi0zZWRjLTY2NDAtYjAyZi1mZmY5MTNhNWY2ODEiIHN0RXZ0OndoZW49IjIwMTgtMDUtMTBUMDk6MTk6MDQrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/uACFBZG9i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',
            brandlogo: 'data:image/png;base64,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',
            mascot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAABcSAAAXEgFnn9JSAAA58GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwNjcgNzkuMTU3NzQ3LCAyMDE1LzAzLzMwLTIzOjQwOjQyICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTYtMDQtMTlUMDg6MTA6NTkrMDg6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNi0wNi0yN1QxNDoxMjo1NyswODowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDYtMjdUMTQ6MTI6NTcrMDg6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ZjA0YTQ3MWUtMWJlNy05ZjRjLTg5N2QtMmM1ZGQyYjQ0ODFhPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6MjgyMTQwMzItM2MyZS0xMWU2LTgxNDUtOWYxNTcyNDFjNjY0PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6MzUzOTZjOTUtZjQzYS0zYTQ5LThlYTgtMmYxNDgzMGM2ODY5PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjM1Mzk2Yzk1LWY0M2EtM2E0OS04ZWE4LTJmMTQ4MzBjNjg2OTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0wNC0xOVQwODoxMDo1OSswODowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMjIgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpmMDRhNDcxZS0xYmU3LTlmNGMtODk3ZC0yYzVkZDJiNDQ4MWE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTYtMDYtMjdUMTQ6MTI6NTcrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDIyIChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj4xNTAwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj4xNTAwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yNTY8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjU2PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz5cERMvAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAABsVSURBVHja7J15vFVV2ce/F5lBBBRBEAUFBERKxAmUSkzKKYcMeNNExFIzTS0zJyytnNMstddSX6dUlBJziNQoY1IRFBHFESdwYJJZr9z3j7WunHPuOffufc7eZ++91u/7+awPnHPP2Wev5zzrd9b4PDV1dXUIIfykmUwghARACCEBEEJIAIQQEgAhhARACCEBEEI4h/YBpIaewBlAV5lCSAD841mgDlgJDJE5QtEPGAo0lykkAFnkEtv4c8u3ZJZAjM6x2TvAFcBxQHeZRgKQBY4u0vjrgCVAy4LXtgJaN3G99vgxt9MduK6E7erLnUBHuZgEIGla2FLIHk048MkFrz/ZPn8dsG2R6zUDFgETHLLd2cBMYCHwCvACsLgJu+WWWuAIuaAEIEm2K9IovwysDeDAx9vXd7Fd3Ny//aLgmhfa5zcBfR2w26QQDb2pcoXcUAKQFJ2B9cD/An2AC4DPAzru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'
        }
    }
    pdfMake.createPdf(dd).open();
}