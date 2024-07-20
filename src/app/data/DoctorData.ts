export class Doctors {
  id: number;
  doctorname: string; 
  Atime: number; 
  Etime: number; 

  constructor(id: number, doctorname: string, Atime: number, Etime: number) {
    this.id = id;
    this.doctorname = doctorname;
    this.Atime = Atime;
    this.Etime = Etime;
  }
}