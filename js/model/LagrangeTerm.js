class LagrangeTerm {
  constructor(xs, y, index) {
    this.xs = xs;
    this.y = y;
    this.index = index;

    this.getXs = this.getXs.bind(this);
    this.evalFactors = this.evalFactors.bind(this);
    this.printCoefficient = this.printCoefficient.bind(this);
    this.printFactors = this.printFactors.bind(this);
    this.printTerm = this.printTerm.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.printStepByStepSolution = this.printStepByStepSolution.bind(this);
    this.getReducedExpression = this.getReducedExpression.bind(this);

    this.coefficient = y / this.evalFactors(xs[index]);
  }

  getXs() {
    let aux = [...this.xs];
    aux.splice(this.index, 1);
    return aux;
  }
  
  evalFactors(xo) {
    return this.getXs().reduce((acc, xi) => acc * (xo - xi), 1);
  }

  evaluate(xo) {
    return this.evalFactors(xo) * this.coefficient;
  }

  printCoefficient() {
    return fractionHtml(this.y, this.evalFactors(this.xs[this.index]));
  }

  printFactors() {
    return this.getXs().map(x => "(x-" + x + ")").join("");
  }

  printTerm() {
    if (this.coefficient === 0) return "";
    return this.printCoefficient() + this.printFactors();
  }

  getDegree() {
    if (this.coefficient === 0) return 0;
    return this.getXs().length;
  }

  printStepByStepSolution() {
    const li = "L<sub>" + this.index + "</sub>";
    return (
      li +
      " = " +
      this.printFactors() +
      " => " +
      li +
      " (x<sub>" + this.index + "</sub>) = " +
      this.evalFactors(this.xs[this.index])
    );
  }

  getReducedExpression() {
    return this.getXs()
      .map(x => new algebra.Expression("x").subtract(x))
      .reduce((acc, expr) => acc.multiply(expr), new algebra.Expression(new algebra.Fraction(this.y, this.evalFactors(this.xs[this.index]))));
  }
}
