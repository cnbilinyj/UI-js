/* 
作者：农药君
CSDN：农药君：[https://blog.csdn.net/qq_69128903](https://blog.csdn.net/qq_69128903)
WebCat：bilinyj(14739)：[http://space.webcat.top/page/my_source.html?uid=14739](http://space.webcat.top/page/my_source.html?uid=14739)
GitHub：cnbilinyj：[https://www.github.com/cnbilinyj](https://www.github.com/cnbilinyj)
代码链接：[https://gist.github.com/cnbilinyj/855b978596641deaf61c27d714151465](https://gist.github.com/cnbilinyj/855b978596641deaf61c27d714151465)
*/

class DigitalTube {
	#path_datas
	#fg_path
	#bg_path
	#rect
	#element

	constructor(element, data){
		switch(typeof element){
			case 'undefined':
				// 没有参数1则创建一个新的SVG元素
				this.#element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				this.#element.setAttribute("height", "300px");
				this.#element.setAttribute("viewBox", "0 0 84 128");
				break;
			case 'string':
				// 如果参数1是字符串，则认为这是字符串格式的元素选择器
				if(document.querySelectorAll(element).length === 1){
					let _element = document.querySelector(element);
					if(this.#isElement(_element)){
						if(_element.tagName === "SVG"){
							this.#element = _element;
						} else {
							throw new TypeError('Parameter 1 should be an HTML/XML DOM element (SVG).')
						}
					}else{
						throw new TypeError('Parameter 1 should be an element selector String of type String or a DOM element of type Object(Element).');
					}
					this.#element = _element;
				}else{
					throw new TypeError('The passed-in string parameter 1 cannot be selected and only one element is selected.')
				}
				break;
			case 'object':
				// 如果参数1是JavaScript对象，则判断是不是JavaScript DOM元素(SVG)
				if(this.#isElement(element)){
					if(element.tagName === "SVG"){
						this.#element = element;
					} else {
						throw new TypeError('Parameter 1 should be an HTML/XML DOM element (SVG).')
					}
				}else if(element === null){
					this.#element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
					this.#element.setAttribute("height", "300px");
					this.#element.setAttribute("viewBox", "0 0 84 128");
				}else{
					throw new TypeError('Parameter 1 should be an element selector String of type String or a DOM element of type Object(Element).');
				}
				break;
			default:
				throw new TypeError('Parameter 1 should be an element selector String of type String or a DOM element of type Object(Element).');
		}

		// 获取内部引用，方便后续操作
		let $element = this.#element;

		// 清空元素
		$element.innerHTML = "";

		// 创建背景
		this.#rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.#rect.setAttribute("fill", "#161616");
		this.#rect.setAttribute("x", "-1");
		this.#rect.setAttribute("y", "-1");
		this.#rect.setAttribute("width", "86");
		this.#rect.setAttribute("height", "130");
		$element.appendChild(this.#rect);

		// 设置路径数据，用于定义数码管每个段的位置
		this.#path_datas = [
			"M25 10l8 -6h40l4 6l-8 6h-40l-4 -6z",			// 0 (top)
			"M78 11l4 6l-5 40l-8 6l-4 -6l5 -40l8 -6z",		// 1 (right top)
			"M69 65l4 6l-5 40l-8 6l-4 -6l5-40l8 -6z",		// 2 (right bottom)
			"M7 118l8 -6h40l4 6l-8 6h-40l-4 -6z",			// 3 (bottom)
			"M15 65l4 6l-5 40l-8 6l-4 -6l5 -40l8 -6z",		// 4 (left bottom)
			"M24 11l4 6l-5 40l-8 6l-4 -6l5-40l8 -6z",		// 5 (left top)
			"M16 64l8 -6h40l4 6l-8 6h-40l-4 -6z",			// 6 (center)
			"M75 115a5 5 0 0 0 0 10a5 5 0 0 0 0 -10z"		// 7 (point)
		];

		// 创建不显示部分的路径
		this.#bg_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		this.#bg_path.setAttribute("d", this.#path_datas.join(""));
		this.#bg_path.setAttribute("fill", "#313131");
		$element.appendChild(this.#bg_path);

		// 创建显示部分的路径
		this.#fg_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		this.#fg_path.setAttribute("fill", "#cf0000");
		$element.appendChild(this.#fg_path);

		// 如果传入了数据，设置数据
		if(data == 0 || !!data){
			this.setData(data);
		}
	}

	#isElement(element) {
		return element instanceof Element || element instanceof HTMLElement || element instanceof SVGElement;
	}

	// 设置数码管的显示数据（0-255，用其二进制下的每一位分别表示8段的状态）
	setData(data){
		if((typeof data) !== "number" || Math.floor(data) !== data)throw new TypeError('Parameter should be of type Number.');
		if(data > 255 || data < 0)throw new RangeError('Parameter should be a value from 0 (0x00) to 255 (0xff).');

		// 将数据转换为二进制字符串，并根据每一位决定是否显示对应段
		let data_bin = data.toString(2).padStart(8, "0");
		this.#fg_path.removeAttribute("d");
		let path_data = "";
		for(let str_index = 0;str_index < 8;str_index++){
			path_data += (data_bin[str_index] !== "0") ? (this.#path_datas[7 - str_index]) : ("");
		}
		this.#fg_path.setAttribute("d", path_data);
		return this;
	}

	// 设置显示的数字（0-9），可选是否显示小数点
	setNum(num, point){
		if((typeof num) !== "number" || Math.floor(num) !== num)throw new TypeError('Parameter should be of type Number.');
		if(num >= 10 || num < 0)throw new RangeError('Parameter should be a value from 0 to 9.');
		let data = 0;

		// 预定义的数码管显示编码
		data += ([
			0x3f,
			0x06,
			0x5b,
			0x4f,
			0x66,
			0x6d,
			0x7d,
			0x07,
			0x7f,
			0x6f
		])[num];

		// 如果需要显示小数点，添加相应值
		data += (point) ? 128 : 0;
		this.setData(data);
		return this;
	}

	// 设置数码管颜色，可以选择设置背景/显示或不显示的颜色
	setColor(color, elementNumber = 0){
		if (typeof color !== "string")throw new TypeError('Parameter No.1 should be of type String.');
		if (typeof elementNumber !== "number")throw new TypeError('Parameter No.2 should be of type Number.');
		if (elementNumber < 0 || elementNumber > 2 || Math.floor(elementNumber) != elementNumber)throw new RangeError('Parameter No.2 should be a value from 0 to 2.');
		console.log(([
			"#fg_path",
			"#bg_path",
			"#rect"
		])[elementNumber])
		eval(`this.${([
			"#fg_path",
			"#bg_path",
			"#rect"
		])[elementNumber]}`).setAttribute("fill", color);
		return this;
	}

	setHeight(height){
		switch(typeof height){
			case "number":
				this.#element.style.height = `${height}px`;
				break;
			case "string":
				this.#element.style.height = height;
			default:
				throw new TypeError('Parameter should be of type Number or String.');
		}
		return this;
	}

	getElement(){
		return this.#element;
	}
}

class DigitalTubes {
	#tubes = [];
	#element;

	constructor(element, datas) {
		switch (typeof element) {
			case 'undefined':
				this.#element = document.createElement("div");
				break;
			case 'string':
				if (document.querySelectorAll(element).length === 1) {
					this.#element = document.querySelector(element);
				} else {
					throw new Error('The provided string parameter cannot select an element or selects more than one element.');
				}
				break;
			case 'object':
				if (this.#isElement(element)) {
					if (element.tagName === "DIV") {
						this.#element = element;
					} else {
						throw new TypeError('Parameter 1 must be a DIV DOM element.');
					}
				} else if (element === null) {
					this.#element = document.createElement("div");
				} else {
					throw new TypeError('Parameter 1 must be a selector string or a DIV DOM element.');
				}
				break;
			default:
				throw new TypeError('Parameter 1 must be a selector string or a DIV DOM element.');
		}

		if (Array.isArray(datas)) {
			if (!datas.every(tube => tube instanceof DigitalTube)) {
				throw new TypeError('All elements in the datas array must be instances of DigitalTube.');
			}
			this.#tubes = datas;
		} else if (typeof datas === 'number' && datas >= 0) {
			for (let i = 0; i < datas; i++) {
				this.addTube(new DigitalTube());
			}
		} else {
			throw new TypeError('Parameter 2 must be an array of DigitalTube objects or a non-negative integer.');
		}

		this.#tubes.forEach(tube => {
			this.#element.appendChild(tube.getElement());
		});
	}

	#isElement(element) {
		return element instanceof Element || element instanceof HTMLDocument;
	}

	addTube(tubeClass) {
		if (!(tubeClass instanceof DigitalTube)) {
			throw new TypeError('The parameter must be an instance of DigitalTube.');
		}
		this.#tubes.push(tubeClass);
		this.#element.appendChild(tubeClass.getElement());
		return this;
	}

	removeTube(index) {
		if (typeof index !== 'number' || index < 0 || index >= this.#tubes.length) {
			throw new RangeError('Index out of range.');
		}
		let tube = this.#tubes.splice(index, 1)[0];
		this.#element.removeChild(tube.getElement());
		return [this, tube];
	}

	setDatas(datas) {
		if (!Array.isArray(datas)) throw new TypeError('The parameter must be an array.');
		if (datas.length !== this.#tubes.length) throw new RangeError('The length of the data array must match the number of tubes.');
		datas.forEach((data, i) => this.#tubes[i].setData(data));
		return this;
	}

	setData(index, data) {
		if (typeof index !== 'number' || index < 0 || index >= this.#tubes.length) {
			throw new RangeError('Index out of range.');
		}
		this.#tubes[index].setData(data);
		return this;
	}

	setNums(nums) {
		if (!Array.isArray(nums)) throw new TypeError('The parameter must be an array.');
		if (nums.length !== this.#tubes.length) throw new RangeError('The length of the number array must match the number of tubes.');
		nums.forEach((num, i) => this.#tubes[i].setNum(num));
		return this;
	}

	setNum(index, num) {
		if (typeof index !== 'number' || index < 0 || index >= this.#tubes.length) {
			throw new RangeError('Index out of range.');
		}
		this.#tubes[index].setNum(num);
		return this;
	}

	setHeights(heights) {
		if (!Array.isArray(heights)) throw new TypeError('The parameter must be an array.');
		if (heights.length !== this.#tubes.length) throw new RangeError('The length of the height array must match the number of tubes.');
		heights.forEach((height, i) => this.#tubes[i].setHeight(height));
		return this;
	}

	setHeight(index, height) {
		if (typeof index !== 'number' || index < 0 || index >= this.#tubes.length) {
			throw new RangeError('Index out of range.');
		}
		this.#tubes[index].setHeight(height);
		return this;
	}

	setColors(colors) {
		if (!Array.isArray(colors)) throw new TypeError('The parameter must be an array.');
		if (colors.length !== this.#tubes.length) throw new RangeError('The length of the color array must match the number of tubes.');
		colors.forEach((color, i) => this.#tubes[i].setColor(color));
		return this;
	}

	setColor(index, color) {
		if (typeof index !== 'number' || index < 0 || index >= this.#tubes.length) {
			throw new RangeError('Index out of range.');
		}
		this.#tubes[index].setColor(color);
		return this;
	}

	getDatas() {
		return this.#tubes.map(tube => tube.getData());
	}

	getData(index) {
		if (typeof index !== 'number' || index < 0 || index >= this.#tubes.length) {
			throw new RangeError('Index out of range.');
		}
		return this.#tubes[index].getData();
	}

	getColors() {
		return this.#tubes.map(tube => tube.getColor());
	}

	getColor(index) {
		if (typeof index !== 'number' || index < 0 || index >= this.#tubes.length) {
			throw new RangeError('Index out of range.');
		}
		return this.#tubes[index].getColor();
	}

	getHeights() {
		return this.#tubes.map(tube => tube.getHeight());
	}

	getHeight(index) {
		if (typeof index !== 'number' || index < 0 || index >= this.#tubes.length) {
			throw new RangeError('Index out of range.');
		}
		return this.#tubes[index].getHeight();
	}

	getTubes() {
		return this.#tubes;
	}

	getElement() {
		return this.#element;
	}
}
