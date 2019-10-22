(function() {
	let n = 0;
	let pointsCounter = document.getElementById("points-counter");
	let addPointBtn = document.getElementById("add-point");
	let xTxt = document.getElementById("x");
	let yTxt = document.getElementById("y");

	let pointsTableBody = document.querySelector("#points-table > tbody");

	addPointBtn.onclick = function() {
		let x = parseFloat(xTxt.value.replace(",", "."));
		let y = parseFloat(yTxt.value.replace(",", "."));
		if (isNaN(x) || isNaN(y)) {
			return alert("Debe ingresar numeros");
		}

		let row = `
		<tr>
			<td>${n}</td>
			<td>${x}</td>
			<td>${y}</td>
			<td><!--button type="button" class="btn btn-outline-danger btn-sm"><span class="fa fa-trash"></span></button--></td>
		</tr>`;
		pointsTableBody.innerHTML += row;
		pointsCounter.innerHTML = n + 1;

		n++;
		xTxt.value = "";
		yTxt.value = "";
	}
})();