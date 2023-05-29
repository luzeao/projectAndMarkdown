

// 字符串字面量类型
// 用来约束取值只能是某几个字符串中的一个

type EventNames = 'click' | 'mouseenter' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {

}

handleEvent(document.getElementById('#app') as Element, 'click')
handleEvent(document.getElementById('#app') as Element, 'mouseenter')
handleEvent(document.getElementById('#app') as Element, 'mousemove')
// handleEvent(document.getElementById('#app') as Element, 'dblclick')  // 会报错







export default {}