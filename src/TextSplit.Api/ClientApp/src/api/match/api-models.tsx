export interface MatchRequest {
  text: string
  subText: string
}

export interface MatchResponse {
  matchCharacterPositions: number[]
}