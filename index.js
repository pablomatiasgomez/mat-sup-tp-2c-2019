
(function() {
  let n = 0;
  let pointsCounter = document.getElementById("points-counter");
  let addPointBtn = document.getElementById("add-point");
  let xTxt = document.getElementById("x");
  let yTxt = document.getElementById("y");
  let pointsTableBody = document.querySelector("#points-table > tbody");
  let points = [];

  addPointBtn.onclick = function() {
    let x = parseFloat(xTxt.value.replace(",", "."));
    let y = parseFloat(yTxt.value.replace(",", "."));
    if (isNaN(x) || isNaN(y)) {
      return alert("Debe ingresar numeros");
    }

    points.push({ x: x, y: y });
    let row = `
		<tr>
			<td>${n}</td>
			<td>${x}</td>
			<td>${y}</td>
			<!--td><button type="button" class="btn btn-outline-danger btn-sm"><span class="fa fa-trash"></span></button></td-->
		</tr>`;
    pointsTableBody.innerHTML += row;
    pointsCounter.innerHTML = n + 1;

    n++;
    xTxt.value = "";
    yTxt.value = "";
  };

  let runLagrangeBtn = document.getElementById("run-lagrange");
  let runNewtonProgBtn = document.getElementById("run-newton-prog");
  let runNewtonRegrBtn = document.getElementById("run-newton-regr");
  let resultsDiv = document.getElementById("results");

  runLagrangeBtn.onclick = function() {
    const lagrangePolynom = new LagrangePolynom();
    points.forEach(point => lagrangePolynom.addPoints(point.x, point.y));
    resultsDiv.innerHTML = lagrangePolynom.printStepByStepSolution();
  };

  runNewtonProgBtn.onclick = function() {
    const newtonGregoryPolynom = new NewtonGregoryPolynom();
    points.forEach(point => newtonGregoryPolynom.addPoints(point.x, point.y));
    resultsDiv.innerHTML = newtonGregoryPolynom.printStepByStepSolution(true);
  };

  runNewtonRegrBtn.onclick = function() {
    const newtonGregoryPolynom = new NewtonGregoryPolynom();
    points.forEach(point => newtonGregoryPolynom.addPoints(point.x, point.y));
    resultsDiv.innerHTML = newtonGregoryPolynom.printStepByStepSolution(false);
  };

})();
