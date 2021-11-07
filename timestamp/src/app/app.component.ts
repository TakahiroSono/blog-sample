import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timestamp';
  timestamp: Date | undefined = undefined;
  constructor(private angularFireStore: AngularFirestore){}

  submit() {
    const data = {
      createdAt: new Date()
    }
    this.angularFireStore.collection('timestamp').add(data).catch(e => {console.log(e)}).then(value => {console.log(value)})
  }

  getTimestamp() {
    this.angularFireStore.collection('timestamp').doc('Ltq2jPZPZRmlMNulKKO1').valueChanges().subscribe(value => {
      this.timestamp = (value as any).createdAt
      console.log(value)
    })
  }
}
