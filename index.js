function fractionHtml(sup, sub) {
  return `<div class="frac"><span>${sup}</span><span class="bottom">${sub}</span></div>`;
}

function floatToString(floatNumber) {
  // For printing purposes we want to cut it to two decimals.
  return (Math.round(floatNumber * 100) / 100).toString().replace(".", ",");
}

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

  let resultsContainer = document.getElementById("results-container");
  let solutionDiv = document.getElementById("solution");
  let evaluatePolynomBtn = document.getElementById("evaluate-polynom");
  let kTxt = document.getElementById("k");
  let evaluateResultDiv = document.getElementById("evaluate-result");
  let resetBtn = document.getElementById("reset");

  let polynom;
  function printSolution(newPolynom) {
    if (!points.length) {
      return alert("Debe ingresar al menos un punto.");
    }

    if (polynom) {
      if (!newPolynom.equals(polynom)) {
        alert(
          "El polinomio nuevo difiere del anterior. \nPresione aceptar para visualizar el nuevo."
        );
      } else {
        alert(
          "El polinomio no difiere del anterior. \nPresione aceptar para continuar."
        );
      }
    }
    polynom = newPolynom;
    resultsContainer.classList.remove("d-none");
    solutionDiv.innerHTML = polynom.getStepByStepSolution();
    evaluateResultDiv.innerText = "";
  }

  runLagrangeBtn.onclick = function() {
    printSolution(new LagrangePolynom([...points]));
  };

  runNewtonProgBtn.onclick = function() {
    printSolution(new NewtonGregoryPolynom([...points], true));
  };

  runNewtonRegrBtn.onclick = function() {
    printSolution(new NewtonGregoryPolynom([...points], false));
  };

  evaluatePolynomBtn.onclick = function() {
    let k = parseFloat(kTxt.value.replace(",", "."));
    if (isNaN(k)) {
      return alert("Debe ingresar un numero");
    }
    evaluateResultDiv.innerHTML = `<b>P(${k}) = ${polynom.evaluate(k)}<b>`;
    kTxt.value = "";
  };

  resetBtn.onclick = function() {
    polynom = undefined;
    resultsContainer.classList.add("d-none");
    solutionDiv.innerHTML = "";
    points.forEach(point => deletePoint(point.x));
  };
})();
