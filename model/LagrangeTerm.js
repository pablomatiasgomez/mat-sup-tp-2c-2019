class LagrangeTerm {
  constructor(xs, y, index) {
    this.xs = xs;
    this.y = y;
    this.index = index;

    this.evalFactors = this.evalFactors.bind(this);
    this.printCoefficient = this.printCoefficient.bind(this);
    this.printFactors = this.printFactors.bind(this);
    this.printTerm = this.printTerm.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.printStepByStepSolution = this.printStepByStepSolution.bind(this);

    this.coefficient = y / this.evalFactors(xs[index]);
  }

  evalFactors(xo) {
    const aux = [...this.xs];
    aux.splice(this.index, 1);
    return aux.reduce((acc, xi) => acc * (xo - xi), 1);
  }

  evaluate(xo) {
    return this.evalFactors(xo) * this.coefficient;
  }

  printCoefficient() {
    return this.y + "/" + this.evalFactors(this.xs[this.index]);
  }

  printFactors() {
    const aux = [...this.xs];
    aux.splice(this.index, 1);
    return aux.map(x => "(x-" + x + ")").join("");
  }

  printTerm() {
    if (this.coefficient === 0) return "";
    return this.printCoefficient() + this.printFactors();
  }

  getDegree() {
    if (this.coefficient === 0) return 0;
    const aux = [...this.xs];
    aux.splice(this.index, 1);
    return aux.length;
  }

  printStepByStepSolution() {
    const li = "L" + this.index;
    return (
      li +
      " = " +
      this.printFactors() +
      " => " +
      li +
      " (xo) = " +
      this.evalFactors(this.xs[this.index])
    );
  }
}
