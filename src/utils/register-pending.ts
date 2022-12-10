import { RegisterFormData } from '../types/auth.type'

class PendingRegisterAccount {
  pendingAccount: RegisterFormData | null

  constructor() {
    this.pendingAccount = null
  }

  getPendingAccount = () => this.pendingAccount

  setPendingAccount = (pendingAccount: RegisterFormData) =>
    (this.pendingAccount = pendingAccount)

  clearPendingAccount = () => (this.pendingAccount = null)
}

const PendingAccount = new PendingRegisterAccount()

export default PendingAccount
