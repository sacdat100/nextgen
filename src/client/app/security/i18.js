"use strict";

let content = [
    {"lang":"0",
        "formlabels":{"greeting": "Welcome","groupID" : "Group ID", "loginID": "User ID", "password":"Password","language":"Language", "remember":"Remember Me", "submit":"Login","cancel": "Reset"},
        "formMessages":{"groupID" : "Group ID must be between 6 to 32 characters", "loginID": "User ID must be between 6 to 32 characters", "password":"Password must be between 8 to 24 alphanumeric"},
        "formValidations":{"groupID_minLength": 6, "groupID_maxLength": 32, "loginID_minLength": 6, "loginID_maxLength": 32, "password_minLength": 6, "password_maxLength": 32 }
    },
    {"lang":"1",
        "formlabels":{"greeting": "欢迎！", "groupID" : "集团代码", "loginID": "用户代码","password" : "密码","langauge":"语言","remember":"记住我", "submit": "登录", "cancel": "取消"},
        "formMessages":{ "groupID" : "此值是必填", "loginID": "此值是必填", "password" : "此值是必填" },
        "formValidations":{"groupID_minLength": 6, "groupID_maxLength": 32, "loginID_minLength": 6, "loginID_maxLength": 32, "password_minLength": 6, "password_maxLength": 32 }
    }
];



let i18 = {
    getContent(language){
        let lang = language;
        let selcontent = [];
        content.forEach(function (con) {
                if (con.lang === lang) {
                    selcontent.push(con);
                }
            });
        if(selcontent.length === 0) {
            selcontent.push(content[0]);
            console.log("Selected Langauge not configured so defaulting to english");
        }
        return selcontent;
    }
};

module.exports = i18;