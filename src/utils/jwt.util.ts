import jwtDecode, { JwtPayload } from 'jwt-decode'
import { REFRESH_TOKEN_API } from '../constants/api.constant'
import { LoginSuccessType } from '../types/auth.type'
import http from './http.util'

class Jwt {
  private inMemoryAccessToken: string | null
  private getNewAccessTokenTimeoutId: number | null
  private currentUserID: string | null

  constructor() {
    this.inMemoryAccessToken = null
    this.getNewAccessTokenTimeoutId = null
    this.currentUserID = null
  }

  getInMemoryAccessToken = () => this.inMemoryAccessToken

  getCurrentUserId = () => this.currentUserID

  killAllToken = () => {
    this.inMemoryAccessToken = null

    if (this.getNewAccessTokenTimeoutId) {
      window.clearTimeout(this.getNewAccessTokenTimeoutId)
    }

    return true
  }

  getNewAccessToken = async () => {
    try {
      const response = await http.get<LoginSuccessType>(REFRESH_TOKEN_API)

      this.inMemoryAccessToken = response.data.accessToken

      return response.data.user
    } catch (error) {
      this.killAllToken()
      return null
    }
  }

  setAccessToken = (accessToken: string) => {
    this.inMemoryAccessToken = accessToken

    const { userId, exp, iat } = jwtDecode<JwtPayload & { userId: string }>(
      accessToken
    )

    this.currentUserID = userId

    this.startGetNewAccessTokenLoop((exp as number) - (iat as number))

    return true
  }

  private startGetNewAccessTokenLoop = (delay: number) => {
    this.getNewAccessTokenTimeoutId = window.setInterval(
      this.getNewAccessToken,
      delay * 1000 - 5000
    )
  }
}

const JwtManager = new Jwt()

export default JwtManager
