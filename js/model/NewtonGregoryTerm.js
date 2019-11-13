class NewtonGregoryTerm {
  constructor(coefficient, xs) {
    this.coefficient = coefficient;
    this.xs = xs;

    this.printFactors = this.printFactors.bind(this);
    this.printTerm = this.printTerm.bind(this);
    this.getDegree = this.getDegree.bind(this);
  }

  evaluate(k) {
    return this.xs.reduce((acc, xi) => acc * (k - xi), 1) * this.coefficient;
  }

  printCoefficient() {
    // For printing we want to cut it to 2 decimals.
    return floatToString(this.coefficient);
  }

  printFactors() {
    return this.xs.map(x => "(x-" + x + ")").join("");
  }

  printTerm() {
    if (this.coefficient === 0) return "";
    return this.printCoefficient() + this.printFactors();
  }

  getDegree() {
    if (this.coefficient === 0) return 0;
    return this.xs.length;
  }

}
