const API_URL = process.env.WP_API_URL

export const fetchAPI = async (query, {variables} = {}) => {
  const headers = { 'Content-Type': 'application/json' }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({query, variables})
  })

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
      posts(first: 20, where: { orderby: { field: DATA, order: DESC}}) {
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

console.log(getAllPostSlugs())


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