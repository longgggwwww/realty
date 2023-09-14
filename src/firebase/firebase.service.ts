import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {} from 'firebase-admin/storage';
import { firebaseConfig } from './firebase-config';

@Injectable()
export class FirebaseService {
  private app: admin.app.App;

  constructor() {
    // this.app = admin.initializeApp({
    //   credential: admin.credential.cert({ ...firebaseConfig }),
    //   storageBucket: 'hello-world',
    // });
  }

  getAuth() {
    return this.app.auth();
  }

  getBucket() {
    return this.app.storage().bucket();
  }

  async getUser(token: string) {
    const decoded = await this.getAuth().verifyIdToken(token);
    return await this.getAuth().getUser(decoded.uid);
  }
}
