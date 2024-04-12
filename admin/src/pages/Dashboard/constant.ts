export interface AnalyticsState {
  profile: {
    all: number,
    live: number,
    die: number,
    pending: number
  },
  account: {
    all: number,
    live: number,
    die: number,
    pending: number
  },
  automation: {
    script: number,
    task: number,
  },
  website: number,
  article: number,
  channel: number,
  playlist: number,
  video: number,
  proxy: number,
  vps: number,
  extension: number,
  keyword: number,
}