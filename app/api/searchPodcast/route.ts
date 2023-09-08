import { NextResponse } from "next/server";
import { GraphQLClient, gql } from "graphql-request";
import fs from "fs";

// import api key from .env.local
const TADDY_API_KEY = process.env.TADDY_API_KEY;
const TADDY_USER_ID = process.env.TADDY_USER_ID;

async function taddyGraphqlRequest({
  query,
  variables,
}: {
  query: string;
  variables?: any;
}) {
  const endpointUrl = "https://api.taddy.org/";

  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "PodBrief",
    "X-USER-ID": TADDY_USER_ID,
    "X-API-KEY": TADDY_API_KEY,
  };

  try {
    const client = new GraphQLClient(endpointUrl, { headers });
    const data = await client.request(query, variables);
    return data;
  } catch (e) {
    console.error("inside sentTaddyGraphqlRequest", e);
  }
}

const SEARCH_FOR_TERM_QUERY = gql`
  query searchForTerm(
    $term: String
    $page: Int
    $limitPerPage: Int
    $filterForTypes: [TaddyType]
    $filterForCountries: [Country]
    $filterForLanguages: [Language]
    $filterForGenres: [Genre]
    $filterForSeriesUuids: [ID]
    $filterForNotInSeriesUuids: [ID]
    $isExactPhraseSearchMode: Boolean
    $isSafeMode: Boolean
    $searchResultsBoostType: SearchResultBoostType
  ) {
    searchForTerm(
      term: $term
      page: $page
      limitPerPage: $limitPerPage
      filterForTypes: $filterForTypes
      filterForCountries: $filterForCountries
      filterForLanguages: $filterForLanguages
      filterForGenres: $filterForGenres
      filterForSeriesUuids: $filterForSeriesUuids
      filterForNotInSeriesUuids: $filterForNotInSeriesUuids
      isExactPhraseSearchMode: $isExactPhraseSearchMode
      isSafeMode: $isSafeMode
      searchResultsBoostType: $searchResultsBoostType
    ) {
      searchId
      podcastSeries {
        uuid
        name
        imageUrl
        description
      }
    }
  }
`;

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const data = await taddyGraphqlRequest({
      query: SEARCH_FOR_TERM_QUERY,
      variables: {
        term: body.searchQuery,
        filterFortypes: ["PODCAST"],
        filterForLanguages: ["ENGLISH"],
      },
    });
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error("inside GET", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
