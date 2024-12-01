window.bilinyj = window.bilinyj || {};
window.bilinyj.PanelAssembly = window.bilinyj.PanelAssembly || {};
window.bilinyj.PanelAssembly.class = window.bilinyj.PanelAssembly.class || {};
window.bilinyj.PanelAssembly.class.InstrumentCluster = window.bilinyj.PanelAssembly.class.InstrumentCluster || class InstrumentCluster {
	#packages
	#element
	#style
	#background_rect

	constructor(width, height, element) {
		[width, height].forEach((i) => {
			if (typeof i !== "number") {
				throw TypeError('At least one of parameters 1 and 2 is not of type number.')
			}
		});
		this.#background_rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		let $background_rect = this.#background_rect;
		$background_rect.setAttribute("width", width + 2);
		$background_rect.setAttribute("height", height + 2);
		$background_rect.setAttribute("x", -1);
		$background_rect.setAttribute("y", -1);
		$background_rect.setAttribute("fill", "#161616")
		switch (typeof element) {
			case 'undefined':
				// 没有参数3则创建一个新的SVG元素
				this.#element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				this.#element.setAttribute("viewBox", `0 0 ${width} ${height}`);
				break;
			case 'string':
				// 如果参数3是字符串，则认为这是字符串格式的元素选择器
				if (document.querySelectorAll(element).length === 1) {
					let _element = document.querySelector(element);
					if (this.#isElement(_element)) {
						if (_element.tagName === "SVG") {
							this.#element = _element;
						} else {
							throw new TypeError('Parameter 3 should be an HTML/XML DOM element (SVG).')
						}
					} else {
						throw new TypeError('Parameter 3 should be an element selector String of type String or a DOM element of type Object(Element).');
					}
					this.#element = element;
				} else {
					throw new TypeError('The passed-in string parameter 3 cannot be selected and only one element is selected.')
				}
				break;
			case 'object':
				// 如果参数1是JavaScript对象，则判断是不是JavaScript DOM元素(SVG)
				if (this.#isElement(element)) {
					if (element.tagName === "SVG") {
						this.#element = element;
					} else {
						throw new TypeError('Parameter 3 should be an HTML/XML DOM element (SVG).')
					}
				} else if (element === null) {
					this.#element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
					this.#element.setAttribute("height", "300px");
					this.#element.setAttribute("viewBox", "0 0 84 128");
				} else {
					throw new TypeError('Parameter 3 should be an element selector String of type String or a DOM element of type Object(Element).');
				}
				break;
			default:
				throw new TypeError('Parameter 3 should be an element selector String of type String or a DOM element of type Object(Element).');
		}
		let $element = this.#element;
		$element.appendChild(this.#background_rect);
		this.#style = document.createElementNS("http://www.w3.org/2000/svg", "style");
		let $style = this.#style;
		$style.innerHTML = 'g[fillColor], path {\
\t--fill: attr(fillColor);\
}\
\
g[fillColor] > path.illumine {\
\tfill: var(--fill)\
}\
\
path:not(.illumine):not(.background) {\
\tfill: #313131;\
}';
		$element.appendChild($style);
		this.#packages = [];
		return this;
	}

	#isElement(element) {
		return element instanceof Element || element instanceof HTMLment || element instanceof SVGElement;
	}

	getElement() {
		return this.#element;
	}
};

window.bilinyj.PanelAssembly.class.Group = window.bilinyj.PanelAssembly.class.Group || class Group {
	#tubes
	#controlFunction
	#SVGgElement

	constructor (tubes, controlFunction) {
		if (tubes.map(i => i instanceof window.bilinyj.PanelAssembly.class.Tube).indexOf(false != -1)) {
			// 但凡有一个元素不符合以上要求，就报错
			throw new Error("Parameter 1 should be an array, in which each element should be an array of length one or two, where the element type of subscript 0 should be SVG PATH string, and the element type of subscript 1 should be color string.")
		}
		this.#tubes = tubes;
		this.#controlFunction = controlFunction;
		this.#SVGgElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
	}

	updateSVG () {
		let pathAColorS = this.#pathAColorS;
		let SVGgElement = this.#SVGgElement;

		pathAColorS.forEach(i => {
			let SVGpathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
			SVGpathElement.setAttribute('d', i[0]);
			SVGpathElement.colors = Array.from(i[1]);
			SVGgElement.appendChild(SVGpathElement);
		});
	}
}

window.bilinyj.PanelAssembly.class.Tube = window.bilinyj.PanelAssembly.class.Tube || class Tube {
	constructor(path, $colors) {
		let colorRegularExpression = /^(rgba\(\s*?((2[0-4]\d)|(25[0-5])|(1\d{2})|(0?\d{2})|(0{0,2}\d))\s*?,\s*?((2[0-4]\d)|(25[0-5])|(1\d{2})|(0?\d{2})|(0{0,2}\d))\s*?,\s*?((2[0-4]\d)|(25[0-5])|(1\d{2})|(0?\d{2})|(0{0,2}\d))\s*?,\s*?\d*?(\.\d*)?\))|(#(([0-9a-fA-F]{3,4})|([0-9a-fA-F]{6})|([0-9a-fA-F]{8})))|(rgb\(\s*?((2[0-4]\d)|(25[0-5])|(1\d{2})|(0?\d{2})|(0{0,2}\d))\s*?,\s*?((2[0-4]\d)|(25[0-5])|(1\d{2})|(0?\d{2})|(0{0,2}\d))\s*?,\s*?((2[0-4]\d)|(25[0-5])|(1\d{2})|(0?\d{2})|(0{0,2}\d))\s*?\))$/;
		if ($colors.map(i => (
			((typeof i) == "string" && 
				colorRegularExpression.test(i))
		)).indexOf(false != -1)) {
			// 但凡有一个元素不符合以上要求，就报错
			throw new Error("需要一个由颜色字符串组成的数组")
		}
	}
}