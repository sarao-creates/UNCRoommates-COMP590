import {db} from '../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function ProfilePage() {
    const [firstName, setFirstName] = useState('')

    useEffect(() => {

        const docLookup = async () => {
            const docRef = doc(db, "Users", "rkEcudx9k33I5nD8TC9a");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setFirstName(docSnap.data()["First Name"])
              } else {
                setFirstName("Error")
            }    
    
        }

        docLookup();

    }, []);
    
    return (
        <h1>{firstName}</h1>
    )
}

export default ProfilePage