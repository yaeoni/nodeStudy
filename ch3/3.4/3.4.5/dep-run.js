/*  순환 참조, circular dependency 
 *  이러한 경우에는 순환 참조되는 대상을 빈 객체로 만든다. */

const dep1 = require('./dep1');
const dep2 = require('./dep2');

dep1();
dep2();