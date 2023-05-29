class Dog {
    constructor(name, age) {
        this.species = 'dog';
        this.name = name;
        this.age = age;
    }
    call() {
        console.log('狗叫');
    }
    intro() {
        console.log(this.name, this.age);
    }
}
class Tianyuan extends Dog {
    skill() {
        console.log('多大啦' + this.age);
        console.log('看门' + super.intro());
    }
}
let wangcai = new Tianyuan('旺财', 2);
wangcai.skill();
export default {};
