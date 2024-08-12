import { Injectable } from '@angular/core';
// Firebase Module API functions
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  remove,
  push,
  DataSnapshot,
  onValue,
} from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  db: any;

  constructor() {
    this.setupFirebase(); 
    this.db = getDatabase(); 
  }
  setupFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyCR76xxzN5uwf64KwORzYWMRYVzi7k-LGc",
      authDomain: "project-5fa9a.firebaseapp.com",
      projectId: "project-5fa9a",
      storageBucket: "project-5fa9a.appspot.com",
      messagingSenderId: "740827934993",
      appId: "1:740827934993:web:4a9e7c48325e9b11799cb0",
      measurementId: "G-3VHESFZ746"
    };
    
    initializeApp(firebaseConfig);
  }

  // CRUD: Create, Retrieve, Update, Delete 
  create(path: string, data: any): Promise<void>{ // Create
    return set(ref(this.db, path), data);
  }
  async retrieve(path: string, key: string): Promise<DataSnapshot>{
    return await get(ref(this.db, path+"/"+key));
  }
  update(path: string, key: string, data: any): Promise<void>{ 
    return update(ref(this.db, path + "/" + key), data);
  }
  delete(path: string, key: string): Promise<void>{ 
    return remove(ref(this.db, path+"/"+key));
  }

  // Lists
  // Add to List
  pushToList(path: string, data: any){
    return push(ref(this.db, path), data).key;
  }
  // Delete from list
  deleteFromList(path: string, key: string){
    this.delete(path, key);
  }
  // Get List Once 
  async getList(path: string){
    const dblist = await get(ref(this.db, path));
    let locallist: any[] = [];
    dblist.forEach( item =>{locallist.push(item.val());});
    return locallist; 
  }

  async readList(path: string): Promise<any[]> {
    const snapshot = await get(ref(this.db, path));
    const list: any[] = [];
    snapshot.forEach(childSnapshot => {
      list.push(childSnapshot.val());
    });
    return list;
  }

  addToList(path: string, data: any){
    return push(ref(this.db, path), data).key;
  }

  
  removeFromList(path: string, key: string){
    remove(ref(this.db, `${path}/${key}`));
  }

 getDataContinuosly(field: string): Observable<[]>{
  return new Observable((observer) => {
    onValue(ref(this.db, field), (data) => {
      if(data.valueOf()!= null)
        observer.next(data.val());
    });
  });
 }

 pushToNearestDoctorsList(data: any) {
  return push(ref(this.db, "/nearestDoctors"), data).key;
}

// Push locations to the emergency doctors list
pushToEmergencyDoctorsList(data: any) {
  return push(ref(this.db, "/emergencyDoctors"), data).key;
}

  reset(){
    this.delete("","");
  }
  
  getDB(){
    return this.db; 
  }

}

