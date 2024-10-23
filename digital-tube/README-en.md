# Digital Tube

## Class: DigitalTube

| No. | Parameter Name | Type | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:----:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | element       | `null` `undefined` `object SVGSVGElement` `object HTMLSVGElement` | SVG element used for seven-segment display | No | `undefined` / `null` |
| 2   | data          | `number` | [Display data](#introduction-to-display-data), an integer from 0 to 255, actually an 8-bit binary value that can initialize the display content | No | 0 |

### Method List

| No. | Method Name | Parameters | Description |
|:---:|:-----------|:----------|:-----------|
| 1   | setData    | data      | (Re)set display data. |
| 2   | setNum     | num, point| An additional encapsulation method for `setData`. If you only need to display numbers (not custom content), this method can be used for convenience. |
| 3   | setHeight  | height    | Set the SVG display height. |
| 4   | setColor   | color, elementNumber | Set the color of the digital tube, can choose to set the background, displayed or not displayed colors. |
| 5   | getElement  | None      | Get a reference to the digital tube element. |

### Detailed Method Descriptions

1. Method: setData

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | data          | `number` | Display data, an integer from 0 to 255, actually an 8-bit binary value | Yes | **If not filled, a `TypeError` will be thrown<br />If out of range, a `RangeError` will be thrown** |

2. Method: setNum

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | num           | `number` | The number to be displayed, an integer from 0 to 9 | Yes | **If not filled, a `TypeError` will be thrown<br />If out of range, a `RangeError` will be thrown** |
| 2   | point         | `boolean` | Whether to display the decimal point | No | `false` |

3. Method: setHeight

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | height        | `string` `number` | The target height to change, if it is a number, it is considered as height in `px`; otherwise, it needs to include a unit equivalent to CSS length units, so it should be a string | Yes | **If not filled, a `TypeError` will be thrown** |

4. Method: setColor

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | color         | `string` | The color to be set, using CSS supported color formats | Yes | **If not filled, a `TypeError` will be thrown** |
| 2   | elementNumber | `number` | The element number to change the color: 0 (foreground), 1 (background), 2 (rectangle background) | No | 0 |

5. Method: getElement

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
|     | None          |        | Get a reference to the SVG element of the digital tube |        |                                                         |

### Introduction: Display Data

![Introduction Image](https://cdn.jsdelivr.net/gh/cnbilinyj/picx-images-hosting@master/gist/855b978596641deaf61c27d714151465/0000.png)

As shown in the image, the upper lights are coded as 0, followed in clockwise order by 1, 2, 3, 4, 5; then the middle light is coded as 6; and finally, the decimal point is coded as 7.

According to the **binary order from right (0) to left (7)**, and following the rule that 0 represents off and 1 represents on, the display data can be written.

For example, to display 1, you need to light up lights 1 and 2. The binary display data should be `0b00000110`, which can be expressed in hexadecimal as `0x06`; to display 2, use `0b01011011`, which can be expressed as `0x5b`. To display the decimal point simultaneously, simply change the last binary value (the rightmost one) to 1, or directly increase the basic display data value by 128.

--

## Class: DigitalTubes

| No. | Parameter Name | Type | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:----:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | element       | `undefined` `string` `object HTMLDivElement` | DIV element containing multiple digital tubes | No | `undefined` |
| 2   | datas         | `array` `number` | Array of digital tube objects, or a non-negative integer defining the number of digital tubes | No | 0 |

### Method List

| No. | Method Name | Parameters | Description |
|:---:|:-----------|:----------|:-----------|
| 1   | addTube    | tubeClass | Add a digital tube. |
| 2   | removeTube | index      | Remove the specified indexed digital tube. |
| 3   | setDatas   | datas      | Set the display data for all digital tubes. |
| 4   | setData    | index, data| Set the display data for the specified digital tube. |
| 5   | setNums    | nums       | Set the display numbers for all digital tubes. |
| 6   | setNum     | index, num | Set the display number for the specified digital tube. |
| 7   | setHeights  | heights    | Set the heights for all digital tubes. |
| 8   | setHeight  | index, height | Set the height for the specified digital tube. |
| 9   | setColors  | colors     | Set the colors for all digital tubes. |
| 10  | setColor   | index, color | Set the color for the specified digital tube. |
| 11  | getDatas   | None       | Get the display data for all digital tubes. |
| 12  | getData    | index      | Get the display data for the specified digital tube. |
| 13  | getTubes   | None       | Get all digital tube objects. |
| 14  | getElement  | None       | Get a reference to the DIV container element of the digital tube group. |

### Detailed Method Descriptions

1. Method: addTube

**_Parameters:_**

| No. | Parameter Name | Type         | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------------|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | tubeClass     | `DigitalTube` | The digital tube object to be added | Yes | **If not filled, a `TypeError` will be thrown** |

**_Return Value:_**

Type: `DigitalTubes`

The class itself

2. Method: removeTube

**_Parameters:_**

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | index         | `number` | The index of the digital tube to be removed | Yes | **If not filled or out of range, a `RangeError` will be thrown** |

**_Return Value:_**

Type: `array`

| Index | Type           | Description |
|:-----:|:--------------|:-----------|
| 0     | `DigitalTubes` | The class itself |
| 1     | `DigitalTube`  | The removed digital tube class (`DigitalTube` class) |

3. Method: setDatas

**_Parameters:_**

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | datas         | `array` | An array containing the display data for each digital tube | Yes | **If not filled, a `TypeError` will be thrown<br />If length does not match, a `RangeError` will be thrown** |

**_Return Value:_**

Type: `DigitalTubes`

The class itself

4. Method: setData

**_Parameters:_**

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | index         | `number` | The index of the digital tube | Yes | |
| 2   | data          | `number` | Display data, an integer from 0 to 255 | Yes | **If not filled, a `TypeError` will be thrown<br />If out of range, a `RangeError` will be thrown** |

**_Return Value:_**

Type: `DigitalTubes`

The class itself

5. Method: setNums

**_Parameters:_**

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | nums          | `array` | An array containing the display numbers for each digital tube, array elements are integers from 0 to 9 | Yes | **If not filled, a `TypeError` will be thrown<br />If length does not match, a `RangeError` will be thrown** |

**_Return Value:_**

Type: `DigitalTubes`

The class itself

6. Method: setNum

**_Parameters:_**

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | index         | `number` | The index of the digital tube | Yes | **If not filled or out of range, a `RangeError` will be thrown** |
| 2   | num           | `number` | The number to be displayed, an integer from 0 to 9 | Yes | **If not filled, a `TypeError` will be thrown<br />If out of range, a `RangeError` will be thrown** |

**_Return Value:_**

Type: `DigitalTubes`

The class itself

7. Method: setHeights

**_Parameters:_**

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | heights       | `array` | An array containing the heights for each digital tube, array elements are of type `string` or `number` | Yes | **If not filled, a `TypeError` will be thrown<br />If length does not match, a `RangeError` will be thrown** |

**_Return Value:_**

Type: `DigitalTubes`

The class itself

8. Method: setHeight

**_Parameters:_**

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | index         | `number` | The index of the digital tube | Yes | **If not filled or out of range, a `RangeError` will be thrown** |
| 2   | height        | `string` `number` | The target height to change | Yes | **If not filled, a `TypeError` will be thrown** |

**_Return Value:_**

Type: `DigitalTubes`

The class itself

9. Method: setColors

**_Parameters:_**

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | colors        | `array` | An array containing the colors for each digital tube, array elements are of type `string` | Yes | **If not filled, a `TypeError` will be thrown<br />If length does not match, a `RangeError` will be thrown** |

**_Return Value:_**

Type: `DigitalTubes`

The class itself

10. Method: setColor

**_Parameters:_**

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | index         | `number` | The index of the digital tube | Yes | **If not filled or out of range, a `RangeError` will be thrown** |
| 2   | color         | `string` | The color to be set | Yes | **If not filled, a `TypeError` will be thrown** |

**_Return Value:_**

Type: `DigitalTubes`

The class itself

11. Method: getDatas

**_Parameters:_**

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|

**_Return Value:_**

Type: `DigitalTubes`

The class itself

12. Method: getData

**_Parameters:_**

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|
| 1   | index         | `number` | The index of the digital tube | Yes | **If not filled or out of range, a `RangeError` will be thrown** |

**_Return Value:_**

Type: `DigitalTubes`

The class itself

13. Method: getTubes

**_Parameters:_**

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|

**_Return Value:_**

Type: `array`

All `DigitalTube` classes that make up the `DigitalTubes` class

| Index | Type           | Description |
|:-----:|:--------------|:-----------|
| 0..   | `DigitalTube`  | All `DigitalTube` classes that make up the `DigitalTubes` class |

14. Method: getElement

**_Parameters:_**

| No. | Parameter Name | Type   | Description | Required | Default/Equivalent Value/Required to Leave Blank for Error |
|:---:|:--------------|:------:|:-----------|:--------:|:---------------------------------------------------------:|

**_Return Value:_**

Type: `HTMLDivElement`

Description: Reference to the DIV container element of the digital tube group

# Developer Information

Author: 农药君 Nong Yao Jun cnbilinyj bilinyj

CSDN: 农药君: [https://blog.csdn.net/qq_69128903](https://blog.csdn.net/qq_69128903)

WebCat: bilinyj(14739): [http://space.webcat.top/page/my_source.html?uid=14739](http://space.webcat.top/page/my_source.html?uid=14739)

GitHub: cnbilinyj: [https://www.github.com/cnbilinyj](https://www.github.com/cnbilinyj)

Code Link: [https://github.com/cnbilinyj/UI-js/blob/main/digital-tube/digital-tube.js](https://gist.github.com/cnbilinyj/855b978596641deaf61c27d714151465)
