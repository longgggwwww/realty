import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../../firebase-admin.test.json';

const firebaseConfig: ServiceAccount = {
  projectId: serviceAccount.project_id,
  clientEmail: serviceAccount.client_email,
  privateKey: serviceAccount.private_key,
};
export { firebaseConfig };
