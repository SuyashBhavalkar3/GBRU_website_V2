import { withEncryption } from "@/utils/withEncryption";
import { NextResponse } from 'next/server';
import { getDB } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

async function _getHandler() {
  try {
    const db = getDB();
    if (!db) {
      return NextResponse.json({ maintenance: false, warning: "Database not initialized" });
    }
    const docRef = db.collection('maintenance').doc('mode');
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const data = docSnap.data();
      const maintenanceActive = !!data?.recom_gbru_shoption;
      return NextResponse.json({ maintenance: maintenanceActive });
    }

    return NextResponse.json({ maintenance: false });
  } catch (error: any) {

    // Safe fallback so website keeps working if Firestore is temporarily down or credentials fail
    return NextResponse.json({ maintenance: false, error: error.message });
  }
}

export const GET = withEncryption(_getHandler);
