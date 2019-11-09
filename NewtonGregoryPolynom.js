class NewtonGregoryPolynom {
  constructor() {
    this.points = [];

    this.addPoints = this.addPoints.bind(this);
    this.getTerms = this.getTerms.bind(this);
    this.printStepByStepSolution = this.printStepByStepSolution.bind(this);
  }

  addPoints(x, y) {
    this.points.push({
      x: x,
      y: y
    });
  }

  getTerms(progressive) {
    let differencesByOrder = []; // index 0 -> valores de y. index 1 -> orden 1
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

    let terms = [];
    let xs = this.points.map(point => point.x);
    if (progressive) {
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

  printStepByStepSolution(progressive) {
    const terms = this.getTerms(progressive);
    const termsSolution = terms
        .map(x => x.printStepByStepSolution())
        .join("<br>");

    return (
        termsSolution +
        "<br>" +
        "P(x) = " +
        terms.map(x => x.printTerm()).join(" + ")
    );
  }
}
