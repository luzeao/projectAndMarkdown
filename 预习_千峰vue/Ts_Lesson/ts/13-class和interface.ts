

// 什么是接口
// 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）
// TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述

// 类实现接口
// 实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性


// interface AnimalCommen {
//   name: string
//   age: number | string   // 只是添加了实例属性的类型限制 => 没有赋值
//   intro?(): void  // 添加小括号说明是函数 => 可选,并且是一个函数
// }

// class Dog implements AnimalCommen {
//   name;
//   age;

//   species: string = 'dog';  // 添加类型限制且赋值(class中直接创建的变量会存储到实例化对象上)
//   constructor(name: string, age: number | string) {
//     this.name = name
//     this.age = age
//   }
//   call() {
//     console.log('狗叫');
//   }
//   intro() {
//     console.log(this.name, this.age);
//   }
// }


// class Cat implements AnimalCommen {
//   name;
//   age;

//   species: string = 'dog';  // 添加类型限制且赋值(class中直接创建的变量会存储到实例化对象上)
//   constructor(name: string, age: number | string) {
//     this.name = name
//     this.age = age
//   }
//   call() {
//     console.log('喵');
//   }
//   intro() {
//     console.log(this.name, this.age);
//   }
// }


// 防盗门和车 => 都要有报警功能(多个类可以共用一个接口 => 复用,不复用无所谓)

// interface Alarm {
//   alert(): void;
// }

// class Door {
// }

// // 防盗门是门的子类,并且要有报警功能
// class SecurityDoor extends Door implements Alarm {
//   alert() {
//     console.log('SecurityDoor alert');
//   }
// }
// // 车也要有报警功能
// class Car implements Alarm {
//   alert() {
//     console.log('Car alert');
//   }
// }


// 一个类可以实现多个接口

// interface Alarm {
//   alert(): void;
// }

// interface LightControl {
//   on(): void;
//   off(): void;
// }


// class Car implements Alarm, LightControl {
//   alert() {
//     console.log('Car alert');
//   }

//   on() {
//     console.log('开灯了');
//   }

//   off() {
//     console.log('关灯了');
//   }
// }


// 接口继承接口

interface Alarm {
  alert(): void;
}

interface LightControl {
  on(): void;
  off(): void;
}

// 先继承父类的接口,再定义自己的
// interface LightControl extends Alarm {
//   on(): void;
//   off(): void;
// }

// interface all extends Alarm extends LightControl {}  // 不能连续继承(出现多个extends关键字)
interface All extends Alarm, LightControl {
  a: number
}  // 同时继承多个需要用逗号分隔

class Car implements All {
  a
  constructor(a: number) {
    this.a = a
  }
  alert() {
    console.log('Car alert');
  }

  on() {
    console.log('开灯了');
  }

  off() {
    console.log('关灯了');
  }
}








export default {}