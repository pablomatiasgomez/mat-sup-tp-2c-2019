class NewtonGregoryPolynom {
  constructor(points, progressive) {
    this.points = points;
    this.progressive = progressive;

    this.getTerms = this.getTerms.bind(this);
    this.getDifferencesByOrder = this.getDifferencesByOrder.bind(this);
    this.getStepByStepSolution = this.getStepByStepSolution.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  evaluate(k) {
    let terms = this.getTerms();
    return terms.reduce((acc, term) => acc + term.evaluate(k), 0);
  }

  /**
   * returns an array in which the first position are the values given in each point,
   * and then each index i corresponds to the difference of order i
   */
  getDifferencesByOrder() {
    let differencesByOrder = [];
    let currentDifferences = [];
    this.points.forEach(point => currentDifferences.push(point.y));
    differencesByOrder.push(currentDifferences);
    let lastDifferences = currentDifferences;

    for (let order = 1; order < this.points.length; order++) {
      currentDifferences = [];
      for (let i = 0; i < lastDifferences.length - 1; i++) {
        currentDifferences.push((lastDifferences[i + 1] - lastDifferences[i]) / (this.points[i + order].x - this.points[i].x));
      }
      differencesByOrder.push(currentDifferences);
      lastDifferences = currentDifferences;
    }
    return differencesByOrder;
  }

  getTerms() {
    let differencesByOrder = this.getDifferencesByOrder();
    let terms = [];
    let xs = this.points.map(point => point.x);
    if (this.progressive) {
      // First element of each difference
      let coefficients = differencesByOrder.map(differences => differences[0]);
      for (let i = 0; i < coefficients.length; i++) {
        terms.push(new NewtonGregoryTerm(coefficients[i], [...xs].splice(0, i)));
      }
    } else {
      // Last element of each difference
      let coefficients = differencesByOrder.map(differences => differences[differences.length - 1]);
      for (let i = 0; i < coefficients.length; i++) {
        terms.push(new NewtonGregoryTerm(coefficients[i], [...xs].reverse().splice(0, i)));
      }
    }
    return terms;
  }

  pointsAreEquispaced() {
    if (this.points.length < 2) return true;
    let space = this.points[1].x - this.points[0].x;
    for (let i = 0; i < this.points.length - 1; i++) {
      if ((this.points[i + 1].x - this.points[i].x) !== space) {
        return false;
      }
    }
    return true;
  }

  getStepByStepSolution() {
    let terms = this.getTerms();
    // TODO aca habria que imprimir la tablita de las diferencias.
    let differences = "";

    return `
      <h5 class="mb-3"><u>Pasos de calculo:</u></h5>
      ${differences}
      <br>
      <br>
      <h5 class="mb-3"><u>Polinomio interpolante:</u></h5>
      <b>P(x) = ${terms.map(x => x.printTerm()).filter(term => !!term).join(" + ")}</b>
      <br>
      <br>
      Grado: ${Math.max(...terms.map(term => term.getDegree()))}
      <br>
      Puntos equiespacidos: ${this.pointsAreEquispaced() ? "Si" : "No"}
    `;
  }
}
