import { Post, Comment } from '~/models'

export interface IPostDetailState {
  post: Post | null
  comments: Comment[] | null
}
