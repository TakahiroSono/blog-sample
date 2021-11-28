import { Component } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { CollectionReference, Timestamp } from '@firebase/firestore';

interface Postcard {
  updatedAt: Timestamp
  createdAt: Timestamp
  title: string
  content: string
}
interface PostcardItem extends Postcard {
  id: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'v7';
  postcard: Postcard = {
    updatedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    title: '',
    content: ''
  }
  updatedPostcard: Postcard = {
    updatedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    title: '',
    content: ''
  }
  postcards: PostcardItem[] = []

  constructor(
    private firestore: Firestore
  ){}

  post() {
    this.postcard.title = 'sample'
    this.postcard.content = 'hogehoge'
    setDoc<Postcard>(
      doc<Postcard>(
        collection(
          this.firestore,
          'postcard'
        ) as CollectionReference<Postcard>
      ),
      this.postcard
    ).catch(() => {
      window.alert('送信に失敗しました');
    });
  }

  fetch() {
    const docId = 'document ID';
    docData<Postcard>(
      doc<Postcard>(
        collection(
          this.firestore,
          'postcard'
        ) as CollectionReference<Postcard>,
        docId
      )
    ).subscribe(
      (res) => {
        this.postcard = res;
      },
      () => {
        console.error('データ取得に失敗しました');
      }
    );
  }

  collect() {
    collectionData<PostcardItem>(
      query<PostcardItem>(
        collection(
          this.firestore,
          'postcard'
        ) as CollectionReference<PostcardItem>,
        orderBy('createdAt')
      ),
      { idField: 'id' }
    ).subscribe((res) => {
      this.postcards = res;
    });
  }

  update() {
    const docId = 'document ID';
    this.updatedPostcard.title = 'sample'
    this.updatedPostcard.content = 'updated'
    this.updatedPostcard.updatedAt = Timestamp.now()
    updateDoc<Postcard>(
      doc<Postcard>(
        collection(
          this.firestore,
          'postcard'
        ) as CollectionReference<Postcard>,
        docId
      ),
      this.updatedPostcard
    )
  }

  delete() {
    const docId = 'document ID';
    deleteDoc(
      doc(
        collection(
          this.firestore,
          'postcard'
        ) as CollectionReference,
        docId
      ),
    )
  }
}
