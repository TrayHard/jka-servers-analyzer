export class OnlineStamp {
  amount: number;
  datetime: Date;

  constructor(amount: number) {
    this.amount = amount;
    this.datetime = new Date();
  }
}