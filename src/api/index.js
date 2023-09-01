import { get, post } from '@/utils/http/index'

export default {
  getUser: (params) => get('/user', params),
  // refreshToken: () => request().post('/auth/refreshToken', null, { noNeedTip: true }),
  getTag: (params) =>
    get('/api/trpc/tag.getFrequentTags,tag.homeTags,prompt.getPrompts,prompt.getPrompts', {
      ...params,
    }),
  getUserProfile: (params) => get('/api/trpc/user.getUserProfile,user.getUserCredit', params),
  getPrompts: (params) => get('/api/trpc/prompt.getPrompts,prompt.getPrompts?batch=1', params),

  /* 获取prompts详情 */
  getPromptsBuyId: (params) => get('/api/trpc/prompt.getById?batch=1', params),

  getPrompts2: (params) => get('/api/trpc/prompt.getPrompts?batch=1', params),

  session: (params) => get('/api/auth/session', params),
  /* 保存tag */
  updateUserOnboarding: (params) =>
    post('api/trpc/user.updateUserOnboarding?batch=1', { ...params }),
  /* 个人中心 */
  getAllUserInfo: (params) =>
    get(
      '/api/trpc/user.getUserProfile,follow.findFollowship,user.hasUserClaimedDailyCredit,user.hasUserCreditNum,user.getUserCredit?batch=1',
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
  addComment: (params) => post('/api/trpc/comment.insertComment?batch=1', { ...params }),
  /* prompt点赞 */
  upvotePrompt: (params) => post('/api/trpc/prompt.upvote?batch=1', { ...params }),
  /* prompt收藏 */
  savePrompt: (params) => post('/api/trpc/prompt.save?batch=1', { ...params }),
  /* 获取prompt点赞状态 */
  getUserUpvotedPrompt: (params) =>
    get(
      '/api/trpc/user.hasUserSavedPrompt,user.hasUserUpvotedPrompt,comment.getComments?batch=1',
      params
    ),
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
  /* 获取聊天列表 */
  getRecentConversations: (params) =>
    get('/api/trpc/conversation.getRecentConversations?batch=1', params),

  /* 聊天 */
  getChat: (params) => post('https://test.aigcopen.com/gpt/chat', { ...params }),
  conversationUpdate: (params) =>
    post('/api/trpc/user.subtractUserCredit,conversation.update?batch=1', params),
  conversationCreate: (params) =>
    post('/api/trpc/user.subtractUserCredit,conversation.create?batch=1', params),
  getChatToken: (params) => get('/api/auth/token', params),

  /* 讨论页面 */
  getDiscussionsTags: (params) =>
    get('/api/trpc/tag.getFrequentTags,tag.discussionsTags,discussion.getAll?batch=1', params),
  /* 社区点赞 */
  discussionUpvote: (params) => post('/api/trpc/discussion.upvote?batch=1', params),
  /* 新建讨论组 */
  createDiscussion: (params) => post('/api/trpc/discussion.create?batch=1', params),
  /*
   * 创建prompt相关接口
   */
  /* 获取tag */
  getFrequentTags: (params) =>
    get('/api/trpc/tag.getFrequentTags,bounty.getBountyOptions,tag.getAll?batch=1', params),
  /* 创建prompt */
  cretePrompt: (params) => post('/api/trpc/prompt.create?batch=1', params),
  /* 创建prompt=创建聊天 */
  createPromptchat: (params) => post('/api/trpc/conversation.create?batch=1', params),
  /* 创建prompt=更新聊天 */
  updatePromptchat: (params) => post('/api/trpc/conversation.update?batch=1', params),
  /* 更新用户信息 */
  updateUserCredit: (params) => post('/api/trpc/user.subtractUserCredit?batch=1', params),
  /* 每日任务认领token */
  claimDailyCredit: (params) => post('/api/trpc/user.claimDailyCredit?batch=1', params),
  /* 用户详情获取用户信息 */
  getEditUserInfo: (params) =>
    get('/api/trpc/user.getUserProfile,tag.userTags,user.getUserCredit?batch=1', params),
  /* 编辑用户信息 */
  updateUserInfo: (params) =>
    post('/api/trpc/user.removeUserLinks,user.updateUserProfile?batch=1', params),
}
