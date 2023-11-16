import { getBaseURL } from "@/lib/utils"

export async function fetchPodcasts(searchQuery: string) {
  const url = `${getBaseURL()}/api/searchPodcast`

  console.log('fetching', url)

  const res = await (
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery: searchQuery }),
    })
  ).json()
  console.log('res', res)
  return res.searchForTerm.podcastSeries
}
