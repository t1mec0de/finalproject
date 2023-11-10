import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from './upload.js'


const firebaseConfig = {
  apiKey: "AIzaSyB7w-5Y5mvNsfqR7jVjjdn96SpzhDLUTHg",
  authDomain: "fe-upload-eb971.firebaseapp.com",
  projectId: "fe-upload-eb971",
  storageBucket: "fe-upload-eb971.appspot.com",
  messagingSenderId: "69990358952",
  appId: "1:69990358952:web:7b5fb087b149f9996d479d"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  onUpload(files, blocks) {
    files.forEach((file, index) => {
      const ref = storage.ref(`images/${file.name}`)
      const task = ref.put(file)

      task.on('state_changed', snapshot => {
        const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
        const block = blocks[index].querySelector('.preview-info-progress')
        block.textContent = percentage
        block.style.width = percentage
      }, error => {
        console.log(error)
      }, () => {
        task.snapshot.ref.getDownloadURL().then(url => {
          console.log('Download URL', url)
        })
      })
    })
  }
})