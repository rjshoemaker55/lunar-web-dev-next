import { getAllPostSlugs } from '../lib/api'

const blog = () => {
  return (
    <div>
      hello
    </div>
  )
}

export default blog

export const getStaticPaths = async () => {
  const allPostSlugs = await getAllPostSlugs()

  // console.log(allPostSlugs)
}