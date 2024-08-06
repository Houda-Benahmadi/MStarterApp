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
} from 'firebase/database';
import { initializeApp } from 'firebase/app';

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
      apiKey: "AIzaSyBaQhXXwwNHpKQlNiDXz9QqSy3ouwylpe0",
      authDomain: "project-d7d05.firebaseapp.com",
      projectId: "project-d7d05",
      storageBucket: "project-d7d05.appspot.com",
      messagingSenderId: "495263755120",
      appId: "1:495263755120:web:222599060c890111c4fdb5",
      measurementId: "G-W972V6CVF0"
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

  reset(){
    this.delete("","");
  }
  
  getDB(){
    return this.db; 
  }

}

