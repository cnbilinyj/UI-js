window.bilinyj = window.bilinyj || {}
window.bilinyj.PanelAssembly = window.bilinyj.PanelAssembly || {}
window.bilinyj.PanelAssembly.class = window.bilinyj.PanelAssembly.class || {}
window.bilinyj.PanelAssembly.class.PanelAssembly = window.bilinyj.PanelAssembly.class.PanelAssembly || class PanelAssembly {
	#element
	#paths
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
					throw new TypeError('The passed-in string parameter 1 cannot be selected and only one element is selected.')
				}
				break;
			case 'object':
				// 如果参数1是JavaScript对象，则判断是不是JavaScript DOM元素(SVG)
				if (this.#isElement(element)) {
					if (element.tagName === "SVG") {
						this.#element = element;
					} else {
						throw new TypeError('Parameter 1 should be an HTML/XML DOM element (SVG).')
					}
				} else if (element === null) {
					this.#element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
					this.#element.setAttribute("height", "300px");
					this.#element.setAttribute("viewBox", "0 0 84 128");
				} else {
					throw new TypeError('Parameter 1 should be an element selector String of type String or a DOM element of type Object(Element).');
				}
				break;
			default:
				throw new TypeError('Parameter 1 should be an element selector String of type String or a DOM element of type Object(Element).');
		}

		// 获取内部引用，方便后续操作
		let $element = this.#element;
		$element.innerHTML = "";
		$element.appendChild($background_rect);
		this.#paths = {}
		return this;
	}

	setAppearanceSegment(name, pathData) {
		let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", pathData);
		path.setAttribute("fill", "#313131");
		this.#paths[name] = path;
		Object.values(this.#paths).forEach((i) => {
			this.#element.appendChild(i);
		});
	}

	#isElement(element) {
		return element instanceof Element || element instanceof HTMLment || element instanceof SVGElement;
	}

	getElement() {
		return this.#element;
	}
}

window.bilinyj.PanelAssembly.class.AppearanceSegment = window.bilinyj.PanelAssembly.class.AppearanceSegment || class AppearanceSegment {
	
}