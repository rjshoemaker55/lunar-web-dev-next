import { getAllPostSlugs, getAllPosts } from '../lib/api'

const blog = () => {
  return (
    <div>
      hello
    </div>
  )
}

export default blog

export async function getStaticPaths() {
  const allPostSlugs = await getAllPosts()

  // console.log(allPostSlugs)
}