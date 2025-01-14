import { Button, Frog } from 'frog'
import { type NeynarVariables, neynar } from 'frog/middlewares'

export const app = new Frog<{
  Variables: NeynarVariables
}>()

app.use(
  neynar({
    apiKey: 'NEYNAR_FROG_FM',
    features: ['interactor', 'cast'],
  }),
)

app.frame('/', (c) => {
  return c.res({
    action: '/guess',
    image: (
      <div
        style={{
          alignItems: 'center',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          fontSize: 48,
          height: '100%',
          width: '100%',
        }}
      >
        I can guess your name and follower count.
      </div>
    ),
    intents: [<Button>Go on</Button>],
  })
})

app.frame('/guess', (c) => {
  const { displayName, followerCount } = c.var.interactor || {}
  console.log('interactor: ', c.var.interactor)
  console.log('cast: ', c.var.cast)
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          fontSize: 48,
          height: '100%',
          width: '100%',
        }}
      >
        Greetings {displayName}, you have {followerCount} followers.
      </div>
    ),
  })
})
