<template>
    <div class="blink">
        <div class="blink-item">
            <div class="text text-front">趣谈前端</div>
            <div class="text text-back">趣谈前端</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Glitch"
    }
</script>

<style scoped>
    .blink {
        background-color: #000;
        position: relative;
        width: 100%;
        font-size: 50px;
    }
    .blink-item {
        background-color: inherit;
        /*background-color: #000000;*/
    }
    .blink-item::after {
        content: '';
        position: absolute;
        z-index: 3;
        left: 0;
        top: 30px;
        width: 100%;
        height: 4px;
        background-color: inherit;
        animation: lineShake .5s infinite;
    }
    .text-front {
        color: #74fcfd;
        animation: shakeFront .5s infinite;
    }
    .text-back {
        /*position: absolute;*/
        transform: translate(-5px, -100%);
        color: #ea3448;
        mix-blend-mode: lighten;
        animation: shake .5s infinite;
    }

    @keyframes shakeFront {
        0% {
            transform: translate(1px, 1px);
        }
        20% {
            transform: translate(-1px, 0);
        }
        60% {
            transform: translate(-1px, 0);
        }
        100% {
            transform: translate(1px, -1px);
        }
    }
    @keyframes shake {
        0% {
            transform: translate(-5px, -100%);
        }
        20% {
            transform: translate(-3px, -100%);
        }
        60% {
            transform: translate(1px, calc(-100% - 1px));
        }
        100% {
            transform: translate(2px, calc(-100% + 1px));
        }
    }
    @keyframes lineShake {
        0% {
            top: 10%;
        }
        20% {
            top: 60%;
        }
        40% {
            top: 35%;
        }
        60% {
            top: 2%;
        }
        80% {
            top: 80%;
        }
        100% {
            top: 99%;
        }
    }
</style>