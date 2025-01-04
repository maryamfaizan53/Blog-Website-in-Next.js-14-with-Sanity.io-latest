import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../../sanity/lib/client' // your configured sanity client

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, comment, postId } = JSON.parse(req.body)

    // Sanity create
    await client.create({
      _type: 'comment',
      name,
      email,
      comment,
      post: {
        _type: 'reference',
        _ref: postId,
      },
    })

    return res.status(200).json({ message: 'Comment submitted' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error submitting comment', error })
  }
}
