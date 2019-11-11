(function() {
  let pointsCounter = document.getElementById("points-counter");
  let addPointBtn = document.getElementById("add-point");
  let xTxt = document.getElementById("x");
  let yTxt = document.getElementById("y");
  let pointsTableBody = document.querySelector("#points-table > tbody");
  let points = [];

  window.deletePoint = function(x) {
    document.getElementById("point-row-" + x).remove();
    points = points.filter(point => point.x !== x);
    pointsCounter.innerHTML = points.length.toString();
  };

  addPointBtn.onclick = function() {
    let x = parseFloat(xTxt.value.replace(",", "."));
    let y = parseFloat(yTxt.value.replace(",", "."));
    if (isNaN(x) || isNaN(y)) {
      return alert("Debe ingresar numeros");
    }
    if (points.some(point => point.x === x)) {
      return alert("Ya existe un valor de 'y' para 'x' en " + x);
    }

    points.push({ x: x, y: y });
    let row = `
      <tr id="point-row-${x}">
        <td>${x}</td>
        <td>${y}</td>
        <td><button type="button" class="btn btn-outline-danger btn-sm" onclick="deletePoint(${x});"><span class="fa fa-trash"></span></button></td>
      </tr>`;
    pointsTableBody.innerHTML += row;
    pointsCounter.innerHTML = points.length.toString();

    xTxt.value = "";
    yTxt.value = "";
  };

  // ----

  let runLagrangeBtn = document.getElementById("run-lagrange");
  let runNewtonProgBtn = document.getElementById("run-newton-prog");
  let runNewtonRegrBtn = document.getElementById("run-newton-regr");
  let resultsDiv = document.getElementById("results");

  let evaluateContainer = document.getElementById("evaluate-container");
  let evaluatePolynomBtn = document.getElementById("evaluate-polynom");
  let kTxt = document.getElementById("k");
  let evaluateResultDiv = document.getElementById("evaluate-result");

  let polynom;
  function printSolutionAndEnableEvaluate(newPolynom) {
    if (polynom) {
      // TODO evaluar si el polinomio nuevo y el viejo son iguales/distintos e informarlo
    }
    polynom = newPolynom;
    resultsDiv.innerHTML = polynom.getStepByStepSolution();
    evaluateContainer.classList.remove("d-none");
    evaluateResultDiv.innerText = "";
  }

  runLagrangeBtn.onclick = function() {
    printSolutionAndEnableEvaluate(new LagrangePolynom(points));
  };

  runNewtonProgBtn.onclick = function() {
    printSolutionAndEnableEvaluate(new NewtonGregoryPolynom(points, true));
  };

  runNewtonRegrBtn.onclick = function() {
    printSolutionAndEnableEvaluate(new NewtonGregoryPolynom(points, false));
  };

  evaluatePolynomBtn.onclick = function() {
    let k = parseFloat(kTxt.value.replace(",", "."));
    if (isNaN(k)) {
      return alert("Debe ingresar un numero");
    }
    evaluateResultDiv.innerText = `P(${k}) = ${polynom.evaluate(k)}`;
    kTxt.value = "";
  };
})();
