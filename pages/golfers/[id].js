import { useRouter } from 'next/router'

import useUser from '../../lib/useUser'
import useUserScores from '../../lib/useUserScores'
import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'

const GolferPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { user, error: errorUser } = useUser(id)
  const { scores, error: errorScores } = useUserScores(id)

  return (
    <>
      <Layout>
        { errorUser ? (
          errorUser
        ) : (
          <>
            { user && (
              <div className="text-2xl">
                <h1>{user.name}</h1>
              </div>
            )}
          </>
        )}
        <ul>
          <>
            {errorScores ? (
              errorScores
            ) : (
              <>
                {scores && scores.map(score => (
                  <ScoreCard
                    key={score.id}
                    id={score.id}
                    totalScore={score.total_score}
                    playedAt={score.played_at}
                    userId={user.id}
                    userName={user.name}
                  />
                ))}
              </>
            )}
          </>
        </ul>
      </Layout>
    </>
  )
}

export default GolferPage
