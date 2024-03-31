import {
  doc,
  query,
  collection,
  getDocs,
  where,
  updateDoc,
} from "firebase/firestore";
import db from "../firebase";

export function updateCategory(category, uid) {
  const parentDocRef = doc(db, "users/" + uid);
  const childCollRef = collection(parentDocRef, "submit");
  const q = query(childCollRef, where("category", "==", category));
  let newCategory = window.prompt("カテゴリの変更");
  if (newCategory) {
    getDocs(q).then((snapShot) => {
      snapShot.forEach((data) => {
        updateDoc(doc(db, "users", uid, "submit", data.id), {
          category: newCategory,
        })
          .then(() => {
            console.log("Document sucessfully updated");
            window.location.href = "/result";
          })
          .catch((error) => {
            console.error("Error updating document" + error);
          });
      });
    });
  }
}
