const canvas = document.getElementById("canvas");

const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const windowHeight = window.innerHeight;
const windwWidth = window.innerWidth;


let randomX = (Math.random() * windwWidth);
let randomY = (Math.random() * windowHeight);

function sleep(ms) {
    return new Promise(resolve => (resolve, ms));
};


window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});


let colors = ["#353D40",
    "#D9D9D9",
    "#F2B138",
    "#003F63"
];


let maxRadius = 50;
// let minRadius = 10;

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.strokeStyle = "rgb(255, 255, 255 , 0)"
        c.stroke();
    };

    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x > windwWidth - this.radius || this.x < this.radius) {
            this.dx = -this.dx;
        }
        if (this.y > windowHeight - this.radius || this.y < this.radius) {
            this.dy = -this.dy;
        }

        if (Mouse.x - this.x < 60 && Mouse.x - this.x > -60 &&
            Mouse.y - this.y < 60 && Mouse.y - this.y > -60) {

            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
}



//interact with the content 


let Mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener('mousemove', function() {
    Mouse.x = event.x;
    Mouse.y = event.y;
    console.log(Mouse);


});
let circleArray = [];

function init() {
    circleArray = [];

    for (let i = 0; i < 2000; i++) {
        let radius = Math.random() * 5 + 1;
        let x = Math.random() * (windwWidth - radius * 2) + radius;
        let y = Math.random() * (windowHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;

        circleArray.push(new Circle(x, y, dx, dy, radius));
    }

}

init();




async function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    Circle.draw;
    Circle.update;

    //interactivity



}

animate();