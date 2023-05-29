

// es6的类
// class Dog {
//   species: 'dog';  // 值是定死的(class中声明的变量 也会存储到实例化对象上)
//   constructor(name, age) {  // 可以接收参数
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
// new Dog('tom',2)  // {name,age,species}

// es6的继承
// class Tianyuan extends Dog {
//   skill() {
//     console.log('看门');

//   }
// }


// es6+ts类型修饰
// class Dog {
//   name: string
//   age: number | string   // 只是添加了实例属性的类型限制 => 没有赋值

//   // 任意属性
//   // [propName: string]: number | string | (() => void)

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

// class Tianyuan extends Dog {
//   skill() {
//     console.log('看门');
//   }
// }


// Ts和类相关的修饰符
// TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。
// public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
// private 修饰的属性或方法是私有的，不能在声明它的类的外部访问(子类也不允许访问)
// protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
class Dog {
  public readonly name: string
  protected age: number | string   // 只是添加了实例属性的类型限制 => 没有赋值

  // 任意属性
  // [propName: string]: number | string | (() => void)

  species: string = 'dog';  // 添加类型限制且赋值(class中直接创建的变量会存储到实例化对象上)
  constructor(name: string, age: number | string) {
    this.name = name
    this.age = age
  }
  call() {
    console.log('狗叫');
  }
  intro() {// 调用此方法属于在内部取值,是可以用的
    console.log(this.name, this.age);
  }
}

// let wangcai = new Dog('旺财', 2)
// console.log(wangcai.name);
// // wangcai.name = '王' // 报错添加了readonly修饰符,无法被修改
// // console.log(wangcai.age);  // 在类的外部访问,报错
// wangcai.intro()


class Tianyuan extends Dog {
  skill() {
    // 如果是protected修饰符,虽然是私有的,但是在子类中是可以访问的
    console.log('多大啦' + this.age);  // 报错,添加了private修饰符,就算是继承的子类也不能访问父类中的私有属性
    console.log('看门' + super.intro());
  }
}
let wangcai = new Tianyuan('旺财', 2)
wangcai.skill()



// abstract 抽象类什么是抽象类？
// 首先，抽象类是不允许被实例化的

// abstract class Animal {
//   public name;
//   public constructor(name) {
//     this.name = name;
//   }
//   public abstract sayHi();
// }

// let a = new Animal('Jack');  // 报错,因为Animal是抽象类,只允许被继承,不允许自己创建

// class Cat extends Animal {
//   public eat() {
//     console.log(`${this.name} is eating.`);
//   }
// }

// let cat = new Cat('Tom');















export default {}