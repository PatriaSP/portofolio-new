import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { defaultSiteData } from "./defaultData";

export function subscribeSiteContent(
  onChange: (data: any) => void,
  onError?: (error: any) => void
) {
  const ref = doc(db, "content", "site");

  const unsubscribe = onSnapshot(
    ref,
    async (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        onChange({ ...defaultSiteData, ...data });
      } else {
        // seed default data if missing
        await setDoc(ref, defaultSiteData);
        onChange(defaultSiteData);
      }
    },
    (err) => {
      console.error("Realtime site content error:", err);
      onError?.(err);
      onChange(defaultSiteData); // fallback
    }
  );

  return unsubscribe;
}
