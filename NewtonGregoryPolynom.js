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

  getTerms() {
    const terms = [];
    for (let i = 0; i < this.points.length; i++) {
      terms.push({ /* TODO */ });
    }
    return terms;
  }

  printStepByStepSolution(progressive) {
    const terms = this.getTerms();
    let steps = []
      .join("\n");

    return (
      steps +
      "\n" +
      "P(x) = " +
      terms.map(x => x.printTerm()).join(" + ")
    );
  }
}
