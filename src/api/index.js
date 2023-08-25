import { get, post } from '@/utils/http/index'

export default {
  getUser: (params) => get('/user', params),
  // refreshToken: () => request().post('/auth/refreshToken', null, { noNeedTip: true }),
  getTag: (params) =>
    get('/api/trpc/tag.getFrequentTags,tag.homeTags,prompt.getPrompts,prompt.getPrompts', params),
  getUserProfile: (params) => get('/api/trpc/user.getUserProfile,user.getUserCredit', params),
  getPrompts: (params) => get('/api/trpc/prompt.getPrompts,prompt.getPrompts?batch=1', params),

  /* 获取prompts详情 */
  getPromptsBuyId: (params) => get('/api/trpc/prompt.getById?batch=1', params),

  getPrompts2: (params) => get('/api/trpc/prompt.getPrompts?batch=1', params),

  session: (params) => get('/api/auth/session?debug=1', params),
  /* 保存tag */
  updateUserOnboarding: (params) =>
    post('api/trpc/user.updateUserOnboarding?batch=1', { ...params }),
  /* 个人中心 */
  getAllUserInfo: (params) =>
    get(
      '/api/trpc/user.getUserProfile,follow.findFollowship,user.hasUserClaimedDailyCredit,user.hasUserCreditNum,user.getUserCredit?batch=1&debug=1',
      params
    ),
  /* 聊天 */
  getChatUserInfo: (params) =>
    get(
      '/api/trpc/user.getUserProfile,conversation.getRecentConversations,user.getUserCredit?batch=1',
      params
    ),
  /* 删除聊天 */
  delChat: (params) => post('/api/trpc/conversation.hideConversation?batch=1', { ...params }),
  /* 删除评论 */
  delComment: (params) => post('/api/trpc/comment.deleteComment?batch=1', { ...params }),
  /* 新增评论 */
  addComment: (params) => post('/api/trpc/comment.insertComment?batch=1&debug=1', { ...params }),
  /* 点赞接口 */
  upvoteComment: (params) => post('/api/trpc/comment.upvoteComment?batch=1', { ...params }),
  /* 分类集合 */
  getCollections: (params) =>
    get('/api/trpc/tag.getFrequentTags,collection.getCollections?batch=1', params),
  /* 分类集合详情 */
  getCollectionsDetail: (params) =>
    get(
      '/api/trpc/tag.getFrequentTags,user.getUserProfile,user.getUserFollowingsCount,user.getUserFollowersCount,follow.findFollowship,prompt.getPromptsByTags,collection.getFeaturedCollections?batch=1',
      params
    ),
  /* 赏金任务 */
  getBountyList: (params) =>
    get(
      '/api/trpc/tag.getFrequentTags,bounty.getFilteredBounties,bounty.getAllTags?batch=1',
      params
    ),
  /* 获取评论 */
  getCommentList: (params) => get('/api/trpc/comment.getComments?batch=1', params),
}
