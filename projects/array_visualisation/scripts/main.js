'use strict'

import * as MyUtils from "./my_utils.js"


const FUNCTIONS = {
    'push': 0,
    'pop': 1,
    'sort': 2,
    'shuffle': 3,
    'reverse': 4,
}


class ArrayVisualizer {
    constructor(canvasId) {
        this.canvas = document.querySelector(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.elmBtns = document.querySelectorAll(".buttons_container button");
        this.maxNumbers = 10;
        this.numArr = [...new Set(MyUtils.RandomArr(this.maxNumbers, 1, this.canvas.height))];

        this.barGap = 2;
        this.barColor = '#035457';
        this.tempColor = '#035999';


        this.firstLoad = true;

        this.numArr.sort((lhs, rhs) => lhs - rhs);

        this.ToggleBlock();
        this.DrawAnimated();
    };

    ActionHnadler(action) {
        switch (action) {
            case FUNCTIONS['push']:
                this.Push();
                break;
            case FUNCTIONS['pop']:
                this.Pop();
                break;
            case FUNCTIONS['sort']:
                this.Sort();
                break;
            case FUNCTIONS['shuffle']:
                this.Shuffle();
                break;
            case FUNCTIONS['reverse']:
                this.Reverse();
                break;
        }
    }

    DrawBar(barNum, barWidth) {
        this.ctx.fillStyle = this.barColor;

        this.ctx.fillRect(
            barNum * barWidth,
            this.canvas.height - this.numArr[barNum],
            barWidth - this.barGap,
            this.numArr[barNum]
        );
    }

    async DrawBarAnimated(index, barNum, barWidth, gap, barColor) {
        return new Promise((resolve) => {
            const barHeightIncrament = this.numArr[index] / 20;
            let currHeight = 0;

            this.ctx.fillStyle = barColor;

            this.ctx.clearRect(barNum * barWidth, 0, barWidth, this.canvas.height);

            const drawHeightIncrementally = () => {
                if (currHeight <= this.numArr[index]) {

                    this.ctx.fillRect(
                        barNum * barWidth + gap,
                        this.canvas.height - currHeight,
                        barWidth - this.barGap,
                        currHeight
                    );

                    currHeight += barHeightIncrament;

                    setTimeout(() => {
                        requestAnimationFrame(drawHeightIncrementally);
                    }, 1);
                } else {
                    resolve();
                }
            };

            drawHeightIncrementally();
        });
    }


    Draw(barNum) {

        const barWidth = this.canvas.width / this.numArr.length;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = this.barColor;

        for (let i = 0; i < barNum; ++i) {
            this.ctx.fillRect(
                i * barWidth,
                this.canvas.height - this.numArr[i],
                barWidth - this.barGap,
                this.numArr[i]
            );
        }
    }

    DrawAnimated() {
        const barWidth = this.canvas.width / this.numArr.length;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let i = 0;

        this.ctx.fillStyle = this.barColor;

        const drawBar = () => {
            if (i < this.numArr.length) {
                this.DrawBar(i, barWidth);
                ++i;

                setTimeout(() => {
                    requestAnimationFrame(drawBar);
                }, 65);
            }
            else {
                this.ToggleBlock();
            }
        };

        drawBar();
    }

    ToggleBlock() {
        // if (this.firstLoad) {
        //     this.firstLoad = false;
        //     return;
        // }

        this.elmBtns.forEach((btn) => {
            btn.classList.toggle('block');
        });
    }

    async Push() {
        const barWidth = this.canvas.width / this.numArr.length;
        if (barWidth <= this.barGap * 2) {
            const btnPush = document.querySelector('#push').classList.add('block');
            return;
        }


        this.ToggleBlock();

        const num = Math.trunc(MyUtils.Random(1, this.canvas.height));

        this.numArr.push(num);
        this.Draw(this.numArr.length - 1);

        await this.DrawBarAnimated(this.numArr.length - 1, this.numArr.length - 2, barWidth, this.barGap + 0.5, this.tempColor);

        console.log("After animation");
        this.ToggleBlock();
    }

    Pop() {
        if (this.numArr.length > 0) {
            this.numArr.pop();
            this.Draw(this.numArr.length);

            const btnPush = document.querySelector('#push').classList.remove('block');
        } else {
            console.warn("Array is empty!");
        }
    }

    Sort() {
        this.ToggleBlock();

        this.numArr.sort((lhs, rhs) => lhs - rhs);
        this.DrawAnimated();
    };

    async Shuffle() {
        this.ToggleBlock();

        const barWidth = this.canvas.width / this.numArr.length;

        for (let i = this.numArr.length - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.numArr[i], this.numArr[j]] = [this.numArr[j], this.numArr[i]];

            await this.DrawBarAnimated(i, i, barWidth, 0, this.tempColor);
            await this.DrawBarAnimated(j, j, barWidth, 0, this.tempColor);
        }

        this.ToggleBlock();
    };

    Reverse() {
        this.ToggleBlock();

        this.numArr.reverse();
        this.DrawAnimated();
    };
};

window.onload = () => {
    const visualizer = new ArrayVisualizer('#display');

    const btns = document.querySelectorAll('.buttons_container button');
    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            visualizer.ActionHnadler(FUNCTIONS[btn.id]);
        });
    });
};

