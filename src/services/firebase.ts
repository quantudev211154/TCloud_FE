import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  Auth,
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import {
  DEFAULT_PREFIX_PHONE_NUMBER,
  firebaseConfig,
} from '../constants/firebase.constant'
import {
  FirebaseStorage,
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage'
import { AddPostType } from '../types/post.type'
import { generateFirebaseFilename, getTypeOfFile } from '../utils/post.util'
import { getSizeOfFile } from '../utils/file.util'

class MyFirebase {
  private firebaseApp: FirebaseApp
  private firebaseAuth: Auth
  private confirmationResult: ConfirmationResult | null
  private recaptchaVerifier: RecaptchaVerifier | null
  private storage: FirebaseStorage

  constructor() {
    this.firebaseApp = initializeApp(firebaseConfig)
    this.firebaseAuth = getAuth(this.firebaseApp)

    this.storage = getStorage(this.firebaseApp)

    this.recaptchaVerifier = null
    this.confirmationResult = null
  }

  getFirebaseAuth = () => this.firebaseAuth

  setRecaptchaVerifier = (recaptcha: any) => {
    this.recaptchaVerifier = recaptcha
  }

  getRecaptchaVerifier = () => this.recaptchaVerifier

  setConfirmationResult = (confirmResult: any) => {
    this.confirmationResult = confirmResult
  }

  getConfirmationResult = () => this.confirmationResult

  generateRecaptchatVerifier = (captchaPopupElementId: string) => {
    this.recaptchaVerifier = new RecaptchaVerifier(
      captchaPopupElementId,
      {
        size: 'invisible',
        callback: () => {},
      },
      this.firebaseAuth
    )
  }

  sendFirebaseAuthOTP = (
    phone: string,
    resolve?: Function,
    reject?: Function
  ) => {
    signInWithPhoneNumber(
      this.firebaseAuth,
      DEFAULT_PREFIX_PHONE_NUMBER + phone,
      this.recaptchaVerifier as RecaptchaVerifier
    )
      .then((confirmationResult: ConfirmationResult) => {
        this.confirmationResult = confirmationResult
        if (resolve) resolve()
      })
      .catch(() => {
        if (reject) reject()
      })
  }

  confirmFirebaseAuthOTP = (
    OTP: string,
    resolve: Function,
    reject?: Function
  ) => {
    this.confirmationResult
      ?.confirm(OTP)
      .then(() => {
        resolve()
      })
      .catch(() => {
        if (reject) reject()
      })
  }

  uploadFile = async (
    userId: string,
    file: File,
    handleUploaded: Function,
    handleUploading?: Function
  ) => {
    try {
      const fileRef = ref(this.storage, generateFirebaseFilename(file.name))

      const uploadTask = uploadBytesResumable(fileRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (handleUploading) handleUploading()
        },
        (err) => console.log(err),
        async () => {
          const dowloadUrl = await getDownloadURL(uploadTask.snapshot.ref)

          const data: AddPostType = {
            fileName: file.name,
            fileUrl: dowloadUrl,
            type: getTypeOfFile(file.name),
            userId,
            fileSize: getSizeOfFile(file),
          }

          handleUploaded(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
}

const FirebaseService = new MyFirebase()

export default FirebaseService
