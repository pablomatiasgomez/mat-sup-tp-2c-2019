class NewtonGregoryTerm {
  constructor(coefficient, xs) {
    this.coefficient = coefficient;
    this.xs = xs;

    this.printFactors = this.printFactors.bind(this);
    this.printTerm = this.printTerm.bind(this);
    this.printStepByStepSolution = this.printStepByStepSolution.bind(this);
  }

  printCoefficient() {
    return this.coefficient;
  }

  printFactors() {
    return this.xs.map(x => "(x-" + x + ")").join("");
  }

  printTerm() {
    return this.printCoefficient() + this.printFactors();
  }

  printStepByStepSolution() {
    return "TODO"; // TODO
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
