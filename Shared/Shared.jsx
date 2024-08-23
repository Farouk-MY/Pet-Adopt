import {doc, getDoc, setDoc, updateDoc} from 'firebase/firestore'
import {db} from './../config/FirebaseConfig'

const getFavList = async (user) =>{
    const docSnap = await getDoc(doc(db,'UserFavPet',user?.primaryEmailAddress?.emailAddress))
    if (docSnap?.exists()){
        return docSnap.data()
    }else{
        await setDoc(doc(db,'UserFavPet',user?.primaryEmailAddress?.emailAddress),{
            email:user?.primaryEmailAddress?.emailAddress,
            favList:[],
        })
    }
}


const UpdateFav = async (user,favorites)=>{
    const docRef = doc(db,'UserFavPet',user?.primaryEmailAddress?.emailAddress)
    try {
        await updateDoc(docRef,{
            favorites:favorites
        })
    } catch (error) {
        console.log("Error Update Favorite",error.message)
    }
}

export default {
    getFavList,
    UpdateFav
}