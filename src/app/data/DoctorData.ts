export class Doctors {
  id: number;
  name: string; 
  availableTime: number; 
  estimatedArrivalTime: number; 

  constructor(
    id: number,
    name: string,
    availableTime: number,
    estimatedArrivalTime: number
  ) {
    this.id = id;
    this.name = name;
    this.availableTime = availableTime;
    this.estimatedArrivalTime = estimatedArrivalTime;
  }
}
