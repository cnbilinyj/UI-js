# EAN-13条码生成

[查看demo页面](demo-01.html)

## 方法：calculate_barcode_parity_bit

计算校验位

**_参数_**：

	| 序号 | 参数名 | 类型 | 描述 | 是否必须 | 默认/等效值/必填留空报错 |
	|:-----:|:-----:|:-----|:-----|:-----:|:-----:|
	| 1 | code | `number` `string`(length = 12) | 需要计算校验位的数据，长度为12位 | 是 | `RangeError` |

**_返回值_**：

	类型：`number`(0 \~ 9)

	描述：从0到9的校验位计算结果

## 方法：generate_ean13_barcode_12

生成EAN-13条码（输入12位数据，自动计算校验位）

**_参数_**：

	| 序号 | 参数名 | 类型 | 描述 | 是否必须 | 默认/等效值/必填留空报错 |
	|:-----:|:-----:|:-----|:-----|:-----:|:-----:|
	| 1 | code | `number` `string`(length = 12) | 需要生成条形码的数据，长度为12位 | 是 | `RangeError` |
	| 2 | canvasElement | `object HTMLCANVASElement` `undefind` `null` | 生成条形码的目标canvas元素 | 否 | `undefind` |

**_返回值_**：

	类型：`object HTMLCANVASElement`

	描述：绘制了EAN-13条码的，输入的`canvasElement`参数的canvas元素，如果没有该参数，则生成一个新的canvas元素并进行绘制

## 方法：generate_ean13_barcode_12

生成EAN-13条码（输入包含校验位的13位数据）

**_参数_**：

	| 序号 | 参数名 | 类型 | 描述 | 是否必须 | 默认/等效值/必填留空报错 |
	|:-----:|:-----:|:-----|:-----|:-----:|:-----:|
	| 1 | code | `number` `string`(length = 13) | 需要生成条形码的数据，长度为13位 | 是 | `RangeError` |
	| 2 | canvasElement | `object HTMLCANVASElement` `undefind` `null` | 生成条形码的目标canvas元素 | 否 | `undefind` |

**_返回值_**：

	类型：`object HTMLCANVASElement`

	描述：绘制了EAN-13条码的，输入的`canvasElement`参数的canvas元素，如果没有该参数，则生成一个新的canvas元素并进行绘制

# 开发者信息

作者：农药君

CSDN：农药君：[https://blog.csdn.net/qq_69128903](https://blog.csdn.net/qq_69128903)

WebCat：bilinyj(14739)：[http://space.webcat.top/page/my_source.html?uid=14739](http://space.webcat.top/page/my_source.html?uid=14739)

GitHub：cnbilinyj：[https://www.github.com/cnbilinyj](https://www.github.com/cnbilinyj)

代码链接：[https://github.com/cnbilinyj/UI-js/blob/main/ean-13-barcode-generation/ean-13-barcode-generation.js](https://github.com/cnbilinyj/UI-js/blob/main/ean-13-barcode-generation/ean-13-barcode-generation.js)
