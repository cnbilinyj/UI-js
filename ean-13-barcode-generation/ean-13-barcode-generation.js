function calculate_barcode_parity_bit(code) {
	let check_digit = 0;
	let codeString = code.toString();
	parseInt(codeString);
	if (codeString.length != 12) {
		throw RangeError("Parameter length is not 12.");
	}
	codeString.split('').reverse().forEach((item, index) => {
		check_digit += item * (((index + 1) % 2 == 1) ? 3 : 1);
	});
	check_digit = (10 - (check_digit % 10)) % 10;
	return check_digit;
}

function generate_ean13_barcode_12(code, canvasElement) {
	return generate_ean13_barcode_13(code + calculate_barcode_parity_bit(code), canvasElement);
}

function generate_ean13_barcode_13(code, canvasElement) {
	let canvas = canvasElement || document.createElement("canvas");
	canvas.width = 535;
	canvas.height = 160;
	let ctx = canvas.getContext("2d");
	let pattern = {
		"bar": [114,102,108,66,92,78,80,68,72,116],
		"combination": [63,52,50,49,44,38,35,42,41,37]
	};
	let first = '';
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
	ctx.font = '26px Monospace';
	ctx.fillText(code[0], 8, 150);
	let x = 30;
	ctx.fillRect(x, 5, 5, 150);
	x += 10;
	ctx.fillRect(x, 5, 5, 150);
	x += 5;
	ctx.fillText(code.slice(1, 7), x + 55, 150);
	code.split('').forEach((item, index) => {
		if (index === 0) {
			first = pattern.combination[parseInt(item)].toString(2);
			return;
		}
		let fill = pattern.bar[parseInt(item)].toString(2);
		if (index <= 6) {
			if (first[index - 1] == "1") {
				fill = fill.replace(/1/g, '_').replace(/0/g, '|');
			} else {
				fill = fill.split('').reverse().join('').replace(/1/g, '|').replace(/0/g, '_');
			}
		} else {
			fill = fill.replace(/1/g, '|').replace(/0/g, '_');
		}
		fill.split('').forEach(i => {
			if (i == "|") {
				ctx.fillRect(x, 5, 5, 120);
				console.log(x);
			}
			x += 5;
		});
		if (index == 6) {
			x += 5;
			ctx.fillRect(x, 5, 5, 150);
			x += 10;
			ctx.fillRect(x, 5, 5, 150);
			x += 10;
			ctx.fillText(code.slice(7), x + 55, 150);
		}
		console.log(fill);
	});
	ctx.fillRect(x, 5, 5, 150);
	x += 10;
	ctx.fillRect(x, 5, 5, 150);
	return canvas;
}