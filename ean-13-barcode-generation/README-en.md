# EAN-13 Barcode Generation

[View demo page](demo0.html)

## Method: calculate_barcode_parity_bit

Calculate the check digit

**Parameters**:

	| No. | Parameter Name | Type | Description | Required | Default/Equivalent/Mandatory Error |
	|:----:|:--------------:|:----:|:-----------:|:--------:|:---------------------------:|
	| 1 | code | `number` `string`(length = 12) | The data to calculate the check digit, 12 digits long | Yes | `RangeError` |

**Return Value**:

	Type: `number`(0 to 9)

	Description: The result of the check digit calculation, ranging from 0 to 9

## Method: generate_ean13_barcode_12

Generate EAN-13 barcode (input 12-digit data, automatically calculate check digit)

**Parameters**:

	| No. | Parameter Name | Type | Description | Required | Default/Equivalent/Mandatory Error |
	|:----:|:--------------:|:----:|:-----------:|:--------:|:---------------------------:|
	| 1 | code | `number` `string`(length = 12) | The data to generate the barcode, 12 digits long | Yes | `RangeError` |
	| 2 | canvasElement | `object HTMLCANVASElement` `undefined` `null` | The target canvas element for generating the barcode | No | `undefined` |

**Return Value**:

	Type: `object HTMLCANVASElement`

	Description: The canvas element with the EAN-13 barcode drawn, which is the input `canvasElement` parameter. If this parameter is not provided, a new canvas element is generated and drawn on.

## Method: generate_ean13_barcode_13

Generate EAN-13 barcode (input 13-digit data including check digit)

**Parameters**:

	| No. | Parameter Name | Type | Description | Required | Default/Equivalent/Mandatory Error |
	|:----:|:--------------:|:----:|:-----------:|:--------:|:---------------------------:|
	| 1 | code | `number` `string`(length = 13) | The data to generate the barcode, 13 digits long | Yes | `RangeError` |
	| 2 | canvasElement | `object HTMLCANVASElement` `undefined` `null` | The target canvas element for generating the barcode | No | `undefined` |

**Return Value**:

	Type: `object HTMLCANVASElement`

	Description: The canvas element with the EAN-13 barcode drawn, which is the input `canvasElement` parameter. If this parameter is not provided, a new canvas element is generated and drawn on.

# Developer Information

Author: Nongyaojun

CSDN: 农药君: [https://blog.csdn.net/qq_69128903](https://blog.csdn.net/qq_69128903)

WebCat: bilinyj(14739): [http://space.webcat.top/page/my_source.html?uid=14739](http://space.webcat.top/page/my_source.html?uid=14739)

GitHub: cnbilinyj: [https://www.github.com/cnbilinyj](https://www.github.com/cnbilinyj)

Code Link: [https://github.com/cnbilinyj/UI-js/blob/main/ean-13-barcode-generation/ean-13-barcode-generation.js](https://github.com/cnbilinyj/UI-js/blob/main/ean-13-barcode-generation/ean-13-barcode-generation.js)
