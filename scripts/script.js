document.addEventListener('DOMContentLoaded', function() {

    // Singleton Pattern
    // Problem it solves: Ensures that a class has only one instance and provides a point of access to it.
    class Singleton {
        static #instance;

        constructor() {
            if (Singleton.#instance) {
                return Singleton.#instance;
            }
            Singleton.#instance = this;
        }
    }

    function testSingleton() {
        const instance1 = new Singleton();
        const instance2 = new Singleton();
        alert(`Are both instances equal? ${instance1 === instance2}`);
    }

    document.getElementById('btnSingleton').addEventListener('click', testSingleton);

    // Factory Pattern
    // Problem it solves: Allows for the creation of objects without specifying the exact class of object that will be created.
    class Circle {
        draw() {
            const div = document.createElement('div');
            div.className = 'circle';
            document.getElementById('canvas').appendChild(div);
        }
    }

    class Square {
        draw() {
            const div = document.createElement('div');
            div.className = 'square';
            document.getElementById('canvas').appendChild(div);
        }
    }

    function drawShape(type) {
        let shape;
        switch (type) {
            case 'circle':
                shape = new Circle();
                break;
            case 'square':
                shape = new Square();
                break;
        }
        shape.draw();
    }

    document.getElementById('btnDrawCircle').addEventListener('click', () => drawShape('circle'));
    document.getElementById('btnDrawSquare').addEventListener('click', () => drawShape('square'));

    // Decorator Pattern
    // Problem it solves: Allows behavior to be added to an individual object, either statically or dynamically, without affecting the behavior of other objects from the same class.
    class Coffee {
        cost() {
            return 5;
        }
    }

    class MilkDecorator {
        constructor(coffee) {
            this._coffee = coffee;
        }

        cost() {
            return this._coffee.cost() + 2;
        }
    }

    function orderCoffee(type) {
        let coffee = new Coffee();
        if (type === 'milk') {
            coffee = new MilkDecorator(coffee);
        }
        document.getElementById('coffeeOrder').innerText = `Coffee cost is: $${coffee.cost()}`;
    }

    document.getElementById('btnOrderPlainCoffee').addEventListener('click', () => orderCoffee('plain'));
    document.getElementById('btnOrderMilkCoffee').addEventListener('click', () => orderCoffee('milk'));

    // Observer Pattern
    // Problem it solves: Allows a subjects to publish changes to its state so that other objects can react in response to those changes.
    class Subject {
        constructor() {
            this._observers = [];
        }

        addObserver(observer) {
            this._observers.push(observer);
        }

        notify(data) {
            for (const observer of this._observers) {
                observer.update(data);
            }
        }
    }

    class Observer {
        update(data) {
            document.getElementById('observerOutput').innerText = `Observer updated with data: ${data}`;
        }
    }

    function testObserver() {
        const subject = new Subject();
        const observer1 = new Observer();
        const observer2 = new Observer();

        subject.addObserver(observer1);
        subject.addObserver(observer2);

        subject.notify("test data");
    }

    document.getElementById('btnTestObserver').addEventListener('click', testObserver);

    // Mediator Pattern
    // Problem it solves: Reduces direct communications between various classes by centralizing external communications.
    class Mediator {
        notify(sender, message) {
            if (sender instanceof User1) {
                document.getElementById('mediatorOutput').innerText = `User2 received: ${message}`;
            } else {
                document.getElementById('mediatorOutput').innerText = `User1 received: ${message}`;
            }
        }
    }

    class User1 {
        constructor(mediator) {
            this._mediator = mediator;
        }

        send(message) {
            this._mediator.notify(this, message);
        }
    }

    class User2 {
        constructor(mediator) {
            this._mediator = mediator;
        }

        send(message) {
            this._mediator.notify(this, message);
        }
    }

    function sendMediatedMessage() {
        const mediator = new Mediator();
        const user1 = new User1(mediator);
        user1.send("Hello from User1!");
    }

    document.getElementById('btnSendMediatedMessage').addEventListener('click', sendMediatedMessage);

});
