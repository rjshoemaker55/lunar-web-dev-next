const API_URL = process.env.WP_API_URL

export async function fetchAPI(query, variables = {}) {
  const headers = { 'Content-Type': 'application/json' }

  console.log(`query: ${query}`)

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({query, variables})
  })

  console.log(`res: ${JSON.stringify(res)}`)

  const json = await res.json()

  if (json.errors) {
    console.log(json.errors)
    console.log('Error Details: ', query, variables)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export const getAllPosts = async (preview) => {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20) {
        edges {
          node {
            id
            date
            title
            slug
          }
        }
      }
    }
    `
  )

  console.log(`data: ${data}`)
  return data?.posts
}

export const getAllPostSlugs = async () => {
  const data = await fetchAPI(
    `
    {
      posts {
        edges {
          node {
            slug
          }
        }
      }
    }
    `
  )
  return data?.posts
}

const getPost = async (slug) => {
  const data = await fetchAPI(
    `
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
      }
    }
    `,
    {
      variables: {
        id: slug,
        idType: 'SLUG'
      }
    }
  )

  return data
}