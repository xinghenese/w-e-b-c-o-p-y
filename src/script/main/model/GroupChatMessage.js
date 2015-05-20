/**
 * Created by Administrator on 2014/12/29.
 */
define(['../base/Base', '../utils/CommonUtils', './ChatMessageTemplate'], function(Base, CommonUtils, ChatMessage){
    return ({
        intGroupId:     CommonUtils.INT_NOT_SET,
        strGroupName:   CommonUtils.STRING_NOT_SET,
        bBeAt:          CommonUtils.BOOLEAN_NOT_SET
    }).merge(ChatMessage);
});