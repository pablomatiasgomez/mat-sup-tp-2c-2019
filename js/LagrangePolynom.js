class LagrangePolynom {
  constructor(points) {
    this.xs = points.map(point => point.x);
    this.ys = points.map(point => point.y);

    this.getLagrangeTerms = this.getLagrangeTerms.bind(this);
    this.getStepByStepSolution = this.getStepByStepSolution.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  evaluate(xo) {
    const terms = this.getLagrangeTerms();
    return terms.reduce((acc, term) => acc + term.evaluate(xo), 0);
  }

  getLagrangeTerms() {
    const terms = [];
    for (let i = 0; i < this.xs.length; i++) {
      terms.push(new LagrangeTerm([...this.xs], this.ys[i], i));
    }
    return terms;
  }

  pointsAreEquispaced() {
    if (this.xs.length < 2) return true;
    let space = this.xs[1] - this.xs[0];
    for (let i = 0; i < this.xs.length - 1; i++) {
      if ((this.xs[i + 1] - this.xs[i]) !== space) {
        return false;
      }
    }
    return true;
  }

  getStepByStepSolution() {
    const terms = this.getLagrangeTerms();
    const termsSolution = terms
      .map(x => x.printStepByStepSolution())
      .join("<br>");

    return `
      <h5 class="mb-3"><u>Pasos de calculo:</u></h5>
      ${termsSolution}
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