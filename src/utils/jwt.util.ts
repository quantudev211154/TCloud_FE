import jwtDecode, { JwtPayload } from 'jwt-decode'
import { REFRESH_TOKEN_API } from '../constants/api.constant'
import { LoginSuccessType } from '../types/auth.type'
import http from './http.util'

class Jwt {
  private inMemoryAccessToken: string | null
  private getNewAccessTokenIntervalId: number | null

  constructor() {
    this.inMemoryAccessToken = null
    this.getNewAccessTokenIntervalId = null
  }

  getInMemoryAccessToken = () => this.inMemoryAccessToken

  killAllToken = () => {
    delete http.defaults.headers.common['Authorization']

    this.inMemoryAccessToken = null

    if (this.getNewAccessTokenIntervalId) {
      window.clearInterval(this.getNewAccessTokenIntervalId)

      this.getNewAccessTokenIntervalId = null
    }

    return true
  }

  getNewAccessToken = async () => {
    try {
      const response = await http.get<LoginSuccessType>(REFRESH_TOKEN_API)

      this.setAccessToken(response.data.accessToken)

      return response.data.user
    } catch (error) {
      this.killAllToken()
      return null
    }
  }

  setAccessToken = (accessToken: string) => {
    this.inMemoryAccessToken = accessToken

    http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

    const { exp, iat } = jwtDecode<JwtPayload>(accessToken)

    this.startGetNewAccessTokenLoop((exp as number) - (iat as number))

    return true
  }

  private startGetNewAccessTokenLoop = (delay: number) => {
    if (!this.getNewAccessTokenIntervalId) {
      this.getNewAccessTokenIntervalId = window.setInterval(
        this.getNewAccessToken,
        delay * 1000 - 5000
      )
    }
  }
}

const JwtManager = new Jwt()

export default JwtManager
