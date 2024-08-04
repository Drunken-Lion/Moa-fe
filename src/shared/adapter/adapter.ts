export default abstract class Adapter<Adaptee, Returns> {
  protected readonly adaptee: Adaptee;

  constructor(input: Adaptee) {
    this.adaptee = input;
  }

  abstract get(): Returns;
}