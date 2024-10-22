# Digital Display Tube

## Class: DigitalTube

| No. | Parameter Name | Type | Description | Required | Default/Equivalent/Required to avoid error |
|:---:|:---------------|:-----|:------------|:--------:|:------------------------------------------:|
| 1 | element | `null`, `undefined`, `SVGSVGElement object`, `HTMLSVGElement object` | SVG element used for the seven-segment display | No | `undefined` / `null` |
| 2 | data | `number` | [Display Data](#display-data-description), an integer from 0-255 (essentially an 8-bit binary number), used to initialize display content | No | 0 |

### Methods

| No. | Method Name | Parameters | Description |
|:---:|:------------|:-----------|:------------|
| 1 | setData | data | (Re)set the display data. |
| 2 | setNum | num, point | Wrapper for `setData`. Convenient for displaying numbers instead of custom content. |
| 3 | setHeight | height | Set the SVG display height. |
| 4 | setColor | color, elementNumber | Set display tube color, with options to set background, display, or non-display colors. |
| 5 | getElement | None | Get the element reference of the display tube. |

### Detailed Method Descriptions

1. Method: setData

| No. | Parameter Name | Type | Description | Required | Default/Equivalent/Required to avoid error |
|:---:|:---------------|:-----|:------------|:--------:|:------------------------------------------:|
| 1 | data | `number` | Display data, an integer from 0-255 (8-bit binary number) | Yes | **Throws `TypeError` if left blank<br />Throws `RangeError` if out of range** |

2. Method: setNum

| No. | Parameter Name | Type | Description | Required | Default/Equivalent/Required to avoid error |
|:---:|:---------------|:-----|:------------|:--------:|:------------------------------------------:|
| 1 | num | `number` | Number to display, an integer between 0-9 | Yes | **Throws `TypeError` if left blank<br />Throws `RangeError` if out of range** |
| 2 | point | `boolean` | Whether to display a decimal point | No | `false` |

3. Method: setHeight

| No. | Parameter Name | Type | Description | Required | Default/Equivalent/Required to avoid error |
|:---:|:---------------|:-----|:------------|:--------:|:------------------------------------------:|
| 1 | height | `string`, `number` | Target height; if a number, it's treated as `px`; otherwise, use CSS-compatible length units as a string | Yes | **Throws `TypeError` if left blank** |

4. Method: setColor

| No. | Parameter Name | Type | Description | Required | Default/Equivalent/Required to avoid error |
|:---:|:---------------|:-----|:------------|:--------:|:------------------------------------------:|
| 1 | color | `string` | Color to set, following CSS color format | Yes | **Throws `TypeError` if left blank** |
| 2 | elementNumber | `number` | Element number for color change: 0 (foreground), 1 (background), 2 (rectangle background) | No | 0 |

5. Method: getElement

| No. | Parameter Name | Type | Description | Required | Default/Equivalent/Required to avoid error |
|:---:|:---------------|:-----|:------------|:--------:|:------------------------------------------:|
| - | None | - | Get the SVG element reference of the display tube | - | - |

### Display Data Description

![Data Representation](https://cdn.jsdelivr.net/gh/cnbilinyj/picx-images-hosting@master/gist/855b978596641deaf61c27d714151465/0000.png)

As shown, the top light is labeled 0, and the others follow in a clockwise direction: 1, 2, 3, 4, 5. The middle light is labeled 6, and the decimal point is labeled 7.

The display data is structured as an 8-bit binary number, where each bit from right to left (0 to 7) controls the corresponding light (0 for off, 1 for on).

For example, to display the number 1, the first and second lights (1 and 2) should be on, yielding the binary representation `0b00000110`, or hexadecimal `0x06`. To display the number 2, use `0b01011011` (hex `0x5b`). To show the decimal point, simply set the last bit (the 1st bit from the right) to 1, or add 128 to the base display data value for the number.

---

## Class: DigitalTubes

| No. | Parameter Name | Type | Description | Required | Default/Equivalent/Required to avoid error |
|:---:|:---------------|:-----|:------------|:--------:|:------------------------------------------:|
| 1 | element | `undefined`, `string`, `HTMLDivElement object` | DIV element containing multiple display tubes | No | `undefined` |
| 2 | datas | `array`, `number` | Array of display tube objects or a non-negative integer defining the number of tubes | No | 0 |

### Methods

| No. | Method Name | Parameters | Description |
|:---:|:------------|:-----------|:------------|
| 1 | addTube | tubeClass | Add a display tube. |
| 2 | removeTube | index | Remove a display tube by index. |
| 3 | setDatas | datas | Set display data for all tubes. |
| 4 | setData | index, data | Set display data for a specific tube. |
| 5 | setNums | nums | Set display numbers for all tubes. |
| 6 | setNum | index, num | Set display number for a specific tube. |
| 7 | setHeights | heights | Set height for all tubes. |
| 8 | setHeight | index, height | Set height for a specific tube. |
| 9 | setColors | colors | Set colors for all tubes. |
| 10 | setColor | index, color | Set color for a specific tube. |
| 11 | getDatas | None | Get display data for all tubes. |
| 12 | getData | index | Get display data for a specific tube. |
| 13 | getTubes | None | Get all tube objects. |
| 14 | getElement | None | Get the DIV container element of the tube group. |

### Detailed Method Descriptions

1. Method: addTube

**_Parameters_**:

| No. | Parameter Name | Type | Description | Required | Default/Equivalent/Required to avoid error |
|:---:|:---------------|:-----|:------------|:--------:|:------------------------------------------:|
| 1 | tubeClass | `DigitalTube` | The display tube object to add | Yes | **Throws `TypeError` if left blank** |

**_Return Value_**:

Type: `DigitalTubes`

Returns the current object.

... [Additional methods follow similar structure as above]

---

# Developer Information

Author: Nong Yao Jun

CSDN: Nong Yao Jun: [https://blog.csdn.net/qq_69128903](https://blog.csdn.net/qq_69128903)

WebCat: bilinyj(14739): [http://space.webcat.top/page/my_source.html?uid=14739](http://space.webcat.top/page/my_source.html?uid=14739)

GitHub: cnbilinyj: [https://www.github.com/cnbilinyj](https://www.github.com/cnbilinyj)

Code Link: [https://gist.github.com/cnbilinyj/855b978596641deaf61c27d714151465](https://gist.github.com/cnbilinyj/855b978596641deaf61c27d714151465)