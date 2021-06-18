<template>
    <div>
        <span class="glitch">Glitch</span>
    </div>
</template>

<script>
    export default {
        name: "Glitch2"
    }
</script>

<style scoped>
    .glitch {
        font-size: 130px;
        line-height: 1;
        font-family:  sans-serif;
        font-weight: 700;
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        text-decoration: none;
        color: #fff;
    }
    .glitch:before, .glitch:after {
        display: block;
        content: 'Glitch';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        opacity: .8;
    }
    .glitch:after {
        color: #f0f;
        z-index: -2;
        animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
    }
    .glitch:before {
        color: #0ff;
        z-index: -1;
        animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    }

    /*.glitch:hover:before {*/
    /*    animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;*/
    /*}*/
    /*.glitch:hover:after {*/
    /*    animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;*/
    /*}*/

    @keyframes glitch {
        0% {
            transform: translate(0)
        }
        20% {
            transform: translate(-5px, 5px)
        }
        40% {
            transform: translate(-5px, -5px)
        }
        60% {
            transform: translate(5px, 5px)
        }
        80% {
            transform: translate(5px, -5px)
        }
        to {
            transform: translate(0)
        }
    }
</style>