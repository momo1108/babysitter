import {ON_LOGGED, OFF_LOGGED, SET_USER, OPEN_ALERT, CLOSE_ALERT, PASS_ID } from './actionTypes';
export const onLoggedAction = () => ({ 
    type: ON_LOGGED,
    logged: true
});
export const offLoggedAction = () => ({ 
    type: OFF_LOGGED,
    logged: false
});
export const setUserAction = (user) => ({ 
    type: SET_USER,
    user
});
/**
 * 경고창 열기
 * @author : jskpubller86 
 * @param(object) : alert 
 * @version : 1.0
 **/
export const openAlertAction = (alert) => ({ 
    type: OPEN_ALERT,
    alert
});
/**
 * 경고창 닫기
 * @author : jskpubller86 
 * @version : 1.0
 **/
export const closeAlertAction = () => ({ 
    type: CLOSE_ALERT,
});

/**
 * 상세페이지 id값 패스
 * @author : momo1108
 * @version : 1.0
 **/
export const passIdAction = (id) => ({
    type: PASS_ID,
    payload: id
})