class LagrangePolynom {
  constructor() {
    this.xs = [];
    this.ys = [];

    this.addPoints = this.addPoints.bind(this);
    this.getLagrangeTerms = this.getLagrangeTerms.bind(this);
    this.printStepByStepSolution = this.printStepByStepSolution.bind(this);
  }

  addPoints(x, y) {
    this.xs.push(x);
    this.ys.push(y);
  }

  getLagrangeTerms() {
    const terms = [];
    for (let i = 0; i < this.xs.length; i++) {
      terms.push(new LagrangeTerm([...this.xs], this.ys[i], i));
    }
    return terms;
  }

  printStepByStepSolution() {
    const terms = this.getLagrangeTerms();
    const termsSolution = terms
      .map(x => x.printStepByStepSolution())
      .join("\n");

    return (
      termsSolution +
      "\n" +
      "P(x) = " +
      terms.map(x => x.printTerm()).join(" + ")
    );
  }
}
