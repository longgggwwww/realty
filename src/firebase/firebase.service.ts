import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firebaseConfig } from './firebase-config';

@Injectable()
export class FirebaseService {
  private app: admin.app.App;

  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert({ ...firebaseConfig }),
    });
  }

  getAuth() {
    return this.app.auth();
  }

  async getUser(token: string) {
    const decoded = await this.getAuth().verifyIdToken(token);
    return await this.getAuth().getUser(decoded.uid);
  }
}
