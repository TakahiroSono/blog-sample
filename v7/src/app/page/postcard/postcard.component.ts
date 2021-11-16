import { Component, OnInit } from '@angular/core';
import { addDoc, collection, doc, Firestore } from '@angular/fire/firestore';
import {CollectionReference, DocumentData, QueryDocumentSnapshot, SnapshotOptions} from 'firebase/firestore'
import { docData } from 'rxfire/firestore';

class Postcard {
  constructor(readonly title: string, readonly content: string, readonly createdAt: Date) {}
}

const postConverter = {
  toFirestore(postcard: Postcard): DocumentData {
    return {title: postcard.title, content: postcard.content, createdAt: postcard.createdAt};
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Postcard {
    const data = snapshot.data(options)!;
    return new Postcard(data.title, data.content, data.createdAt);
  }
};
@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss']
})
export class PostcardComponent implements OnInit {
  content: Postcard | undefined = undefined
  collectionRef: CollectionReference

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'postcard')
  }

  ngOnInit(): void {
  }

  post() {
    const data = {
      title: 'sample',
      content: 'hogehoge',
      createdAt: new Date(),
    }
    addDoc(this.collectionRef, data)
      .catch(e => {console.error(e)})
  }

  getData() {
    const docRef = doc<Postcard>(
      this.collectionRef.withConverter<Postcard>(postConverter),
      'docId'
    )
    docData(docRef)
      .subscribe(snap => {
        this.content = snap
        console.log(snap)
      })
  }
}
