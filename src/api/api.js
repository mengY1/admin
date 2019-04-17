import instance from '@/utils/axios.js'
import { baseApi } from "@/utils/common";
// 登录
export function login(params) {
  return instance.post(`${baseApi}/auth/login`, params).then(res => res.data);
}
// 退出登录
export function outLogin(params) {
  return instance.post(`${baseApi}/auth/logout`, params).then(res => res.data);
}
// banner列表
export function bannersList(page, pagesize) {
  return instance.get(`${baseApi}/admin/banners?page=${page}&pagesize=${pagesize}`).then(res => res.data);
}
// banner详情
export function bannersInfo(params, banner_id) {
  return instance.get(`${baseApi}/admin/banners/${banner_id}`, params).then(res => res.data);
}
// banner添加
export function bannersAdd(params) {
  return instance.post(`${baseApi}/admin/banners`, params).then(res => res.data);
}
// banner删除
export function bannersDelete(params, banner_id) {
  return instance.delete(`${baseApi}/admin/banners/${banner_id}`, params);
}
// banner编辑
export function bannersEdit(params, banner_id) {
  return instance.put(`${baseApi}/admin/banners/${banner_id}`, params);
}
// 意见反馈
export function feedback(type, page, pagesize) {
  if (type) {
    return instance.get(`${baseApi}/feedbacks?type=${type}&page=${page}&pagesize=${pagesize}`);
  } else {
    return instance.get(`${baseApi}/feedbacks?page=${page}&pagesize=${pagesize}`);
  }
}
// 账号信息
export function getUserInfo() {
  return instance.get(`${baseApi}/admin/account`).then(res => res.data);
}
// 修改密码
export function changePassword(params) {
  return instance.post(`${baseApi}/auth/reset-password`, params).then(res => res.data);
}
// 图形验证码
export function imageProving() {
  return instance.post(`${baseApi}/auth/captcha`)
}
// 用户列表
export function getConsumer(account, cms_school_name, created_start_at, created_end_at, is_full, page, pagesize, imp, is_chief, school_id, source) {
  if (account || cms_school_name || created_start_at || created_end_at || is_full || is_full == 0) {
    if (created_start_at == undefined || created_end_at == undefined) {
      return instance.get(`${baseApi}/admin/users?keyword=${account}&school_name=${cms_school_name}&is_full=${is_full}&page=${page}&pagesize=${pagesize}&import=${imp}&is_chief=${is_chief}&school_id=${school_id}&source=${source}`)
    } else {
      return instance.get(`${baseApi}/admin/users?keyword=${account}&school_name=${cms_school_name}&created_start_at=${created_start_at}&created_end_at=${created_end_at}&is_full=${is_full}&page=${page}&pagesize=${pagesize}&import=${imp}&is_chief=${is_chief}&school_id=${school_id}&source=${source}`)
    }
  } else {
    return instance.get(`${baseApi}/admin/users?page=${page}&pagesize=${pagesize}&import=${imp}&is_chief=${is_chief}&school_id=${school_id}&source=${source}`)
  }

}
// 用户来源
export function getUserFrom() {
  return instance.get(`${baseApi}/user/source`)
}
//订阅总数
export function getSubscribeTotal(user_id, page, pagesize, created_start_at, created_end_at, keyword) {
  return instance.get(`${baseApi}/admin/users/${user_id}/invite_subscription_logs?page=${page}&pagesize=${pagesize}&created_start_at=${created_start_at}&created_end_at=${created_end_at}&keyword=${keyword}`)
}
//有效订阅订阅
export function getEffectiveSubscribe(user_id, page, pagesize, created_start_at, created_end_at, keyword) {
  return instance.get(`${baseApi}/admin/users/${user_id}/invite_subscription_effective_logs?page=${page}&pagesize=${pagesize}&created_start_at=${created_start_at}&created_end_at=${created_end_at}&keyword=${keyword}`)
}
//注册
export function getRegisterData(user_id, page, pagesize, created_start_at, created_end_at, keyword) {
  return instance.get(`${baseApi}/admin/users/${user_id}/invite_register_logs?page=${page}&pagesize=${pagesize}&created_start_at=${created_start_at}&created_end_at=${created_end_at}&keyword=${keyword}`)
}
// 社团列表
export function getClubList(keyword, cms_school_name, created_start_at, created_end_at, is_full, page, pagesize, order_by, operation_status, imp) {
  if (keyword || cms_school_name || created_start_at || created_end_at || is_full || is_full == 0) {
    if (created_start_at == undefined || created_end_at == undefined) {
      return instance.get(`${baseApi}/admin/orgs?keyword=${keyword}&school_name=${cms_school_name}&org_status=${is_full}&page=${page}&pagesize=${pagesize}&order_by=${order_by}&operation_status=${operation_status}&import=${imp}`)
    } else {
      return instance.get(`${baseApi}/admin/orgs?keyword=${keyword}&school_name=${cms_school_name}&created_start_at=${created_start_at}&created_end_at=${created_end_at}&org_status=${is_full}&page=${page}&pagesize=${pagesize}&order_by=${order_by}&operation_status=${operation_status}&import=${imp}`)
    }
  } else {
    return instance.get(`${baseApi}/admin/orgs?page=${page}&pagesize=${pagesize}&order_by=${order_by}&operation_status=${operation_status}&import=${imp}`)
  }

}
//社团详情
export function getClubDetailInfo(org_id) {
  return instance.get(`${baseApi}/admin/orgs/${org_id}`)
}
// 社团审核列表
export function getClubTrialList(keyword, cms_school_name, created_start_at, created_end_at, is_full, page, pagesize) {
  if (keyword || cms_school_name || created_start_at || created_end_at || is_full || is_full == 0) {
    if (created_start_at == undefined || created_end_at == undefined) {
      return instance.get(`${baseApi}/admin/org/claims?keyword=${keyword}&school_name=${cms_school_name}&audit_status=${is_full}&page=${page}&pagesize=${pagesize}`)
    } else {
      return instance.get(`${baseApi}/admin/org/claims?keyword=${keyword}&school_name=${cms_school_name}&created_start_at=${created_start_at}&created_end_at=${created_end_at}&audit_status=${is_full}&page=${page}&pagesize=${pagesize}`)
    }
  } else {
    return instance.get(`${baseApi}/admin/org/claims?page=${page}&pagesize=${pagesize}`)
  }

}
//社团审核详情
export function getClubTrialDetailInfo(org_claim_id) {
  return instance.get(`${baseApi}/admin/org/claims/${org_claim_id}`)
}
// 社团审核操作
export function clubTrial(org_claim_id, params) {
  return instance.put(`${baseApi}/admin/org/claims/${org_claim_id}`, params)
}
// 删除社团
export function deleteClub(org_id) {
  return instance.delete(`${baseApi}/admin/orgs/${org_id}`)
}
// 活动列表
export function getActivityList(page, pagesize, keyword, org_name, school_name, line_status, status, order_by, imp, cms_city_id, act_type, top_status, publish_start_at, publish_end_at, publisher) {
  return instance.get(`${baseApi}/admin/activities?page=${page}&pagesize=${pagesize}&keyword=${keyword}&org_name=${org_name}&school_name=${school_name}&line_status=${line_status}&status=${status}&order_by=${order_by}&import=${imp}&pagesize=${pagesize}&cms_city_id=${cms_city_id}&act_type=${act_type}&top_status=${top_status}&publish_start_at=${publish_start_at}&publish_end_at=${publish_end_at}&publisher=${publisher}`)
}
//活动地区数据接口
export function getAreaList() {
  return instance.get(`${baseApi}/citys`)
}
// 活动上下架
export function actPut(act_id, params) {
  return instance.put(`${baseApi}/admin/activities/${act_id}/line`, params)
}
// 活动置顶
export function actStick(act_id, params) {
  return instance.post(`${baseApi}/admin/activities/${act_id}/top`, params)
}
// 活动详情
export function activityDetail(act_id) {
  return instance.get(`${baseApi}/admin/activities/${act_id}`)
}
// 活动人气调整
export function adjustPopularity(act_id, params) {
  return instance.put(`${baseApi}/admin/activities/${act_id}/popularity`, params)
}
// 活动报名列表
export function getApplyList(act_id) {
  return instance.get(`${baseApi}/admin/activities/${act_id}/members`)
}
// 活动审核
export function activityTrial(act_id, params) {
  return instance.post(`${baseApi}/admin/activities/${act_id}/audit`, params)
}
// 活动举报列表
export function activityReportList(keyword, report_type, page, pagesize) {
  return instance.get(`${baseApi}/admin/reports?keyword=${keyword}&&report_type=${report_type}&page=${page}&pagesize=${pagesize}`)
}
// 社团编辑
export function clubEdit(org_id, params) {
  return instance.put(`${baseApi}/admin/orgs/${org_id}`, params)
}
// 添加社团
export function addClub(params) {
  return instance.post(`${baseApi}/admin/orgs`, params)
}
// 获取社团类型
export function getClubType() {
  return instance.get(`${baseApi}/org/types`)
}
// 学校检索
export function getSchoolId(schoolName) {
  return instance.get(`${baseApi}/cms/schools?keyword=${schoolName}&page=1&pagesize=10000`)
}
// 添加活动
export function addAct(org_id, params) {
  return instance.post(`${baseApi}/admin/orgs/${org_id}/activities`, params)
}
// 活动编辑
export function actEdit(activities_id, params) {
  return instance.put(`${baseApi}/admin/activities/${activities_id}`, params)
}
// 删除活动
export function actDelete(activities_id) {
  return instance.delete(`${baseApi}/admin/activities/${activities_id}`)
}
// 日报列表
export function getDailyList(page, pagesize, top_status, line_status, publish_start_at, publish_end_at, title, publisher) {
  return instance.get(`${baseApi}/admin/news?page=${page}&pagesize=${pagesize}&top_status=${top_status}&line_status=${line_status}&publish_start_at=${publish_start_at}&publish_end_at=${publish_end_at}&title=${title}&publisher=${publisher}`)
}
// 添加日报
export function addDaily(params) {
  return instance.post(`${baseApi}/admin/news`, params)
}
// 日报详情
export function getDailyDetail(news_id) {
  return instance.get(`${baseApi}/admin/news/${news_id}`)
}
//订阅管理列表
export function getDailyFollowList(type, page, pagesize) {
  return instance.get(`${baseApi}/admin/subscriptions?type=${type}&page=${page}&pagesize=${pagesize}`)
}
// 订阅统计
export function getFollowStatistics() {
  return instance.get(`${baseApi}/admin/subscriptions/statistics`)
}
// 日报编辑
export function dailyEdit(news_id, params) {
  return instance.put(`${baseApi}/admin/news/${news_id}`, params)
}
// 删除日报
export function deleteDailyI(news_id) {
  return instance.delete(`${baseApi}/admin/news/${news_id}`)
}
// 日报上下架
export function dailyUpAndLow(news_id) {
  return instance.post(`${baseApi}/admin/news/${news_id}/line`)
}
// 日报置顶
export function dailyStick(news_id) {
  return instance.post(`${baseApi}/admin/news/${news_id}/top`)
}
// 奇集大学列表
export function getUniversityList(page, pagesize, title, line_status, publisher, top_status, created_start_at, created_end_at, university_type_id) {
  return instance.get(`${baseApi}/admin/universities?page=${page}&pagesize=${pagesize}&title=${title}&line_status=${line_status}&publisher=${publisher}&top_status=${top_status}&created_start_at=${created_start_at}&created_end_at=${created_end_at}&university_type_id=${university_type_id}`)
}
// 奇集大学添加
export function addUniversityText(params) {
  return instance.post(`${baseApi}/admin/universities`, params)
}
// 奇集大学详情
export function getUniversityDetail(university_id) {
  return instance.get(`${baseApi}/admin/universities/${university_id}`)
}
// 奇集大学编辑
export function editCollege(university_id, params) {
  return instance.put(`${baseApi}/admin/universities/${university_id}`, params)
}
// 奇集大学删除
export function deleteCollege(university_id) {
  return instance.delete(`${baseApi}/admin/universities/${university_id}`)
}
// 奇集大学上下架
export function collegeUpAndLow(university_id) {
  return instance.post(`${baseApi}/admin/universities/${university_id}/line`)
}
// 奇集大学置顶
export function collegeStick(university_id) {
  return instance.post(`${baseApi}/admin/universities/${university_id}/top`)
}
// 学校列表数据
export function getSchoolList(page, pagesize, schoolName, imp) {
  return instance.get(`${baseApi}/admin/count/cms/schools?page=${page}&pagesize=${pagesize}&schoolName=${schoolName}&import=${imp}`)
}
// 推荐管理列表
export function getRecommendList() {
  return instance.get(`${baseApi}/admin/recommends`)
}
// 保存推荐设置
export function saveSetting(params) {
  return instance.put(`${baseApi}/admin/recommend/lists/batch`, params)
}
// 保存内容管理权重设置
export function saveTabSetting(params) {
  return instance.put(`${baseApi}/admin/recommend/tabs/batch`, params)
}
// 求职活动编辑
export function jobEdit(activities_id, params) {
  return instance.put(`${baseApi}/admin/job/activities/${activities_id}`, params)
}
// 考研活动编辑
export function graduateEdit(activities_id, params) {
  return instance.put(`${baseApi}/admin/graduate/activities/${activities_id}`, params)
}
// 学术活动编辑
export function academicEdit(activities_id, params) {
  return instance.put(`${baseApi}/admin/academic/activities/${activities_id}`, params)
}
// 竞赛活动编辑
export function competitionEdit(activities_id, params) {
  return instance.put(`${baseApi}/admin/competition/activities/${activities_id}`, params)
}
// 本校列表
export function getOwnSchoolList(page, pagesize, title, line_status, top_status, created_start_at, created_end_at) {
  return instance.get(`${baseApi}/admin/ugcs/?page=${page}&pagesize=${pagesize}&title=${title}&line_status=${line_status}&top_status=${top_status}&created_start_at=${created_start_at}&created_end_at=${created_end_at}`)
}
// 本校详情
export function ownSchoolDetail(ugc_id) {
  return instance.get(`${baseApi}/admin/ugcs/${ugc_id}`)
}
// 添加本校
export function addOwnSchool(params) {
  return instance.post(`${baseApi}/admin/ugcs`, params)
}
// 编辑本校
export function editOwnSchool(ugc_id, params) {
  return instance.put(`${baseApi}/admin/ugcs/${ugc_id}`, params)
}
// 删除本校
export function deleteOwnSchool(ugc_id) {
  return instance.delete(`${baseApi}/admin/ugcs/${ugc_id}`)
}
// 本校上下架
export function ownSchoolUpAndLow(ugc_id) {
  return instance.post(`${baseApi}/admin/ugcs/${ugc_id}/line`)
}
// 本校置顶
export function ownSchoolTop(ugc_id) {
  return instance.post(`${baseApi}/admin/ugcs/${ugc_id}/top`)
}
// 干货分类列表
export function getDriedFoodList(page, pagesize) {
  return instance.get(`${baseApi}/admin/universities/types?page=${page}&pagesize=${pagesize}`)
}
// 干货分类添加
export function addDriedFoodType(params) {
  return instance.post(`${baseApi}/admin/universities/types`, params)
}
// 干货分类编辑
export function editDriedFoodType(university_type_id, params) {
  return instance.put(`${baseApi}/admin/universities/types/${university_type_id}`, params)
}
// 干货分类删除
export function deleteDriedFoodType(university_type_id) {
  return instance.delete(`${baseApi}/admin/universities/types/${university_type_id}`)
}
// 干货分类详情
export function getDriedFoodTypeDetail(university_type_id) {
  return instance.get(`${baseApi}/admin/universities/types/${university_type_id}`)
}
// 草稿列表
export function getDraftList(type, page, pagesize) {
  return instance.get(`${baseApi}/admin/drafts?type=${type}&page=${page}&pagesize=${pagesize}`)
}
// 草稿创建
export function addDraft(params) {
  return instance.post(`${baseApi}/admin/drafts`, params)
}
// 草稿详情
export function draftDetail(draft_id) {
  return instance.get(`${baseApi}/admin/drafts/${draft_id}`)
}
// 删除草稿
export function deleteDraft(draft_id) {
  return instance.delete(`${baseApi}/admin/drafts/${draft_id}`)
}
// 更新草稿
export function updateDraft(draft_id, params) {
  return instance.put(`${baseApi}/admin/drafts/${draft_id}`, params)
}
// 走心列表
export function getTekeHeartList(page, pagesize, top_status, line_status, publish_start_at, publish_end_at, title, publisher) {
  return instance.get(`${baseApi}/admin/heart_news?page=${page}&pagesize=${pagesize}&top_status=${top_status}&line_status=${line_status}&publish_start_at=${publish_start_at}&publish_end_at=${publish_end_at}&title=${title}&publisher=${publisher}`)
}
// 走心添加
export function addTakeHeart(params) {
  return instance.post(`${baseApi}/admin/heart_news`, params)
}
// 走心详情
export function getTakeHeartDetail(heart_id) {
  return instance.get(`${baseApi}/admin/heart_news/${heart_id}`)
}
// 走心编辑
export function takeHeartEdit(heart_id, params) {
  return instance.put(`${baseApi}/admin/heart_news/${heart_id}`, params)
}
// 删除走心
export function deleteTakeHeart(heart_id) {
  return instance.delete(`${baseApi}/admin/heart_news/${heart_id}`)
}
// 走心上下架
export function takeHeartUpAndLow(heart_id) {
  return instance.post(`${baseApi}/admin/heart_news/${heart_id}/line`)
}
// 走心置顶
export function takeHeartStick(heart_id) {
  return instance.post(`${baseApi}/admin/heart_news/${heart_id}/top`)
}
// 策划列表
export function getPlanList(page, pagesize, top_status, line_status, publish_start_at, publish_end_at, title, publisher) {
  return instance.get(`${baseApi}/admin/schemes?page=${page}&pagesize=${pagesize}&top_status=${top_status}&line_status=${line_status}&publish_start_at=${publish_start_at}&publish_end_at=${publish_end_at}&title=${title}&publisher=${publisher}`)
}
// 策划添加
export function addPlan(params) {
  return instance.post(`${baseApi}/admin/schemes`, params)
}
// 策划详情
export function getPlanDetail(scheme_id) {
  return instance.get(`${baseApi}/admin/schemes/${scheme_id}`)
}
// 策划编辑
export function planEdit(scheme_id, params) {
  return instance.put(`${baseApi}/admin/schemes/${scheme_id}`, params)
}
// 策划删除
export function deletePlan(scheme_id) {
  return instance.delete(`${baseApi}/admin/schemes/${scheme_id}`)
}
// 策划上下架
export function planUpAndLow(scheme_id) {
  return instance.post(`${baseApi}/admin/schemes/${scheme_id}/line`)
}
// 策划置顶
export function planStick(scheme_id) {
  return instance.post(`${baseApi}/admin/schemes/${scheme_id}/top`)
}
// 策划分类列表
export function getPlanTypeList() {
  return instance.get(`${baseApi}/admin/schemes/types`)
}
// 策划分类添加
export function addPlanType(params) {
  return instance.post(`${baseApi}/admin/schemes/types`, params)
}
// 策划分类编辑
export function editPlanType(scheme_type_id, params) {
  return instance.put(`${baseApi}/admin/schemes/types/${scheme_type_id}`, params)
}
// 策划分类删除
export function deletePlanType(scheme_type_id) {
  return instance.delete(`${baseApi}/admin/schemes/types/${scheme_type_id}`)
}
// 策划分类详情
export function getPlanTypeDetail(scheme_type_id) {
  return instance.get(`${baseApi}/admin/schemes/types/${scheme_type_id}`)
}